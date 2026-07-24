import mongoose from "mongoose";

const pendingUserSchema = new mongoose.Schema(
  {
    firstName: String,

    lastName: String,

    email: {
      type: String,
      required: true,
      unique: true,
    },

    phone: String,

    sexe: String,

    formation: String,

    password: String,

    emailOTP: String,

    emailOTPExpires: Date,
  },

  {
    timestamps: true,
  },
);

const PendingUser = mongoose.model("PendingUser", pendingUserSchema);

export default PendingUser;
