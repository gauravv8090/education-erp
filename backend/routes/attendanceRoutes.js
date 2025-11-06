import express from "express";
import Attendance from "../models/attendance.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/student/me", authMiddleware, async (req, res) => {
  try {
    const studentId = req.user.id; 
    const records = await Attendance.find({ studentId }).sort({ date: -1 });
    res.json(records);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch attendance" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { date, records } = req.body; 
    if (!date || !records) return res.status(400).json({ error: "Missing data" });

    const bulkOps = records.map(r => ({
      updateOne: {
        filter: { studentId: r.studentId, date: new Date(date) },
        update: { $set: { ...r, date: new Date(date) } },
        upsert: true,
      },
    }));

    await Attendance.bulkWrite(bulkOps);
    res.json({ message: "Attendance updated successfully" });
  } catch (err) {
    console.error("Error marking attendance:", err);
    res.status(500).json({ error: "Failed to mark attendance" });
  }
});


router.get("/date/:date", async (req, res) => {
  try {
    const date = new Date(req.params.date);
    const attendance = await Attendance.find({ date })
      .populate("studentId", "name email rollNumber");
    res.json(attendance);
  } catch (err) {
    console.error("Error fetching attendance:", err);
    res.status(500).json({ error: "Failed to fetch attendance" });
  }
});


router.get("/student/:id", async (req, res) => {
  try {
    const attendance = await Attendance.find({ studentId: req.params.id });
    res.json(attendance);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch student attendance" });
  }
});

export default router;
