import { Button, Drawer, List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <Drawer
      variant="permanent"
      anchor="left"
      sx={{
        width: 240,
        "& .MuiDrawer-paper": {
          width: 240,
          boxSizing: "border-box",
          backgroundColor: "#f7deb1ff",
        },
      }}
    >
      <List>
                <ListItem style={{cursor:"pointer"}} button onClick={() => navigate("/student-dashboard")}>
                  <ListItemText primary="Dashboard" />
                </ListItem>
                <ListItem style={{cursor:"pointer"}} button onClick={() => navigate("/student-dashboard/profile")}>
                  <ListItemText primary="Profile" />
                </ListItem>
                <ListItem style={{cursor:"pointer"}} button onClick={() => navigate("/student-dashboard/attendance")}>
                  <ListItemText primary="My Attendance" />
                </ListItem>
                <ListItem style={{cursor:"pointer"}} button onClick={() => navigate("/student-dashboard/courses")}>
                  <ListItemText primary="Courses" />
                </ListItem>
      </List>

                <Button
                style={{cursor:"pointer"}}
        onClick={handleLogout}
        sx={{ mt: "auto", color: "black", position: "absolute", bottom: 20, left: 20 }}
      >
        Logout
      </Button>
    </Drawer>
  );
};

export default Sidebar;
