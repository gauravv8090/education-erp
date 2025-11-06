import React from "react";
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const PublicRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  if (token) {
    try {
      const decoded = jwtDecode(token);
      const currentTime = Date.now() / 1000;

      if (decoded.exp > currentTime) {
        console.log(decoded,"this is decode")
        if(decoded.role === "student"){
          return <Navigate to="/student-dashboard" replace />;
        }else{
          return <Navigate to="/dashboard" replace />;
        }
      } else {
        localStorage.removeItem("token");
      }
    } catch (err) {
      localStorage.removeItem("token");
    }
  }

  return children; 
};

export default PublicRoute;
