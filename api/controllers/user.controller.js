import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";
export const test = (req, res) => {
  res.json({
    message: "API is working!",
  });
};

export const uploadAvatar = async (req, res, next) => {
  try {
    const { avatar } = req.body;
    const userId = req.params.id;

    // Verify user is authenticated and matches the ID
    if (req.user.id !== userId) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
      });
    }

    // Validate base64 image
    if (!avatar || !avatar.startsWith("data:image")) {
      return res.status(400).json({
        success: false,
        message: "Invalid image format",
      });
    }

    // Update user avatar in database
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { avatar },
      { new: true }
    ).select("-password"); // Don't send password back

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      data: updatedUser,
      message: "Avatar uploaded successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (req, res, next) => {
  try {
    // Verify user is updating their own account
    if (req.user.id !== req.params.id) {
      return next(errorHandler(401, "You can only update your own account!"));
    }

    const { username, email, phone } = req.body;

    // Update user
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username,
          email,
          phone,
        },
      },
      { new: true }
    ).select("-password");

    if (!updatedUser) {
      return next(errorHandler(404, "User not found!"));
    }

    res.status(200).json({
      success: true,
      data: updatedUser,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  if (!req.user) {
    return next(errorHandler(401, "Authentication required!"));
  }

  // Compare IDs as strings to avoid type mismatch
  if (req.user.id.toString() !== req.params.id.toString()) {
    return next(errorHandler(401, "You can only delete your own account!"));
  }

  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return next(errorHandler(404, "User not found!"));
    }
    res.clearCookie("access_token");
    res.status(200).json({ success: true, message: "User has been deleted!" });
  } catch (error) {
    next(error);
  }
};
