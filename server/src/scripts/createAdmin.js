import dotenv from "dotenv";

import bcrypt from "bcryptjs";

import mongoose from "mongoose";

import connectDB from "../config/db.js";

import User from "../models/userModel.js";

/* ================= CONFIG ================= */
dotenv.config();

/* ================= CREATE ADMIN ================= */
const createAdmin = async () => {
  try {
    /* CONNECT DATABASE */
    await connectDB();

    console.log("MongoDB connecté");

    /* ADMIN EMAIL */
    const adminEmail = "admin@plateforme.com";

    /* CHECK IF ADMIN EXISTS */
    const adminExists = await User.findOne({
      email: adminEmail.toLowerCase(),
    });

    if (adminExists) {
      console.log("Admin existe déjà");

      await mongoose.connection.close();

      process.exit(0);
    }

    /* HASH PASSWORD */
    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash("Admin123456", salt);

    /* CREATE ADMIN */
    const admin = await User.create({
      firstName: "Super",

      lastName: "Admin",

      email: adminEmail.toLowerCase(),

      phone: "0700000000",

      sexe: "homme",

      formation: "Administration",

      password: hashedPassword,

      role: "admin",

      isEmailVerified: true,

      isPhoneVerified: true,

      isActive: true,
    });

    console.log("Admin créé avec succès");

    console.log({
      id: admin._id,

      email: admin.email,

      role: admin.role,
    });

    /* CLOSE DB */
    await mongoose.connection.close();

    process.exit(0);
  } catch (error) {
    console.error("Erreur création admin :");

    console.error(error);

    await mongoose.connection.close();

    process.exit(1);
  }
};

/* ================= EXECUTE ================= */
createAdmin();
