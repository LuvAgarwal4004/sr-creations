import mongoose from "mongoose";

const otpSchema = new mongoose.Schema({

  email: {
    type: String,
    required: true
  },

  otp: {
    type: String,
    required: true
  },

  password: {
    type: String,
    default: null
  },

  name: {
    type: String,
    default: null
  },

  type: {
    type: String,
    enum: [
      "signup",
      "forgot-password"
    ],
    required: true
  },

  attempts: {
    type: Number,
    default: 0
  },

  expiresAt: {
    type: Date,
    required: true,
    expires: 0
  }

}, { timestamps: true });

export default mongoose.models.Otp ||
mongoose.model("Otp", otpSchema);