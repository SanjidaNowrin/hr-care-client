import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Components/Home/Home/Home";
import Login from "./Components/Login/Login/Login";
import Register from "./Components/Login/Register/Register";
import AuthProvider from "./contexts/AuthProvider";
import Dashboard from "./Components/Dashboard/Dashboard/Dashboard";
import DashboardHome from "./Components/Dashboard/DashboardHome/DashboardHome";
import MyInfo from "./Components/Employee/MyInfo/MyInfo";
import SalaryInfo from "./Components/Employee/SalaryInfo/SalaryInfo";
import EmployeeAttendance from "./Components/Employee/EmployeeAttendance/EmployeeAttendance";
import PrivateRoute from "./Components/Routes/PrivateRoute/PrivateRoute";
import Holidays from "./Components/Admin/Holidays/Holidays";
import Courses from "./Components/Employee/Courses/Courses";

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

            <Route exact path={`/dashboard`} element={<PrivateRoute><Dashboard /></PrivateRoute>}>
              <Route path={"/dashboard"} element={<DashboardHome />} />

              <Route path={"/dashboard/home"} element={<Home />} />
              <Route path={"/dashboard/myinfo"} element={<MyInfo />} />
              <Route
                path={"/dashboard/attendance"}
                element={<EmployeeAttendance />}
              />

              <Route
                path={'/dashboard/holiday'}
                element={
                  <Holidays />
                }
              />

              <Route
                path={'/dashboard/course'}
                element={
                  <Courses />
                }
              />

              <Route
                exact
                path={'*'}
                element={
                  <Home />
                }
              />

              <Route path="/dashboard/salary" element={<SalaryInfo />} />
            </Route>

          </Routes>
        </Router>
      </AuthProvider>
    </>
  );
}

export default App;
