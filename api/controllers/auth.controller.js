import User from "../models/user.model.js"; // Importing User model
import bcrypt from "bcryptjs"; // Importing bcrypt for password hashing
import { errorHandler } from "../utils/error.js"; // Importing error handler utility
import jwt from "jsonwebtoken"; // Importing JWT for token generation
import crypto from "crypto";
import { sendPasswordResetEmail } from "../utils/email.js";
export const signup = async (req, res, next, role) => {
  const { username, email, password } = req.body;

  if (!username) {
    return res.status(400).json({
      success: false,
      message: "Username is required",
    });
  }

  const hashedPassword = bcrypt.hashSync(password, 10);
  const newuser = new User({ username, email, password: hashedPassword, role });

  try {
    await newuser.save();

    // Create JWT and set cookie
    const token = jwt.sign({ id: newuser._id }, process.env.JWT_SECRET);
    const { password: pass, ...rest } = newuser._doc;

    res
      .cookie("access_token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .status(201)
      .json(rest);
  } catch (error) {
    if (error.code === 11000 && error.keyPattern && error.keyPattern.email) {
      return res.status(400).json({
        success: false,
        message: "User already exists with this email!",
      });
    }
    res.status(500).json({
      success: false,
      message: "Something went wrong. Please try again later.",
    });
  }
};

// Buyer signup
export const signupBuyer = (req, res, next) => signup(req, res, next, "buyer");
// Seller signup
export const signupSeller = (req, res, next) =>
  signup(req, res, next, "seller");
// In auth.controller.js - signin/signup
// In auth.controller.js
export const signin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const validUser = await User.findOne({ email });
    if (!validUser) {
      return next(errorHandler(404, "User not found!"));
    }

    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) {
      return next(errorHandler(401, "Wrong credentials!"));
    }

    const token = jwt.sign(
      { id: validUser._id, role: validUser.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    const { password: pass, ...rest } = validUser._doc;

    // ✅ PROPER COOKIE SETTINGS FOR VERCEL
    const cookieOptions = {
      httpOnly: true,
      secure: true, // Always true for production
      sameSite: "none", // Required for cross-origin
      maxAge: 7 * 24 * 60 * 60 * 1000,
      path: "/",
    };

    // Don't set domain - let browser handle it
    console.log("🍪 Setting cookie with options:", cookieOptions);

    res.cookie("access_token", token, cookieOptions).status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

export const google = async (req, res, next) => {
  const { username, email, photo, role } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      const { password, ...rest } = user._doc;
      return res
        .cookie("access_token", token, { httpOnly: true })
        .status(200)
        .json(rest);
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8); // Generate a random password;
      const hashedPassword = bcrypt.hashSync(generatedPassword, 10); // Hash the generated password
      const rawUsername = req.body.username;
      const processedUsername =
        rawUsername &&
        typeof rawUsername === "string" &&
        rawUsername.trim().length > 0
          ? rawUsername.split(" ").join("").toLowerCase() +
            Math.random().toString(36).slice(-4)
          : "user" + Math.random().toString(36).slice(-4);

      const newUser = new User({
        username: processedUsername,
        email: req.body.email,
        password: hashedPassword,
        avatar:
          photo ||
          "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
        role: role || "buyer",
      });
      await newUser.save();
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
      const { password, ...rest } = newUser._doc;
      res
        .cookie("access_token", token, { httpOnly: true })
        .status(200)
        .json(rest);
    }
  } catch (error) {
    next(error);
  }
};
// Upload profile image
export const uploadProfileImage = async (req, res, next) => {
  try {
    const { avatar } = req.body;
    const userId = req.params.id;

    if (!avatar) {
      return next(errorHandler(400, "No image provided"));
    }

    // Find and update user
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { avatar: avatar },
      { new: true }
    );

    if (!updatedUser) {
      return next(errorHandler(404, "User not found"));
    }

    // Return user without password
    const { password, ...userWithoutPassword } = updatedUser._doc;
    res.status(200).json(userWithoutPassword);
  } catch (error) {
    next(error);
  }
};

// Update user profile
export const updateUser = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const { username, email, phone } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { username, email, phone },
      { new: true }
    );

    if (!updatedUser) {
      return next(errorHandler(404, "User not found"));
    }

    const { password, ...userWithoutPassword } = updatedUser._doc;
    res.status(200).json(userWithoutPassword);
  } catch (error) {
    next(error);
  }
};

export const signOut = async (req, res, next) => {
  try {
    res.clearCookie("access_token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Add this for production
      sameSite: "strict", // Add this for security
    });
    res.status(200).json("User has been logged out!");
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  // Debug: log user and params
  if (!req.user) {
    return next(errorHandler(401, "Authentication required!"));
  }

  if (req.user.id.toString() !== req.params.id.toString()) {
    return next(errorHandler(401, "You can only delete your own account!"));
  }

  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return next(errorHandler(404, "User not found!"));
    }
    res.clearCookie("access_token");
    res.status(200).json({
      success: true,
      message: "User deleted successfully!",
    });
  } catch (error) {
    next(error);
  }
};

export const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;

    if (!email) {
      return next(errorHandler(400, "Email is required"));
    }

    const user = await User.findOne({ email });

    if (!user) {
      // Don't reveal if user exists or not for security
      return res.status(200).json({
        success: true,
        message:
          "If an account exists with this email, a password reset link has been sent.",
      });
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString("hex");
    const hashedToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    // Save token to user
    user.resetPasswordToken = hashedToken;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
    await user.save();

    // Send email
    try {
      await sendPasswordResetEmail(email, resetToken);
      return res.status(200).json({
        success: true,
        message: "Password reset link sent to your email",
      });
    } catch (emailError) {
      // Clear reset token if email fails
      user.resetPasswordToken = null;
      user.resetPasswordExpires = null;
      await user.save();

      console.error("Email sending failed:", emailError);
      return next(
        errorHandler(500, "Failed to send reset email. Please try again.")
      );
    }
  } catch (error) {
    console.error("Forgot password error:", error);
    return next(error);
  }
};

export const resetPassword = async (req, res, next) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    if (!password || password.length < 6) {
      return next(errorHandler(400, "Password must be at least 6 characters"));
    }

    // Hash the token from URL to compare with stored hash
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    // Find user with valid token and not expired
    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      return next(errorHandler(400, "Invalid or expired reset token"));
    }

    // Update password
    user.password = bcrypt.hashSync(password, 10);
    user.resetPasswordToken = null;
    user.resetPasswordExpires = null;
    await user.save();

    return res.status(200).json({
      success: true,
      message:
        "Password reset successful. You can now login with your new password.",
    });
  } catch (error) {
    console.error("Reset password error:", error);
    return next(error);
  }
};
