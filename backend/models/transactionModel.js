import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
  orderId: { type: String, required: true },
  paymentSessionId: { type: String },
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: "Student", required: true },
  amount: { type: Number, required: true },
  currency: { type: String, default: "INR" },
  status: { type: String, enum: ["PENDING", "SUCCESS", "FAILED"], default: "PENDING" },
  paymentMethod: { type: String },
  referenceId: { type: String },
  transactionTime: { type: Date },
}, { timestamps: true });

export default mongoose.model("Transaction", transactionSchema);
