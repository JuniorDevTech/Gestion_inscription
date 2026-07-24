import jwt from "jsonwebtoken";

import User from "../models/userModel.js";

/* ================================================= */
/* ================= PROTECT ROUTE ================= */
/* ================================================= */

export const protect = async (req, res, next) => {
  try {
    let token;

    /* ================================================= */
    /* ================= CHECK TOKEN =================== */
    /* ================================================= */

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    /* NO TOKEN */
    if (!token) {
      return res.status(401).json({
        success: false,

        message: "Accès non autorisé, token manquant",
      });
    }

    /* ================================================= */
    /* ================= VERIFY TOKEN ================== */
    /* ================================================= */

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    /* ================================================= */
    /* ================= FIND USER ===================== */
    /* ================================================= */

    const user = await User.findById(decoded.id).select("-password");

    /* USER NOT FOUND */
    if (!user) {
      return res.status(401).json({
        success: false,

        message: "Utilisateur introuvable",
      });
    }

    /* ================================================= */
    /* ================= ACCOUNT ACTIVE ================ */
    /* ================================================= */

    if (!user.isActive) {
      return res.status(403).json({
        success: false,

        message: "Compte désactivé",
      });
    }

    /* ================================================= */
    /* ================= EMAIL VERIFIED ================ */
    /* ================================================= */

    if (!user.isEmailVerified) {
      return res.status(403).json({
        success: false,

        message: "Veuillez vérifier votre email",
      });
    }

    /* ================================================= */
    /* ================= ATTACH USER =================== */
    /* ================================================= */

    req.user = user;

    next();
  } catch (error) {
    console.error(error);

    return res.status(401).json({
      success: false,

      message: "Token invalide ou expiré",

      error: error.message,
    });
  }
};

/* ================================================= */
/* ================= ADMIN ONLY ==================== */
/* ================================================= */

export const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    return next();
  }

  return res.status(403).json({
    success: false,

    message: "Accès refusé administrateur uniquement",
  });
};
