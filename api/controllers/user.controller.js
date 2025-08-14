import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";
export const test = (req, res) => {
  res.json({
    message: "API is working!",
  });
};

export const deleteUser = async (req, res, next) => {
  // Ensure req.user exists
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
