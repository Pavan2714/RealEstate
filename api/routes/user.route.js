import express from "express";
import {
  test,
  uploadAvatar,
  updateUser,
  deleteUser,
} from "../controllers/user.controller.js"; // Importing the test controller
import { VerifyToken } from "../utils/VerifyToken.js";
import { deleteUser } from "../controllers/auth.controller.js";
const router = express.Router();

router.get("/test", test);
router.post("/upload/:id", VerifyToken, uploadAvatar);
router.put("/update/:id", VerifyToken, updateUser);
router.delete("/delete/:id", VerifyToken, deleteUser);

export default router;
