/* ================================================= */
/* ================= ADMIN ONLY ==================== */
/* ================================================= */

export const adminOnly = (req, res, next) => {
  try {
    /* ================================================= */
    /* ================= CHECK USER ==================== */
    /* ================================================= */

    if (!req.user) {
      return res.status(401).json({
        success: false,

        message: "Utilisateur non authentifié",
      });
    }

    /* ================================================= */
    /* ================= CHECK ROLE ==================== */
    /* ================================================= */

    if (req.user.role !== "admin") {
      return res.status(403).json({
        success: false,

        message: "Accès refusé : administrateur uniquement",
      });
    }

    /* ================================================= */
    /* ================= NEXT ========================== */
    /* ================================================= */

    next();
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,

      message: "Erreur middleware administrateur",

      error: error.message,
    });
  }
};
