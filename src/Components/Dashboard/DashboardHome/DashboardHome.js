import CoPresentIcon from "@mui/icons-material/CoPresent";
import DirectionsWalkIcon from "@mui/icons-material/DirectionsWalk";
import HomeIcon from "@mui/icons-material/Home";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import PersonOffIcon from "@mui/icons-material/PersonOff";
import { Container } from "@mui/material";
import Box from "@mui/material/Box";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Chip from "@mui/material/Chip";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { emphasize, styled } from "@mui/material/styles";
//Employee table detail
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@mui/styles";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import dateFormat from "../../Share/DateFormat/dateFormat";
import BestEmployee from "./BestEmployee";
import TodayAttendance from "./TodayAttendance/TodayAttendance";
import MyCharts from "./MyCharts/MyCharts"
import Request from "./Request/Request"

const DashboardHome = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    fetch("https://ancient-thicket-61342.herokuapp.com/employees/all")
      .then((res) => res.json())
      .then((data) => setEmployees(data.data));
  }, []);

  const [attendance, setAttendance] = useState([]);
  const [todayPresent, setTodayPresent] = useState([]);
  const [leave, setLeave] = useState([]);

  let time = new Date().toLocaleString();
  const todaydate = dateFormat(time.split(",")[0], "yyyy-MM-dd");

  useEffect(() => {
    fetch("https://ancient-thicket-61342.herokuapp.com/attendance")
      .then((res) => res.json())
      .then((data) => setAttendance(data.data));
  }, []);

  //   admin assign task
  const currentDate = dateFormat(
    new Date().toLocaleString().split(",")[0],
    "yyyy-MM-dd"
  );
  const dateString = currentDate.split("-")[1];
  const [taskAssign, setAssignTask] = useState([]);
  const [todayTask, setTodayTask] = useState([]);
  useEffect(() => {
    fetch("https://ancient-thicket-61342.herokuapp.com/taskAssign")
      .then((res) => res.json())
      .then((data) => {
        const filterThisMonthTask = data?.data?.filter(
          (task) => task.date.split("-")[1] === dateString
        );
        const filterTodayTask = data?.data?.filter(
          (task) => task.date === currentDate
        );
        setAssignTask(filterThisMonthTask);
        setTodayTask(filterTodayTask);
      });
  }, []);
  const array = [];

  employees?.map((bestEmp) => {
    let bestEmployee = {};
    let totalTask = 0;
    let totalAssignTask = 0;
    let taskPercentage = 0;
    let findEmail = taskAssign?.filter((x) => x.email === bestEmp.email);
    findEmail.map((calc) => {
      totalAssignTask += calc.tags.length;
      totalTask += calc.taskDone.length;
      if ((totalTask && totalAssignTask) !== 0) {
        taskPercentage = (totalTask / totalAssignTask) * 100;
      }
    });
    bestEmployee.name = bestEmp.name;
    bestEmployee.email = bestEmp.email;
    bestEmployee.photo = bestEmp.photo;
    bestEmployee.taskPoint = totalTask;
    bestEmployee.totalAssignTask = totalAssignTask;
    bestEmployee.taskPercentage = taskPercentage;
    array.push(bestEmployee);
  });

  const finalPoint = array.sort(function (a, b) {
    return b.taskPercentage - a.taskPercentage;
  });

  const check = finalPoint[0]?.taskPercentage?.toFixed(2);

  useEffect(() => {
    const filterData = attendance.filter((item) => item.date === todaydate);
    setTodayPresent(filterData);
  }, [todaydate, attendance]);

  // on leave
  useEffect(() => {
    const filterData = todayPresent.filter((item) => item.status === "Leave");
    setLeave(filterData);
  }, [todayPresent]);

  const totalEmployee = employees.length;
  const present = todayPresent.length;
  const absent = (totalEmployee - present) | 0;

  function leftPad(number) {
    var output = number + '';
    while (output.length < 2) {
      output = '0' + output;
    }
    return output;
  }

  const StyledBreadcrumb = styled(Chip)(({ theme }) => {
    const backgroundColor =
      theme.palette.mode === "light"
        ? theme.palette.grey[100]
        : theme.palette.grey[800];
    return {
      backgroundColor,
      height: theme.spacing(3),
      color: theme.palette.text.primary,
      fontWeight: theme.typography.fontWeightRegular,
      "&:hover, &:focus": {
        backgroundColor: emphasize(backgroundColor, 0.06),
      },
      "&:active": {
        boxShadow: theme.shadows[1],
        backgroundColor: emphasize(backgroundColor, 0.12),
      },
    };
  });

  const useStyle = makeStyles({
    dashTopBox: {
      border: "1px solid #00D2FC",
      borderRadius: "10px",
      overflow: "hidden",
      width: "100%",
      boxShadow: "1px 10px 30px #b6b7b7",
    },
    dashTopText: {
      padding: "13px 10px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      background: "#00D2FC",
    },
  });

  const { dashTopText, dashTopBox } = useStyle();

  const date = new Date();
  const takeDate = date.toString().slice(0, 16);
  return (
    <Container>
      <Typography sx={{ mt: 2, color: "var(--p_color)" }} variant="h4">
        Dashboard
      </Typography>
      <Breadcrumbs aria-label="breadcrumb">
        <Link to="/dashboard">
          <StyledBreadcrumb
            to="/dashboard"
            label="Dashboard"
            icon={<HomeIcon fontSize="small" />}
          />
        </Link>
      </Breadcrumbs>

      <Box sx={{ mt: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={6} md={3}>
            <Box className={dashTopBox}>
              <Box className={dashTopText}>
                <Typography variant="h6" sx={{ color: "#fff" }}>
                  Total Employee
                </Typography>
                <PeopleAltIcon
                  style={{ fontSize: "3rem", color: "#fff" }}
                ></PeopleAltIcon>
              </Box>

              <Typography
                variant="h3"
                sx={{ textAlign: "center", color: "#00D2FC", py: 1 }}
              >
                {leftPad(employees.length)}
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={6} md={3}>
            <Box
              className={dashTopBox}
              sx={{ border: "1px solid #845EC2 !important" }}
            >
              <Box
                className={dashTopText}
                sx={{ background: "#845EC2 !important" }}
              >
                <Typography variant="h6" sx={{ color: "#fff" }}>
                  Present Today
                </Typography>
                <CoPresentIcon
                  style={{ fontSize: "3rem", color: "#fff" }}
                ></CoPresentIcon>
              </Box>
              <Typography
                variant="h3"
                sx={{ textAlign: "center", color: "#845EC2", py: 1 }}
              >
                {leftPad(present)}
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={6} md={3}>
            <Box
              className={dashTopBox}
              sx={{ border: "1px solid #fb3e6a !important" }}
            >
              <Box
                className={dashTopText}
                sx={{ background: "#fb3e6a !important" }}
              >
                <Typography variant="h6" sx={{ color: "#fff" }}>
                  Total Absent
                </Typography>
                <PersonOffIcon
                  style={{ fontSize: "3rem", color: "#fff" }}
                ></PersonOffIcon>
              </Box>
              <Typography
                variant="h3"
                sx={{ textAlign: "center", color: "#fb3e6a", py: 1 }}
              >
                {leftPad(absent)}
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={6} md={3}>
            <Box
              className={dashTopBox}
              sx={{ border: "1px solid #18025B !important" }}
            >
              <Box
                className={dashTopText}
                sx={{ background: "#18025B !important" }}
              >
                <Typography variant="h6" sx={{ color: "#fff" }}>
                  On Leave
                </Typography>
                <DirectionsWalkIcon
                  style={{ fontSize: "3rem", color: "#fff" }}
                ></DirectionsWalkIcon>
              </Box>
              <Typography
                variant="h3"
                sx={{ textAlign: "center", color: "#18025B", py: 1 }}
              >
                {leftPad(leave.length)}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>

      {/* //dash middle  */}
      <Box sx={{ mt: 7 }}>
        <Grid container spacing={5}>
          <Grid item xs={12} md={4}>
            <BestEmployee finalPoint={finalPoint} check={check}></BestEmployee>
          </Grid>

          <Grid item xs={12} md={4} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <MyCharts></MyCharts>
          </Grid>

          <Grid item xs={12} md={4} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Request employees={employees}></Request>
          </Grid>
        </Grid>

      </Box>

      {/* Total attendance area */}
      <Box sx={{ my: 5 }}>
        <Box
          sx={{
            background: "var(--t_color)",
            py: 2,
            px: 2,
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h5">Today Attendance</Typography>
          <Typography variant="h5">{takeDate}</Typography>
        </Box>

        {/* Table on employee details */}
        <Grid container spacing={0}>
          <Grid item xs={12} md={12}>
            <TableContainer sx={{ overflowX: "scroll" }} component={Paper}>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Employee</TableCell>
                    <TableCell align="center">Department</TableCell>
                    <TableCell align="center">In Time</TableCell>
                    <TableCell align="right">Out Time</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {todayPresent.map((item) => (
                    <TodayAttendance
                      key={item._id}
                      item={item}
                    ></TodayAttendance>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default DashboardHome;
