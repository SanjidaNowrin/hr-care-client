import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AddAnnouncement from "./Components/Admin/AddAnnouncement/AddAnnouncement";
import AddCourse from "./Components/Admin/AddCourse/AddCourse";
import AttendanceManages from "./Components/Admin/AttendanceManage/AttendanceManages";
import Employees from "./Components/Admin/Employees/Employees";
import Holidays from "./Components/Admin/Holidays/Holidays";
import IdCard from "./Components/Admin/IdCard/IdCard";
import LeaveRequests from "./Components/Admin/LeaveRequests/LeaveRequests";
import MakeAdmin from "./Components/Admin/MakeAdmin/MakeAdmin";
import SalarySheet from "./Components/Admin/SalarySheet/SalarySheet";
import Dashboard from "./Components/Dashboard/Dashboard/Dashboard";
import DashboardHome from "./Components/Dashboard/DashboardHome/DashboardHome";
import EmployeeDashboardHome from "./Components/Dashboard/DashboardHome/EmployeeDashboardHome";
import Announcements from "./Components/Employee/Announcements/Announcements";
import Courses from "./Components/Employee/Courses/Courses";
import Leave from "./Components/Employee/Leave/Leave";
import MyAttendance from "./Components/Employee/MyAttendance/MyAttendance";
import MyInfo from "./Components/Employee/MyInfo/MyInfo";
import SalaryInfo from "./Components/Employee/SalaryInfo/SalaryInfo";
import Home from "./Components/Home/Home/Home";
import Login from "./Components/Login/Login/Login";
import Register from "./Components/Login/Register/Register";
import PrivateRoute from "./Components/Routes/PrivateRoute/PrivateRoute";
import Teams from "./Components/Home/Teams/Teams";
import AuthProvider from "./contexts/AuthProvider";
import TaskAssign from "./Components/Admin/TaskAssign/TaskAssign";
import EnrollCourse from "./Components/Employee/Courses/EnrollCourse/EnrollCourse";
import AdminRoute from "./Components/Routes/AdminRoute/AdminRoute";
import Nopage from "./Components/Share/Nopage/Nopage";

function App() {
  return (
    <>
      <AuthProvider>
        <Router>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/about" element={<Teams />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route exact path={`/dashboard`} element={<PrivateRoute><Dashboard /></PrivateRoute>}
            >
              <Route path={"/dashboard/employeeDashboard"} element={<EmployeeDashboardHome />} />
              <Route path={"/dashboard/myinfo"} element={<MyInfo />} />
              <Route path={"/dashboard/attendance"} element={<MyAttendance />} />
              <Route path={"/dashboard/announcements"} element={<Announcements />} />
              <Route path={"/dashboard/announcements/:Id"} element={<Announcements />} />
              <Route path={"/dashboard/course"} element={<Courses />} />
              <Route
                path={"/dashboard/enroll/:id"}
                element={<EnrollCourse />}
              />
              <Route path={"/dashboard/leave"} element={<Leave />} />

              <Route path={"/dashboard"} element={<AdminRoute><DashboardHome /></AdminRoute>} />
              <Route path={"/dashboard/all_employees"} element={<AdminRoute><Employees /></AdminRoute>} />
              <Route path={"/dashboard/id_card"} element={<AdminRoute><IdCard /> </AdminRoute>} />
              <Route path={"/dashboard/manage_attendance"} element={<AdminRoute><AttendanceManages /></AdminRoute>} />
              <Route path={"/dashboard/leaveRequests"} element={<AdminRoute><LeaveRequests /></AdminRoute>} />
              <Route path={"/dashboard/leaveRequests/:Id"} element={<AdminRoute><LeaveRequests /></AdminRoute>} />
              <Route path={"/dashboard/holiday"} element={<AdminRoute><Holidays /></AdminRoute>} />
              <Route path={"/dashboard/task_assign"} element={<AdminRoute><TaskAssign /></AdminRoute>} />
              <Route path={"/dashboard/add_announcement"} element={<AdminRoute><AddAnnouncement /></AdminRoute>} />
              <Route path={"/dashboard/add_course"} element={<AdminRoute><AddCourse /></AdminRoute>} />
              <Route path={"/dashboard/salary_sheet"} element={<AdminRoute><SalarySheet /></AdminRoute>} />
              <Route path={"/dashboard/make_admin"} element={<AdminRoute><MakeAdmin /></AdminRoute>} />
              <Route path={"/dashboard/salaryInfo"} element={<AdminRoute><SalaryInfo /></AdminRoute>} />
            </Route>

            <Route path="/*" element={<Nopage />} />
          </Routes>
        </Router>
      </AuthProvider>
    </>
  );
}

export default App;
