import React, { useEffect, useState } from "react";
import {
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
  CircularProgress,
  Box,
  Button,
} from "@mui/material";
import axios from "../utils/api";

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await axios.get("/students");
        setStudents(res.data);
      } catch (err) {
        console.error("Error fetching students:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStudents();
  }, []);

  if (loading)
    return (
      <Box display="flex" justifyContent="center" mt={5}>
        <CircularProgress />
      </Box>
    );

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" mb={2}>
        Student List
      </Typography>
      {students.length === 0 ? (
        <Typography>No students found.</Typography>
      ) : (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Roll No.</TableCell>
              <TableCell>Class</TableCell>
              <TableCell>Section</TableCell>
              <TableCell>Total Fees</TableCell>
              <TableCell>Fees Paid</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {students.map((s) => (
              <TableRow key={s._id}>
                <TableCell>{s.name}</TableCell>
                <TableCell>{s.email}</TableCell>
                <TableCell>{s.rollNumber}</TableCell>
                <TableCell>{s.class}</TableCell>
                <TableCell>{s.section || "-"}</TableCell>
                <TableCell>{s.totalFees || "-"}</TableCell>
                <TableCell>
                  {s.feesPaid ? (
                    <Button variant="outlined" color="success" size="small">
                      Paid
                    </Button>
                  ) : (
                    <Button variant="outlined" color="error" size="small">
                      Unpaid
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </Paper>
  );
};

export default StudentList;
