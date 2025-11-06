import React, { useEffect, useState } from "react";
import { Box, Typography, Paper, Button } from "@mui/material";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import Checkout from "../../components/cashfree/Cashfree";

const StudentProfile = () => {
  const [student, setStudent] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const decoded = jwtDecode(token);
        console.log(decoded, "this is decode")
        const res = await axios.get(`https://education-erp-6thr.onrender.com/api/students/profile?id=${decoded.id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setStudent(res.data);
      } catch (err) {
        console.error("Error fetching profile", err);
      }
    };

    fetchProfile();
  }, []);

  if (!student) return <Typography>Loading profile...</Typography>;

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", mt: 4 }}>
      <Paper sx={{ p: 3, borderRadius: 2 }}>
        <Typography variant="h5" mb={2}>
          Student Profile
        </Typography>
        <Typography><b>Name:</b> {student.name}</Typography>
        <Typography><b>Email:</b> {student.email}</Typography>
        <Typography><b>Class:</b> {student.class}</Typography>
        <Typography><b>Section:</b> {student.section}</Typography>
        <Typography><b>Total Fees:</b> ₹{student.totalFees}</Typography>
        <Typography><b>Paid:</b> ₹{student.amountPaid}</Typography>
        <Typography color={student.pendingFees > 0 ? "error" : "green"}>
          <b>Pending:</b> ₹{student.pendingFees}
        </Typography>

        {student.pendingFees > 0 && (
        <Checkout id={student._id} pendingFees={student.pendingFees}/>
        )}
      </Paper>
    </Box>
  );
};

export default StudentProfile;
