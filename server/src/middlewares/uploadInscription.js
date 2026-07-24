import multer from "multer";

import path from "path";

/* ================================================= */
/* ================= STORAGE ======================= */
/* ================================================= */

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "src/uploads");
  },

  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname.replace(/\s+/g, "-"));
  },
});

/* ================================================= */
/* ================= FILE FILTER =================== */
/* ================================================= */

const fileFilter = (req, file, cb) => {
  const allowedTypes = [
    /* IMAGES */
    "image/jpeg",

    "image/png",

    "image/webp",

    "image/jpg",

    /* PDF */
    "application/pdf",
  ];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Format de fichier invalide"));
  }
};

/* ================================================= */
/* ================= MULTER ======================== */
/* ================================================= */

const uploadInscription = multer({
  storage,

  fileFilter,

  limits: {
    fileSize: 50 * 1024 * 1024,
  },
});

export default uploadInscription;
