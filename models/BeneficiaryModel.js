import mongoose from "mongoose";

const beneficiarySchema = new mongoose.Schema(
  {
    cnic: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    purpose: { type: String, required: true },
    status: {
      type: String,
      enum: ["pending", "in_progress", "completed"],
      default: "pending",
    },
    history: [
      {
        action: { type: String },
        remarks: { type: String },
      },
      { timestamp: true },
    ],
  },
  { timestamps: true }
);

export const beneficiaryModel =
  mongoose.models.Beneficiary ||
  mongoose.model("Beneficiary", beneficiarySchema);
