import mongoose from "mongoose";

const historySchema  = new mongoose.Schema({
    
        beneficiaryCnic: { type: String, required: true },
        action: { type: String, required: true },
        timestamp: { type: Date, default: Date.now },
        details: { type: String },
            
} , {timestamps : true})

export const HistoryModel =
  mongoose.models.History || mongoose.model("History", historySchema);

