import multer from "multer";

import path from "path";

/* ================================================= */
/* ================= STORAGE ======================= */
/* ================================================= */

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "src/uploads/formations");
  },

  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

/* ================================================= */
/* ================= FILE FILTER =================== */
/* ================================================= */

const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Format image invalide"));
  }
};

const upload = multer({
  storage,

  fileFilter,
});

export default upload;
