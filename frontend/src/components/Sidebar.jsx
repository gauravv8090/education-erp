import { Drawer, List, ListItem, ListItemText, Button } from "@mui/material";
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
      sx={{
        width: 240,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: 240,
          boxSizing: "border-box",
          backgroundColor: "#464141",
          color: "white",
        },
      }}
    >
      <List>
        <ListItem style={{cursor:"pointer"}} button onClick={() => navigate("/dashboard")}>
          <ListItemText primary="Dashboard Home" />
        </ListItem>
        <ListItem style={{cursor:"pointer"}} button onClick={() => navigate("/dashboard/add-student")}>
          <ListItemText primary="Add Student" />
        </ListItem>
        <ListItem style={{cursor:"pointer"}} button onClick={() => navigate("/dashboard/students")}>
          <ListItemText primary="All Students" />
        </ListItem>
        <ListItem style={{cursor:"pointer"}} button onClick={() => navigate("/dashboard/attendance")}>
          <ListItemText primary="Attendance" />
        </ListItem>
        <ListItem style={{cursor:"pointer"}} button onClick={() => navigate("/dashboard/transactions")} >
  <ListItemText primary="Transactions" />
</ListItem>

      </List>
      <Button
      style={{cursor:"pointer"}}
        onClick={handleLogout}
        sx={{ mt: "auto", color: "white", position: "absolute", bottom: 20, left: 20 }}
      >
        Logout
      </Button>
    </Drawer>
  );
};

export default Sidebar;
