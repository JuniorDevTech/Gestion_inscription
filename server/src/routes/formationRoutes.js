import express from "express";

import {
  createFormation,
  getFormations,
  updateFormation,
  deleteFormation,
} from "../controllers/formationController.js";

import { protect } from "../middlewares/authMiddleware.js";

import { adminOnly } from "../middlewares/adminMiddleware.js";

import upload from "../middlewares/uploadMiddleware.js";

const router = express.Router();

/* ================================================= */
/* ================= CREATE ======================== */
/* ================================================= */

router.post("/", protect, adminOnly, upload.single("image"), createFormation);

/* ================================================= */
/* ================= GET =========================== */
/* ================================================= */

router.get("/", getFormations);

/* ================================================= */
/* ================= UPDATE ======================== */
/* ================================================= */

router.put("/:id", protect, adminOnly, upload.single("image"), updateFormation);

/* ================================================= */
/* ================= DELETE ======================== */
/* ================================================= */

router.delete("/:id", protect, adminOnly, deleteFormation);

export default router;
