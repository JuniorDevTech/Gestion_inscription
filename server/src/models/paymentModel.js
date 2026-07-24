import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
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
    /* ================= INSCRIPTION =================== */
    /* ================================================= */

    inscription: {
      type: mongoose.Schema.Types.ObjectId,

      ref: "Inscription",
    },

    /* ================================================= */
    /* ================= PAYMENT INFO ================== */
    /* ================================================= */

    amount: {
      type: Number,

      required: true,
    },

    currency: {
      type: String,

      default: "XOF",
    },

    paymentMethod: {
      type: String,

      enum: ["wave", "orange_money", "mtn_money", "moov_money", "card", "cash"],

      required: true,
    },

    transactionId: {
      type: String,

      unique: true,
    },

    /* ================================================= */
    /* ================= STATUS ======================== */
    /* ================================================= */

    status: {
      type: String,

      enum: ["en attente", "payé", "échoué", "remboursé"],

      default: "en attente",
    },

    /* ================================================= */
    /* ================= RECEIPT ======================= */
    /* ================================================= */

    receiptUrl: {
      type: String,

      default: "",
    },

    /* ================================================= */
    /* ================= NOTES ========================= */
    /* ================================================= */

    notes: {
      type: String,

      default: "",
    },
  },

  {
    timestamps: true,
  },
);

const Payment = mongoose.model("Payment", paymentSchema);

export default Payment;
