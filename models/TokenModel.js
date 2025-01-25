import mongoose from "mongoose";

const tokenSchema = new mongoose.Schema(
  {
    tokenId: { type: String, required: true, unique: true },
    beneficiaryCnic: { type: String, required: true },
    department: { type: String, required: true },
  },
  { timestamps: true });

export const TokenModel =
  mongoose.models.Token ||
  mongoose.model("Token", tokenSchema);
