import User from "../models/user.model.js"; // Importing User model
import bcrypt from "bcryptjs"; // Importing bcrypt for password hashing
import{ errorHandler } from "../utils/error.js"; // Importing error handler utility
import jwt from "jsonwebtoken"; // Importing JWT for token generation
export const signup = async (req, res, next, role) => {
  const { username, email, password } = req.body;

  // Validation: username must be present
  if (!username) {
    return res
      .status(400)
      .json({ success: false, message: "Username is required" });
  }

  const hashedPassword = bcrypt.hashSync(password, 10); // Hashing the password
  const newuser = new User({ username, email, password: hashedPassword, role });
  try {
    await newuser.save();
    res
      .status(201)
      .json(
        `${role.charAt(0).toUpperCase() + role.slice(1)} created successfully`
      );
  } catch (error) {
    // Handle duplicate email error
    if (error.code === 11000 && error.keyPattern && error.keyPattern.email) {
      return res.status(400).json({
        success: false,
        message: "User already exists with this email!",
      });
    }
    // For all other errors, send a generic message
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
export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validUser = await User.findOne({ email });
    if (!validUser) return next(errorHandler(404, 'User not found!'));
    const validPassword = bcrypt.compareSync(password, validUser.password);
    if (!validPassword) return next(errorHandler(401, 'Wrong credentials!'));
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
    const { password: pass, ...rest } = validUser._doc;
    res
      .cookie('access_token', token, { httpOnly: true })
      .status(200)
      .json(rest);
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
        .cookie('access_token', token, { httpOnly: true })
        .status(200)
        .json(rest);
    }
    else {
      const generatedPassword = Math.random().toString(36).slice(-8)+ Math.random().toString(36).slice(-8); // Generate a random password;
      const hashedPassword = bcrypt.hashSync(generatedPassword, 10); // Hash the generated password
     const rawUsername = req.body.username;
const processedUsername =
  rawUsername && typeof rawUsername === "string" && rawUsername.trim().length > 0
    ? rawUsername.split(" ").join("").toLowerCase() + Math.random().toString(36).slice(-4)
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
        .cookie('access_token', token, { httpOnly: true })
        .status(200)
        .json(rest);
    }
  }
   
  catch (error) {
    next(error);
  }
}
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
  if (req.user.id !== req.params.id) {
    return next(errorHandler(401, "You can only delete your own account!"));
  }

  try {
    await User.findByIdAndDelete(req.params.id);
    res.clearCookie("access_token");
    res.status(200).json({
      success: true,
      message: "User deleted successfully!",
    });
  } catch (error) {
    next(error);
  }
};

  