import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Components/Home/Home/Home";
import Login from "./Components/Login/Login/Login";
import Register from "./Components/Login/Register/Register";
import AuthProvider from "./contexts/AuthProvider";
import Dashboard from "./Components/Dashboard/Dashboard/Dashboard";
import DashboardHome from "./Components/Dashboard/DashboardHome/DashboardHome";
import MyInfo from "./Components/Employee/MyInfo/MyInfo";
import MyAttendance from "./Components/Employee/MyAttendance/MyAttendance";
import SalaryInfo from "./Components/Employee/SalaryInfo/SalaryInfo";
import PrivateRoute from "./Components/Routes/PrivateRoute/PrivateRoute";
import Courses from "./Components/Employee/Courses/Courses";
import AttendanceManage from "./Components/Admin/AttendanceManage/AttendanceManage";
import SalarySheet from "./Components/Admin/SalarySheet/SalarySheet";
import Announcements from "./Components/Employee/Announcements/Announcements";
import Holidays from "./Components/Admin/Holidays/Holidays";
import Leave from "./Components/Admin/Leave/Leave";
import EmployerInfo from "./Components/Admin/EmployerInfo/EmployerInfo";

function App() {
  return (
    <>
      <AuthProvider>
        <Router>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route exact path={`/dashboard`} element={<PrivateRoute> <Dashboard /> </PrivateRoute>} >
              <Route path={"/dashboard"} element={<DashboardHome />} />

              <Route path={"/dashboard/attendance"} element={<MyAttendance />} />
              <Route path={"/dashboard/myinfo"} element={<MyInfo />} />
              <Route path={"/dashboard/announcements"} element={<Announcements />} />
              <Route path={"/dashboard/announcements/:Id"} element={<Announcements />} />
              <Route path={"/dashboard/course"} element={<Courses />} />



              <Route path={'/dashboard/all_employees'} element={<EmployerInfo />} />
              <Route path={'/dashboard/id_card'} element={<Home />} />
              <Route path={'/dashboard/manage_attendance'} element={<AttendanceManage />} />
              <Route path={"/dashboard/leave"} element={<Leave />} />
              <Route path={'/dashboard/holiday'} element={<Holidays />} />
              <Route path={'/dashboard/salary_sheet'} element={<SalarySheet />} />

              <Route path={"/dashboard/salaryInfo"} element={<SalaryInfo />} />
            </Route>
          </Routes>
        </Router>
      </AuthProvider>
    </>
  );
}

export default App;