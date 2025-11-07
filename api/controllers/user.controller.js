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
  try {
    const { id } = req.params;

    // 1) Validate id to avoid CastError -> 500
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return next(errorHandler(400, "Invalid user id"));
    }

    // 2) Verify ownership (or allow admin)
    if (!req.user || (req.user.id !== id && req.user.role !== "admin")) {
      return next(errorHandler(401, "You can only delete your own account"));
    }

    // 3) Ensure user exists
    const user = await User.findById(id);
    if (!user) return next(errorHandler(404, "User not found"));

    // 4) Delete related data (optional but safe)
    try {
      await Listing.deleteMany({ userRef: id });
    } catch (e) {
      // log and continue, don't crash delete
      console.error("Failed deleting user listings:", e.message);
    }

    // 5) Delete user
    await User.findByIdAndDelete(id);

    // 6) Clear auth cookie
    res.clearCookie("access_token", {
      httpOnly: true,
      sameSite: "none",
      secure: true,
    });

    return res.status(200).json({ success: true, message: "Account deleted" });
  } catch (err) {
    console.error("deleteUser error:", err);
    return next(errorHandler(500, "Failed to delete account"));
  }
};
