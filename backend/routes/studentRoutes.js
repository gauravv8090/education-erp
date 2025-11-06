import express from "express";
import { createStudent, getStudents, studentLogin, studentProfile, getStudentsSummary } from "../controller/studentController.js";

const router = express.Router();

router.post("/", createStudent);
router.get("/", getStudents);

router.get("/profile", studentProfile);

router.post("/login", studentLogin);

router.get("/summary", getStudentsSummary);
export default router;
