import express from "express";

import {
  getDashboardStats,
  getFormationStats,
  getPaymentStats,
  createPayment,
  validatePayment,
} from "../controllers/dashboardController.js";

import { protect } from "../middlewares/authMiddleware.js";

import { adminOnly } from "../middlewares/adminMiddleware.js";

const router = express.Router();

/* ================================================= */
/* ================= DASHBOARD STATS =============== */
/* ================================================= */

router.get("/stats", protect, adminOnly, getDashboardStats);
router.get("/formations", protect, adminOnly, getFormationStats);
router.get("/payments", protect, adminOnly, getPaymentStats);
router.post("/pay", protect, createPayment);
router.put("/validate-payment/:id", protect, adminOnly, validatePayment);

export default router;
