import React, { useState } from "react";
import { Box, Button, TextField, Typography, Paper } from "@mui/material";
import axios from "axios";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isStudentLogin, setIsStudentLogin] = useState(false); // toggle state

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const url = isStudentLogin
        ? "https://education-erp-6thr.onrender.com/api/students/login"
        : "https://education-erp-6thr.onrender.com/api/admin/login";

      const res = await axios.post(url, { email, password });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", isStudentLogin ? "student" : "admin");

      window.location.href = isStudentLogin ? "/student-dashboard" : "/dashboard";
    } catch (err) {
      setError("Invalid credentials");
    }
  };

  return (
    <Box
      component={Paper}
      elevation={3}
      sx={{
        width: 400,
        mx: "auto",
        mt: 10,
        p: 4,
        borderRadius: 2,
      }}
    >
      <Typography variant="h5" mb={2} textAlign="center">
        {isStudentLogin ? "Student Login" : "Admin Login"}
      </Typography>

      <form onSubmit={handleLogin}>
        <TextField
          fullWidth
          label="Email"
          type="email"
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <TextField
          fullWidth
          label="Password"
          type="password"
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {error && (
          <Typography color="error" mt={1}>
            {error}
          </Typography>
        )}

        <Button fullWidth type="submit" variant="contained" sx={{ mt: 2 }}>
          {isStudentLogin ? "Login as Student" : "Login as Admin"}
        </Button>
      </form>

      <Typography
        variant="body2"
        textAlign="center"
        mt={2}
        sx={{ cursor: "pointer", color: "primary.main" }}
        onClick={() => {
          setIsStudentLogin(!isStudentLogin);
          setError("");
          setEmail("");
          setPassword("");
        }}
      >
        {isStudentLogin
          ? "Login as Admin instead"
          : "Login as Student instead"}
      </Typography>
    </Box>
  );
};
