import express from "express";
import {
  signupSeller,
  signupBuyer,
  signin,
  google,
  forgotPassword,
  resetPassword,
} from "../controllers/auth.controller.js";
import { signOut } from "../controllers/auth.controller.js";
// --- a/file:///d%3A/RealEstate/api/models/auth.routes.js

const router = express.Router();

// router.post('/signup',signup);
router.post("/signup/buyer", signupBuyer);
router.post("/signup/seller", signupSeller);
router.post("/signin", signin);
router.post("/google", google);
router.post("/signout", signOut);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);
export default router;
