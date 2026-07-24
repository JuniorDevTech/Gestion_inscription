import bcrypt from "bcryptjs";

import User from "../models/userModel.js";

import { generateToken } from "../config/jwt.js";

import { generateOTP } from "../utils/generateOTP.js";

import { transporter } from "../config/mail.js";

import { io } from "../server.js";

import PendingUser from "../models/pendingUserModel.js";

/* ================================================= */
/* ================= REGISTER USER ================= */
/* ================================================= */

export const registerUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    /* VALIDATION */
    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({
        message: "Tous les champs sont obligatoires",
      });
    }

    /* EMAIL FORMAT */
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return res.status(400).json({
        message: "Adresse email invalide",
      });
    }

    /* PASSWORD */
    if (password.length < 6) {
      return res.status(400).json({
        message: "Le mot de passe doit contenir au moins 6 caractères",
      });
    }

    /* NORMALIZE EMAIL */
    const normalizedEmail = email.trim().toLowerCase();
    const cleanFirstName = firstName.trim();
    const cleanLastName = lastName.trim();

    /* USER EXISTS */
    const userExists = await User.findOne({
      email: normalizedEmail,
    });

    if (userExists) {
      return res.status(400).json({
        message: "Cet email existe déjà",
      });
    }

    /* HASH PASSWORD */
    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(password, salt);

    /* GENERATE OTP */
    const otp = generateOTP();

    /* CREATE PENDING USER */
    const pendingUser = await PendingUser.create({
      firstName: cleanFirstName,

      lastName: cleanLastName,

      email: normalizedEmail,

      password: hashedPassword,

      emailOTP: otp,

      emailOTPExpires: Date.now() + 10 * 60 * 1000,
    });

    try {
      /* SEND EMAIL */
      await transporter.sendMail({
        from: process.env.EMAIL_USER,

        to: normalizedEmail,

        subject: "Code de vérification OTP",

        html: `
          <div style="font-family:sans-serif;padding:20px">
            <h2>Vérification Email</h2>

            <p>Votre code OTP est :</p>

            <h1 style="letter-spacing:5px">${otp}</h1>

            <p>Ce code expire dans 10 minutes.</p>
          </div>
        `,
      });
    } catch (mailError) {
      /* DELETE PENDING USER IF EMAIL FAILS */
      await PendingUser.findByIdAndDelete(pendingUser._id);

      return res.status(500).json({
        message: "Erreur envoi email",

        error: mailError.message,
      });
    }

    return res.status(201).json({
      message: "Code OTP envoyé",

      email: normalizedEmail,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Erreur serveur",

      error: error.message,
    });
  }
};

/* ================================================= */
/* ================= LOGIN USER ================= */
/* ================================================= */

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    /* VALIDATION */
    if (!email || !password) {
      return res.status(400).json({
        message: "Veuillez remplir tous les champs",
      });
    }

    /* NORMALIZE EMAIL */
    const normalizedEmail = email.trim().toLowerCase();

    /* FIND USER */
    const user = await User.findOne({
      email: normalizedEmail,
    });

    if (!user) {
      return res.status(400).json({
        message: "Email ou mot de passe incorrect",
      });
    }

    /* ACCOUNT DISABLED */
    if (!user.isActive) {
      return res.status(403).json({
        message: "Compte désactivé",
      });
    }

    /* EMAIL VERIFIED */
    if (!user.isEmailVerified) {
      return res.status(403).json({
        message: "Veuillez vérifier votre email",
      });
    }

    /* PASSWORD CHECK */
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Email ou mot de passe incorrect",
      });
    }

    /* TOKEN */
    const token = generateToken(user._id);

    return res.status(200).json({
      message: "Connexion réussie",

      token,

      user: {
        id: user._id,

        firstName: user.firstName,

        lastName: user.lastName,

        email: user.email,

        phone: user.phone,

        sexe: user.sexe,

        formation: user.formation,

        role: user.role,

        isEmailVerified: user.isEmailVerified,
      },
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Erreur serveur",

      error: error.message,
    });
  }
};

/* ================================================= */
/* ================= VERIFY OTP ================= */
/* ================================================= */

export const verifyEmailOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    /* VALIDATION */
    if (!email || !otp) {
      return res.status(400).json({
        message: "Email et OTP requis",
      });
    }

    /* NORMALIZE EMAIL */
    const normalizedEmail = email.trim().toLowerCase();

    /* FIND PENDING USER */
    const pendingUser = await PendingUser.findOne({
      email: normalizedEmail,
    });

    if (!pendingUser) {
      return res.status(404).json({
        message: "Utilisateur introuvable",
      });
    }

    /* OTP EXPIRED */
    if (
      !pendingUser.emailOTPExpires ||
      pendingUser.emailOTPExpires < Date.now()
    ) {
      return res.status(400).json({
        message: "Code OTP expiré",
      });
    }

    /* OTP INVALID */
    if (pendingUser.emailOTP !== otp) {
      return res.status(400).json({
        message: "Code OTP invalide",
      });
    }

    /* CREATE REAL USER */
    const user = await User.create({
      firstName: pendingUser.firstName,

      lastName: pendingUser.lastName,

      email: pendingUser.email,

      phone: pendingUser.phone,

      sexe: pendingUser.sexe,

      formation: pendingUser.formation,

      password: pendingUser.password,

      isEmailVerified: true,
    });

    io.emit("new_admin_notification", {
      type: "inscription",

      message: "Nouvel utilisateur inscrit",

      email: user.email,

      createdAt: new Date(),
    });

    /* DELETE PENDING USER */
    await PendingUser.findByIdAndDelete(pendingUser._id);

    /* TOKEN */
    const token = generateToken(user._id);

    return res.status(200).json({
      message: "Email vérifié avec succès",

      token,

      user: {
        id: user._id,

        firstName: user.firstName,

        lastName: user.lastName,

        email: user.email,

        role: user.role,
      },
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Erreur serveur",

      error: error.message,
    });
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });

    return res.status(200).json(users);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Erreur serveur",
    });
  }
};
