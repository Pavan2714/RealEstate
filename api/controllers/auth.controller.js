import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
};

const signToken = (user) =>
  jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

const sendAuthResponse = (res, userDoc, status = 200) => {
  const userObj = userDoc.toObject ? userDoc.toObject() : userDoc;
  const { password, ...rest } = userObj;

  const token = signToken(userDoc);
  return res
    .cookie("access_token", token, COOKIE_OPTIONS)
    .status(status)
    .json({ success: true, data: rest });
};

export const signup = async (req, res, next, role) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return next(
        errorHandler(400, "Username, email and password are required")
      );
    }

    const exists = await User.findOne({ email });
    if (exists) {
      return next(errorHandler(400, "User already exists with this email!"));
    }

    const hashedPassword = bcrypt.hashSync(password, 10);
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      role,
    });

    await newUser.save();
    return sendAuthResponse(res, newUser, 201);
  } catch (error) {
    if (error.code === 11000 && error.keyPattern && error.keyPattern.email) {
      return next(errorHandler(400, "User already exists with this email!"));
    }
    return next(error);
  }
};

export const signupBuyer = (req, res, next) => signup(req, res, next, "buyer");
export const signupSeller = (req, res, next) =>
  signup(req, res, next, "seller");

export const signin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return next(errorHandler(400, "Email and password required"));

    const user = await User.findOne({ email });
    if (!user) return next(errorHandler(404, "User not found!"));

    const validPassword = bcrypt.compareSync(password, user.password);
    if (!validPassword) return next(errorHandler(401, "Wrong credentials!"));

    return sendAuthResponse(res, user, 200);
  } catch (error) {
    return next(error);
  }
};

export const google = async (req, res, next) => {
  try {
    const { username, email, photo, role } = req.body;
    if (!email)
      return next(errorHandler(400, "Email is required for Google login"));

    let user = await User.findOne({ email });
    if (user) {
      return sendAuthResponse(res, user, 200);
    }

    const generatedPassword =
      Math.random().toString(36).slice(-8) +
      Math.random().toString(36).slice(-8);
    const hashedPassword = bcrypt.hashSync(generatedPassword, 10);

    const rawUsername = username || "user";
    const processedUsername =
      rawUsername && typeof rawUsername === "string"
        ? rawUsername.split(" ").join("").toLowerCase() +
          Math.random().toString(36).slice(-4)
        : "user" + Math.random().toString(36).slice(-4);

    const newUser = new User({
      username: processedUsername,
      email,
      password: hashedPassword,
      avatar:
        photo ||
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
      role: role || "buyer",
    });

    await newUser.save();
    return sendAuthResponse(res, newUser, 201);
  } catch (error) {
    return next(error);
  }
};

export const uploadProfileImage = async (req, res, next) => {
  try {
    const { avatar } = req.body;
    const userId = req.params.id;

    if (!avatar) return next(errorHandler(400, "No image provided"));

    // Ensure authenticated user matches target
    if (
      req.user &&
      req.user.id &&
      req.user.id.toString() !== userId.toString()
    ) {
      return next(errorHandler(403, "You can only update your own profile"));
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { avatar },
      { new: true }
    );
    if (!updatedUser) return next(errorHandler(404, "User not found"));

    const userObj = updatedUser.toObject ? updatedUser.toObject() : updatedUser;
    const { password, ...userWithoutPassword } = userObj;
    return res.status(200).json({ success: true, data: userWithoutPassword });
  } catch (error) {
    return next(error);
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const { username, email, phone } = req.body;

    if (
      req.user &&
      req.user.id &&
      req.user.id.toString() !== userId.toString()
    ) {
      return next(errorHandler(403, "You can only update your own profile"));
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { username, email, phone },
      { new: true, runValidators: true }
    );

    if (!updatedUser) return next(errorHandler(404, "User not found"));

    const userObj = updatedUser.toObject ? updatedUser.toObject() : updatedUser;
    const { password, ...userWithoutPassword } = userObj;
    return res.status(200).json({ success: true, data: userWithoutPassword });
  } catch (error) {
    return next(error);
  }
};

export const signOut = async (req, res, next) => {
  try {
    res.clearCookie("access_token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
    });
    return res
      .status(200)
      .json({ success: true, message: "User has been logged out!" });
  } catch (error) {
    return next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    if (!req.user) return next(errorHandler(401, "Authentication required!"));
    if (req.user.id.toString() !== req.params.id.toString()) {
      return next(errorHandler(403, "You can only delete your own account!"));
    }

    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) return next(errorHandler(404, "User not found!"));

    res.clearCookie("access_token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
    });

    return res.status(200).json({
      success: true,
      message: "User deleted successfully!",
    });
  } catch (error) {
    return next(error);
  }
};
