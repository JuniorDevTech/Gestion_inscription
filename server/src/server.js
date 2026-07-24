import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import { Server } from "socket.io";

import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import inscriptionRoutes from "./routes/inscriptionRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import formationRoutes from "./routes/formationRoutes.js";

import { transporter } from "./config/mail.js";

const app = express();

/* ================================================= */
/* ================= CORS =========================== */
/* ================================================= */

app.use(cors());

/* ================================================= */
/* ================= MIDDLEWARE ===================== */
/* ================================================= */

app.use(express.json());

/* ================================================= */
/* ================= TEST ROUTE ===================== */
/* ================================================= */

app.get("/", (req, res) => {
  res.json({
    message: "API running",
  });
});

/* ================================================= */
/* ================= DATABASE ======================= */
/* ================================================= */

connectDB();

/* ================================================= */
/* ================= ROUTES ========================= */
/* ================================================= */

app.use("/api/auth", authRoutes);

app.use("/api/inscriptions", inscriptionRoutes);

app.use("/api/dashboard", dashboardRoutes);

app.use("/api/formations", formationRoutes);

app.use("/uploads", express.static("src/uploads"));

/* ================================================= */
/* ================= SERVER ========================= */
/* ================================================= */

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

/* ================================================= */
/* ================= SOCKET IO ====================== */
/* ================================================= */

export const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",

    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("Socket connecté :", socket.id);

  socket.on("disconnect", () => {
    console.log("Socket déconnecté :", socket.id);
  });
});

/* ================================================= */
/* ================= MAIL =========================== */
/* ================================================= */

transporter.verify((err) => {
  if (err) {
    console.log("MAIL ERROR ❌", err);
  } else {
    console.log("MAIL READY ✅");
  }
});
