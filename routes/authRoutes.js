import express from "express";
import {
  registerUser,
  loginUser,
  forgotPassword,
  resetPassword,
  verifyEmail,
} from "../controllers/authController.js";
import { validateRegister } from "../middleware/validateRegisterMiddleware.js";

const router = express.Router();

// routes
router.post("/register", validateRegister, registerUser);
router.post("/verify", verifyEmail);
router.post("/login", loginUser);
// routes for password reset
router.post("/forgot-password", forgotPassword);
router.put("/reset-password", resetPassword);

export default router;
