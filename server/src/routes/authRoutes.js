import express from "express";

import {
  registerUser,
  loginUser,
  verifyEmailOTP,
  getUsers,
} from "../controllers/authController.js";

import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

/* ================= AUTH ================= */

router.post("/register", registerUser);

router.post("/login", loginUser);

router.post("/verify-email", verifyEmailOTP);

router.get("/users", getUsers);

/* ================= AUTH PROTECTED ================= */

/* 🔐 GET CURRENT USER */
router.get("/me", protect, (req, res) => {
  res.status(200).json({
    success: true,

    user: {
      id: req.user._id,

      email: req.user.email,

      role: req.user.role,

      avatar: req.user.avatar,

      isEmailVerified: req.user.isEmailVerified,
    },
  });
});

/* 🔐 TEST DASHBOARD BACKEND */
router.get("/dashboard", protect, (req, res) => {
  res.status(200).json({
    success: true,

    message: `Bienvenue ${req.user.email}`,

    user: req.user,
  });
});

export default router;
