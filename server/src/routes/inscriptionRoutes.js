import express from "express";

import {
  getInscriptionStats,
  getRecentInscriptions,
  getInscriptions,
  createInscription,
  getInscriptionById,
  validateInscription,
  updateInscriptionStatus,
  getMyInscriptions,
} from "../controllers/inscriptionController.js";

import { protect } from "../middlewares/authMiddleware.js";
import uploadInscription from "../middlewares/uploadInscription.js";
import { adminOnly } from "../middlewares/adminMiddleware.js";

const router = express.Router();

/* ================================================= */
/* ================= STATS ========================= */
/* ================================================= */

router.get("/stats", protect, adminOnly, getInscriptionStats);
router.get("/recent", protect, adminOnly, getRecentInscriptions);
router.get("/", protect, adminOnly, getInscriptions);
router.post(
  "/",

  protect,

  uploadInscription.fields([
    {
      name: "photo",
      maxCount: 1,
    },

    {
      name: "identityCard",
      maxCount: 1,
    },

    {
      name: "diploma",
      maxCount: 1,
    },

    {
      name: "cv",
      maxCount: 1,
    },
  ]),

  createInscription,
);
router.put("/:id/validate", protect, adminOnly, validateInscription);

router.put("/:id/status", protect, adminOnly, updateInscriptionStatus);

router.get("/me", protect, getMyInscriptions);

router.get("/:id", getInscriptionById);

export default router;
