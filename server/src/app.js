import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";

/* ROUTES */
import authRoutes from "./routes/authRoutes.js";
import inscriptionRoutes from "./routes/inscriptionRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";

/* CONFIG */
dotenv.config();

/* APP */
const app = express();

/* MIDDLEWARES */
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://gestion-inscription-smoky.vercel.app",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  }),
);

app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  }),
);

/* STATIC */
app.use("/uploads", express.static("src/uploads"));

/* ROUTES */
app.use("/api/auth", authRoutes);
app.use("/api/inscriptions", inscriptionRoutes);
app.use("/api/dashboard", dashboardRoutes);

/* TEST */
app.get("/", (req, res) => {
  res.json({
    message: "API fonctionne",
  });
});

app.post("/api/auth/register", (req, res) => {
  console.log(req.body);

  res.json({
    success: true,
    message: "Register fonctionne",
  });
});

export default app;
