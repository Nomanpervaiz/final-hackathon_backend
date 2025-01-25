import mongoose from "mongoose";

const departmentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    staff: [
      {
        staffId: { type: String },
        name: { type: String },
        role: { type: String },
      },
    ],
    activityLogs: [
      {
        action: { type: String },
        timestamp: { type: Date, default: Date.now },
        details: { type: String },
      },
    ],
  },
  { timestamps: true }
);

export const DepartmentModel =
  mongoose.models.Department || mongoose.model("Department", departmentSchema);

