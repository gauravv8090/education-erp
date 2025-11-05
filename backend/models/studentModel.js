import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  rollNumber: { type: String, unique: true },
  class: { type: String, required: true },
  section: { type: String },
  totalFees: { type: Number, required: true },
  feesPaid: { type: Boolean, default: false },
  amountPaid: { type: Number, default: 0 },
   password: { type: String, required: true },
}, { timestamps: true });

studentSchema.pre("save", async function (next) {
  if (!this.rollNumber) {
    const count = await mongoose.model("Student").countDocuments();
    this.rollNumber = `STU-${String(count + 1).padStart(4, "0")}`;
  }
  next();
});

const Student = mongoose.model("Student", studentSchema);

export default Student;
