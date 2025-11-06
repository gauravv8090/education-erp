import React, { useEffect, useState } from "react";
import { Box, Typography, Grid, Paper } from "@mui/material";
import axios from "../utils/api";
import Sidebar from "../components/Sidebar";
import { Outlet, useLocation } from "react-router-dom";

export const Dashboard = () => {
  const [summary, setSummary] = useState({
    totalStudents: 0,
    feesCollected: 0,
    pendingFees: 0,
  });

  const location = useLocation();

  const isDashboardHome = location.pathname === "/dashboard";

  useEffect(() => {
    const fetchSummary = async () => {
      const res = await axios.get("/students/summary");
      setSummary(res.data);
    };
    fetchSummary();
  }, [isDashboardHome]);


  return (
    <>
      <Sidebar />
      <Box
        sx={{
          p: 3,
          ml: "240px",
          minHeight: "100vh",
          backgroundColor: "#f9f9f9",
        }}
      >
        <Outlet />

        {isDashboardHome && (
          <>
            <Typography variant="h5" gutterBottom>
              Welcome, Admin
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}>
                <Paper sx={{ p: 2, textAlign: "center" }}>
                  <Typography variant="h6">Total Students</Typography>
                  <Typography variant="h4">
                    {summary.totalStudents}
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Paper sx={{ p: 2, textAlign: "center" }}>
                  <Typography variant="h6">Fees Collected</Typography>
                  <Typography variant="h4">
                    ₹{summary.feesCollected}
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Paper sx={{ p: 2, textAlign: "center" }}>
                  <Typography variant="h6">Pending Fees</Typography>
                  <Typography variant="h4">
                    ₹{summary.pendingFees}
                  </Typography>
                </Paper>
              </Grid>
            </Grid>
          </>
        )}
      </Box>
    </>
  );
};
