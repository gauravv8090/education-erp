import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ["PRESENT", "ABSENT", "LEAVE"],
    default: "ABSENT",
  },
  remarks: { type: String },
}, { timestamps: true });

// Ensure one record per student per date
attendanceSchema.index({ studentId: 1, date: 1 }, { unique: true });

export default mongoose.model("Attendance", attendanceSchema);
