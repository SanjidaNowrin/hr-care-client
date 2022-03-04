import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AddAnnouncement from "./Components/Admin/AddAnnouncement/AddAnnouncement";
import AddCourse from "./Components/Admin/AddCourse/AddCourse";
import AttendanceManage from "./Components/Admin/AttendanceManage/AttendanceManage";
import Employees from "./Components/Admin/Employees/Employees";
import Holidays from "./Components/Admin/Holidays/Holidays";
import IdCard from "./Components/Admin/IdCard/IdCard";
import LeaveApplications from "./Components/Admin/LeaveApplication/LeaveApplications";
import LeaveRequests from "./Components/Admin/LeaveRequests/LeaveRequests";
import MakeAdmin from "./Components/Admin/MakeAdmin/MakeAdmin";
import SalarySheet from "./Components/Admin/SalarySheet/SalarySheet";
import Dashboard from "./Components/Dashboard/Dashboard/Dashboard";
import DashboardHome from "./Components/Dashboard/DashboardHome/DashboardHome";
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
import Teams from './Components/Home/Teams/Teams';
import AuthProvider from "./contexts/AuthProvider";

function App() {
  return (
    <>
      <AuthProvider>
        <Router>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route
              exact
              path={`/dashboard`}
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            >
              <Route path={"/dashboard"} element={<DashboardHome />} />

              <Route
                path={"/dashboard/attendance"}
                element={<MyAttendance />}
              />
              <Route path={"/dashboard/myinfo"} element={<MyInfo />} />
              <Route
                path={"/dashboard/announcements"}
                element={<Announcements />}
              />
              <Route
                path={"/dashboard/announcements/:Id"}
                element={<Announcements />}
              />
              <Route path={"/dashboard/course"} element={<Courses />} />
              <Route path={"/dashboard/leave"} element={<Leave />} />

              <Route
                path={"/dashboard/all_employees"}
                element={<Employees />}
              />
              <Route path={"/dashboard/id_card"} element={<IdCard />} />
              <Route
                path={"/dashboard/manage_attendance"}
                element={<AttendanceManage />}
              />
              <Route
                path={"/dashboard/leaveRequests"}
                element={<LeaveRequests />}
              />
              <Route
                path={"/dashboard/leaveRequests/:Id"}
                element={<LeaveRequests />}
              />
              <Route
                path={"/dashboard/leaveApplications"}
                element={<LeaveApplications />}
              />
              <Route path={"/dashboard/holiday"} element={<Holidays />} />
              <Route
                path={"/dashboard/add_announcement"}
                element={<AddAnnouncement />}
              />
              <Route path={"/dashboard/add_course"} element={<AddCourse />} />
              <Route
                path={"/dashboard/salary_sheet"}
                element={<SalarySheet />}
              />
              <Route path={"/dashboard/make_admin"} element={<MakeAdmin />} />

              <Route path={"/dashboard/salaryInfo"} element={<SalaryInfo />} />
            </Route>
          </Routes>
        </Router>
      </AuthProvider>
    </>
  );
}

export default App;
