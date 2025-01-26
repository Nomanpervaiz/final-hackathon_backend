import mongoose from "mongoose";

const loanSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  category: { type: String, required: true }, 
  subcategory: { type: String, required: true }, 
  loanAmount: { type: Number, required: true },
  loanPeriod: { type: Number, required: true }, 
  guarantors: [
    {
      name: { type: String, required: true },
      email: { type: String, required: true },
      cnic: { type: String, required: true },
      location: { type: String, required: true },
    }
  ],
  status: { type: String, default: 'Pending' }, 
}, { timestamps: true });

export const LoanModel = mongoose.model('Loan', loanSchema);
