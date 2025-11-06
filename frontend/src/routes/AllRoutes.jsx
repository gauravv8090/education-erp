import { Routes, Route, Navigate } from "react-router-dom"
import { Login } from "../pages/Login"
import ProtectedRoute from "./ProtectedRoute"
import { Dashboard } from "../pages/Dashboard"
import PublicRoute from "./PublicRoutes"
import AddStudent from "../pages/AddStudent"
import StudentList from "../pages/StudenstList"
import Courses from "../pages/studentDashboard/Courses"
import DashboardLayout from "../pages/studentDashboard/DashboardLayout"
import StudentProfile from "../pages/studentDashboard/Profile"
import Transactions from "../pages/Transactions"
import AttendanceManagement from "../pages/AttendanceManagement"
import StudentAttendance from "../pages/studentDashboard/Attendance"


export const AllRoutes = ()=>{


    return (
        <Routes>
             <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={
                 <PublicRoute>
                <Login/>
                </PublicRoute>
                } ></Route>
            <Route path="/dashboard" element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <Dashboard />
            </ProtectedRoute>
          }
        >
        <Route path="add-student" element={
          <ProtectedRoute allowedRoles={["admin"]} >
            <AddStudent />
          </ProtectedRoute>
          } />
        <Route path="transactions" element={
          <ProtectedRoute allowedRoles={["admin"]} >
            <Transactions />
          </ProtectedRoute>
          } />
        <Route path="attendance" element={
          <ProtectedRoute allowedRoles={["admin"]} >
            <AttendanceManagement />
          </ProtectedRoute>
          } />
          <Route path="students" element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <StudentList/>
            </ProtectedRoute>
            } />
        </Route>
        {/* Student Routes */}
        <Route path="/student-dashboard" element={
          <ProtectedRoute allowedRoles={["student"]}>
          <DashboardLayout />
          </ProtectedRoute>}>
        <Route path="profile" element={
          <ProtectedRoute allowedRoles={["student"]}>
            <StudentProfile />
          </ProtectedRoute>
          } />
        <Route path="courses" element={
          <ProtectedRoute allowedRoles={["student"]}>
          <Courses />
          </ProtectedRoute>
          } />
      <Route path="attendance" element={
  <ProtectedRoute allowedRoles={["student"]}>
    <StudentAttendance />
  </ProtectedRoute>
} />
      </Route>
      {/* <Route
        path="/student-dashboard"
        element={
          <ProtectedRoute allowedRoles={["student"]}>
            <div>Welcome Student!</div>
          </ProtectedRoute>
        }
      /> */}
        </Routes>
    )
}