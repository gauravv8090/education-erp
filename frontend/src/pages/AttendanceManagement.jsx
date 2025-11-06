import React, { useEffect, useState } from "react";
import {
  Box, Typography, Table, TableHead, TableRow, TableCell, TableBody,
  Paper, Select, MenuItem, Button, TextField
} from "@mui/material";
import axios from "../utils/api";
import toast from "react-hot-toast";

const AttendanceManagement = () => {
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState({});
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);

  useEffect(() => {
    const fetchStudents = async () => {
      const res = await axios.get("/students");
      setStudents(res.data);
      const initial = {};
      res.data.forEach(s => initial[s._id] = "PRESENT");
      setAttendance(initial);
    };
    fetchStudents();
  }, []);

  const handleChange = (id, status) => {
    setAttendance(prev => ({ ...prev, [id]: status }));
  };

  const handleSubmit = async () => {
    try {
      const records = Object.entries(attendance).map(([studentId, status]) => ({
        studentId, status,
      }));
      await axios.post("/attendance", { date, records });
      toast.success("Attendance saved successfully!");
    } catch (err) {
      console.error("Error saving attendance:", err);
    }
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom>Attendance Management</Typography>
      <Paper sx={{ p: 2 }}>
        <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
          <TextField
            type="date"
            label="Select Date"
            value={date}
            onChange={e => setDate(e.target.value)}
          />
          <Button variant="contained" onClick={handleSubmit}>Save Attendance</Button>
        </Box>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Student Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {students.map(s => (
              <TableRow key={s._id}>
                <TableCell>{s.name}</TableCell>
                <TableCell>{s.email}</TableCell>
                <TableCell>
                  <Select
                    value={attendance[s._id] || "PRESENT"}
                    onChange={e => handleChange(s._id, e.target.value)}
                  >
                    <MenuItem value="PRESENT">PRESENT</MenuItem>
                    <MenuItem value="ABSENT">ABSENT</MenuItem>
                    <MenuItem value="LEAVE">LEAVE</MenuItem>
                  </Select>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
};

export default AttendanceManagement;
