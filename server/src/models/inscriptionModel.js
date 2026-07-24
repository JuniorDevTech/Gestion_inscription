import mongoose from "mongoose";

const inscriptionSchema = new mongoose.Schema(
  {
    /* ================================================= */
    /* ================= USER ========================== */
    /* ================================================= */

    user: {
      type: mongoose.Schema.Types.ObjectId,

      ref: "User",

      required: true,
    },

    /* ================================================= */
    /* ================= PERSONAL INFOS =============== */
    /* ================================================= */

    firstName: {
      type: String,

      required: true,

      trim: true,
    },

    lastName: {
      type: String,

      required: true,

      trim: true,
    },

    email: {
      type: String,

      required: true,

      trim: true,

      lowercase: true,
    },

    phone: {
      type: String,

      required: true,

      trim: true,
    },

    sexe: {
      type: String,

      enum: ["homme", "femme", "autre"],

      required: true,
    },

    birthDate: {
      type: Date,
    },

    address: {
      type: String,

      trim: true,

      default: "",
    },

    /* ================================================= */
    /* ================= FORMATION ===================== */
    /* ================================================= */

    formation: {
      type: mongoose.Schema.Types.ObjectId,

      ref: "Formation",

      required: true,
    },

    level: {
      type: String,

      enum: ["Débutant", "Intermédiaire", "Avancé"],

      default: "Débutant",
    },

    mode: {
      type: String,

      enum: ["Présentiel", "En ligne", "Hybride"],

      default: "Présentiel",
    },

    duration: {
      type: String,

      default: "",
    },

    /* ================================================= */
    /* ================= DOCUMENTS ===================== */
    /* ================================================= */

    photo: {
      type: String,

      default: "",
    },

    identityCard: {
      type: String,

      default: "",
    },

    diploma: {
      type: String,

      default: "",
    },

    cv: {
      type: String,

      default: "",
    },

    /* ================================================= */
    /* ================= SECTION VALIDATION ============ */
    /* ================================================= */

    personalValidated: {
      type: Boolean,

      default: false,
    },

    formationValidated: {
      type: Boolean,

      default: false,
    },

    documentsValidated: {
      type: Boolean,

      default: false,
    },

    /* ================================================= */
    /* ================= PAYMENT ======================= */
    /* ================================================= */

    paymentMethod: {
      type: String,

      default: "",
    },

    paymentPhone: {
      type: String,

      default: "",
    },

    paymentReference: {
      type: String,

      default: "",
    },

    paymentStatus: {
      type: String,

      enum: ["en attente", "payé", "échoué"],

      default: "en attente",
    },

    paymentValidated: {
      type: Boolean,

      default: false,
    },
    /* ================================================= */
    /* ================= STATUS ======================== */
    /* ================================================= */

    status: {
      type: String,

      enum: ["en attente", "validée", "rejetée"],

      default: "en attente",
    },

    notes: {
      type: String,

      default: "",
    },
  },

  {
    timestamps: true,
  },
);

const Inscription = mongoose.model("Inscription", inscriptionSchema);

export default Inscription;
