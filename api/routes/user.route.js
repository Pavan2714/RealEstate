import express from "express";
import { test, uploadAvatar } from "../controllers/user.controller.js"; // Importing the test controller
import { updateUser, deleteUser } from "../controllers/auth.controller.js";
import { VerifyToken } from "../utils/VerifyToken.js";
const router = express.Router();

router.get("/test", test);
router.post("/upload/:id", VerifyToken, uploadAvatar);
router.post("/update/:id", VerifyToken, updateUser);
router.delete("/delete/:id", VerifyToken, deleteUser);

export default router;
