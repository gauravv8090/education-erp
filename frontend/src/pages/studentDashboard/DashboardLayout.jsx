import { Box, Typography } from "@mui/material";
import Sidebar from "./Sidebar";
import { Outlet, useLocation } from "react-router-dom";

const DashboardLayout = () => {

  const location = useLocation();

  const isDashboardStudent = location.pathname === "/student-dashboard";

  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Outlet />
        {
            isDashboardStudent && (
        <Typography variant="h5" gutterBottom>
                      Welcome Student
                    </Typography> 
            )
        }
      </Box>
    </Box>
  );
};

export default DashboardLayout;
