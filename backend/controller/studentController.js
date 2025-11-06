import Student from "../models/studentModel.js";
import { sendEmail } from "../utils/sendEmail.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Resend } from 'resend';

const resend = new Resend('re_4mh1Bxfq_K2Y5NTR8KX53osR9RV7ypz6t');

export const getStudentsSummary = async (req, res) => {
  try {
    const students = await Student.find(); 
    const totalStudents = students.length;

    const feesCollected = students.reduce(
      (sum, s) => sum + (s.amountPaid || 0),
      0
    );
    const totalFees = students.reduce(
      (sum, s) => sum + (s.totalFees || 0),
      0
    );
    const pendingFees = totalFees - feesCollected;

    res.json({ totalStudents, feesCollected, pendingFees });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching summary" });
  }
};


export const studentLogin = async (req, res) => {
  const { email, password } = req.body;

  console.log(email, password, "api call is getting made")
  try {
    const student = await Student.findOne({ email });
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    const isMatch = await bcrypt.compare(password, student.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
      { id: student._id, role: "student" },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      message: "Login successful",
      token,
      student: {
        name: student.name,
        email: student.email,
        class: student.class,
        section: student.section,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Create a new student
export const createStudent = async (req, res) => {
  try {
    const tempPassword = Math.random().toString(36).slice(-8);
    const hashedPassword = await bcrypt.hash(tempPassword, 10);
    const studentObject = {...req.body, password : hashedPassword}
    const student = new Student(studentObject);
    const saved = await student.save();

    res.status(201).json(saved);

    // Email content
    const html = `
      <h3>Welcome to EduERP, ${saved.name}!</h3>
      <p>You have been successfully registered.</p>
      <p><b>Roll Number:</b> ${saved.rollNumber}</p>
      <p><b>Email:</b> ${saved.email}</p>
      <p><b>Temporary Password:</b> ${tempPassword}</p>
      <p>Please log in using these credentials and update your password after login.</p>
      <br/>
      <p>Regards,<br/>ERP Admin</p>
    `;

    await resend.emails.send({
  from: "EduERP <no-reply@eduerp.com>",
  to: saved.email,
  subject: "Welcome to EduERP",
  html,
});
    // Send registration email
    //  sendEmail(saved.email, "Welcome to Education ERP", html)
    //  .then(() => console.log("Email sent to:", saved.email))
    //   .catch((err) => console.error("Email failed:", err));
    
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//Get student profile
export const studentProfile = async (req, res) => {
  try {
    const {id} = req.query
    const student = await Student.findById(id).select("-password");
    if (!student) return res.status(404).json({ message: "Student not found" });

    const pendingFees = student.totalFees - (student.amountPaid || 0);
    res.json({ ...student._doc, pendingFees });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};
//Get all students
export const getStudents = async (req, res) => {
  try {
    const students = await Student.find().sort({ createdAt: -1 });
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
