import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Stack,
} from "@mui/material";
import axios from "../utils/api";
import toast from "react-hot-toast";

const AddStudent = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    class: "",
    section: "",
    totalFees: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validateForm = () => {
    let temp = {};
    if (!form.name.trim()) temp.name = "Name is required.";
    if (!form.email.trim()) temp.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(form.email)) temp.email = "Invalid email.";
    if (!form.class.trim()) temp.class = "Class is required.";
    else if (isNaN(form.class) || form.class < 1 || form.class > 12)
      temp.class = "Class must be between 1 and 12.";
    if (!form.section.trim()) temp.section = "Section is required.";
    else if (!/^[A-Z]$/.test(form.section.toUpperCase()))
      temp.section = "Section must be a single letter (A–Z).";
    if (!form.totalFees.trim()) temp.totalFees = "Total fees is required.";
    else if (isNaN(form.totalFees) || form.totalFees <= 0)
      temp.totalFees = "Enter a valid positive amount.";

    setErrors(temp);
    return Object.keys(temp).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      await axios.post("/students", form);
      toast.success("Student created successfully!");
      setForm({ name: "", email: "", class: "", section: "", totalFees: "" });
    } catch (err) {
      toast.error("Error creating student");
      console.error(err);
    }
  };

  return (
    <Paper sx={{ p: 3, maxWidth: 500 }}>
      <Typography variant="h6" mb={2}>
        Add New Student
      </Typography>
      <Box component="form" onSubmit={handleSubmit}>
        <Stack spacing={2}>
          <TextField
            label="Name"
            name="name"
            value={form.name}
            onChange={handleChange}
            error={!!errors.name}
            helperText={errors.name}
            required
          />
          <TextField
            label="Email"
            name="email"
            value={form.email}
            onChange={handleChange}
            error={!!errors.email}
            helperText={errors.email}
            required
          />
          <TextField
            label="Class"
            name="class"
            value={form.class}
            onChange={handleChange}
            error={!!errors.class}
            helperText={errors.class}
            required
          />
          <TextField
            label="Section"
            name="section"
            value={form.section}
            onChange={handleChange}
            error={!!errors.section}
            helperText={errors.section}
            required
          />
          <TextField
            label="Total Fees (₹)"
            name="totalFees"
            value={form.totalFees}
            onChange={handleChange}
            error={!!errors.totalFees}
            helperText={errors.totalFees}
            required
          />
          <Button variant="contained" type="submit">
            Create Student
          </Button>
        </Stack>
      </Box>
    </Paper>
  );
};

export default AddStudent;
