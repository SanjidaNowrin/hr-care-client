import { Container, Paper, Divider } from "@mui/material";
import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TaskIcon from "@mui/icons-material/Task";
import GroupsIcon from "@mui/icons-material/Groups";
import { makeStyles } from "@mui/styles";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import HomeIcon from "@mui/icons-material/Home";
import { Link } from "react-router-dom";
import { emphasize, styled } from "@mui/material/styles";
import Chip from "@mui/material/Chip";
import LineChartsChartJs from "../Charts/LineChartsChartJs";
import PieChartsChartJs from "../Charts/PieChartsChartJs";
import dateFormat from "../../Share/DateFormat/dateFormat";
import DateRangeIcon from '@mui/icons-material/DateRange';
import CoPresentIcon from '@mui/icons-material/CoPresent';
import PersonOffIcon from '@mui/icons-material/PersonOff';
import HolidayVillageIcon from '@mui/icons-material/HolidayVillage';
import useAuth from "../../../hooks/useAuth";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";

import fun from '../../../assets/images/fun2.png';
import LeaveCalender from "./LeaveCalender/LeaveCalender";
import { useDispatch, useSelector } from 'react-redux';
import { fetchTask } from "../../../redux/slices/employeeDashboardSlice.js";


const EmployeeDashboardHome = () => {
  const { user } = useAuth();
  const [attendance, setAttendance] = useState([]);
  const [holiday, setHoliday] = useState([]);
  const [leave, setLeave] = useState([]);
  const [present, setPresent] = useState([]);
  const [sickLeave, setSickLeave] = useState([]);
  const [casualLeave, setCasualLeave] = useState([]);

  console.log("leave", leave, sickLeave, casualLeave)
  const [toDo, setToDo] = useState([]);
  const [checked, setChecked] = React.useState([]);
  const [thisMonthTask, setThisMonthTask] = React.useState([]);

  const [taskUpdate, setTaskUpdate] = useState(false);
  // fetch attendence

  const currentDate = dateFormat(
    new Date().toLocaleString().split(",")[0],
    "yyyy-MM-dd"
  );

  const dateString = currentDate.split("-")[1];
  const lastDay = parseInt(currentDate.split("-")[2]);

  useEffect(() => {
    fetch(
      `https://ancient-thicket-61342.herokuapp.com/attendance/${user.email}`
    )
      .then((res) => res.json())
      .then((data) => {
        const filteredData = data?.result?.filter(
          (x) => x?.date?.split("-")[1] === dateString
        );

        const filteredHoliday = data?.result?.filter(
          (y) => y.status === "Holiday"
        );
        const filteredLeave = data?.result?.filter((y) => y.status === "Leave");
        const filteredPresent = data?.result?.filter((y) => y.status === "Present");
        const filteredSickLeave = data?.result?.filter((y) => y.vacation === "Sick Leave");
        const filteredCasualLeave = data?.result?.filter((y) => y.vacation === "Casual Leave");
        setLeave(filteredLeave);
        setAttendance(filteredData);
        setHoliday(filteredHoliday);
        setPresent(filteredPresent)
        setSickLeave(filteredSickLeave)
        setCasualLeave(filteredCasualLeave)
        console.log(data.result, filteredData, filteredHoliday);
      });
  }, [dateString, user?.email]);

  // redux
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchTask());
  }, [dispatch, user?.email, taskUpdate, currentDate, checked, dateString]);

  const allTasks = useSelector((state) => state?.employee?.task)
  console.log(allTasks)
  //assign task
  useEffect(() => {
    const filterThisMonthTask = allTasks?.data?.filter(
      (task) =>
        task?.email === user?.email && task?.date.split("-")[1] === dateString
    );
    const filterTask = allTasks?.data?.filter(
      (task) => task?.email === user?.email && task?.date === currentDate
    );
    setToDo(filterTask);
    // setChecked(filterTask[0]?.taskDone);
    setThisMonthTask(filterThisMonthTask);
    console.log(filterThisMonthTask, filterTask)

  }, [taskUpdate, user?.email, currentDate, checked, dateString, allTasks]);
  console.log(toDo, checked,user.email)
  // task summary
  let totalTask = 0;
  let doneTask = 0;
  thisMonthTask?.map(task => {
    totalTask += task?.tags?.length
    doneTask += task?.taskDone?.length
  })
  console.log(totalTask, doneTask)

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
    dashBox: {
      border: "1px solid #00D2FC",
      borderRadius: "10px",
      overflow: "hidden",
      width: "100%",
      boxShadow: "1px 10px 30px #b6b7b7",
    },
    dashText: {
      padding: "13px 10px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      background: "#00D2FC",
    }
  });

  const { dashText, dashBox } = useStyle();

  // Assign task
  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
    fetch(`https://ancient-thicket-61342.herokuapp.com/taskAssign`, {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        email: user.email,
        date: currentDate,
        task: newChecked,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setTaskUpdate(!taskUpdate);
      });
  };

  function leftPad(number) {
    var output = number + "";
    while (output.length < 2) {
      output = "0" + output;
    }
    return output;
  }

  return (
    <Container sx={{}}>
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
            <Box className={dashBox}>
              <Box className={dashText}>
                <Typography variant="h6" sx={{ color: "#fff" }}>
                  Working Day
                </Typography>
                <DateRangeIcon
                  style={{ fontSize: "3rem", color: "#fff" }}
                ></DateRangeIcon>
              </Box>

              <Typography
                variant="h3"
                sx={{ textAlign: "center", color: "#00D2FC", py: 1 }}
              >
                {leftPad(lastDay - holiday.length)}
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={6} md={3}>
            <Box
              className={dashBox}
              sx={{ border: "1px solid #845EC2 !important" }}
            >
              <Box
                className={dashText}
                sx={{ background: "#845EC2 !important" }}
              >
                <Typography variant="h6" sx={{ color: "#fff" }}>
                  Total Present
                </Typography>
                <CoPresentIcon
                  style={{ fontSize: "3rem", color: "#fff" }}
                ></CoPresentIcon>
              </Box>
              <Typography
                variant="h3"
                sx={{ textAlign: "center", color: "#845EC2", py: 1 }}
              >
                {leftPad(present.length)}
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={6} md={3}>
            <Box
              className={dashBox}
              sx={{ border: "1px solid #fb3e6a !important" }}
            >
              <Box
                className={dashText}
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
                {leftPad(lastDay - present.length - holiday.length - leave.length)}
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={6} md={3}>
            <Box
              className={dashBox}
              sx={{ border: "1px solid #18025B !important" }}
            >
              <Box
                className={dashText}
                sx={{ background: "#18025B !important" }}
              >
                <Typography variant="h6" sx={{ color: "#fff" }}>
                  Total Holiday
                </Typography>
                <HolidayVillageIcon
                  style={{ fontSize: "3rem", color: "#fff" }}
                ></HolidayVillageIcon>
              </Box>
              <Typography
                variant="h3"
                sx={{ textAlign: "center", color: "#18025B", py: 1 }}
              >
                {leftPad(holiday.length)}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>

      {/* charts */}
      <Box sx={{ mt: 6 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Paper elevation={6} sx={{ pt: 2, pb: 3 }}>
              <Typography variant="h5" sx={{ textAlign: 'center', fontFamily: 'var(--PT_font)', mb: 1 }}>
                Leave Structure
              </Typography>
              <PieChartsChartJs casualLeave={casualLeave} sickLeave={sickLeave} ></PieChartsChartJs>
            </Paper>
          </Grid>

          <Grid item xs={12} md={8}>
            <Paper elevation={6} sx={{ maxWidth: { xs: '340px', sm: '100%', md: '100%' }, margin: 'auto', height: '100%', border: '1px solid #b6b7b7', p: 2 }}>
              <LineChartsChartJs thisMonthTask={thisMonthTask}></LineChartsChartJs>
            </Paper>
          </Grid>
        </Grid>
      </Box>

      {/* ASSIGN Task */}
      <Box sx={{ mt: 6, mb: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Paper elevation={6}>
              <List dense sx={{ height: '350px', width: '100%' }}>
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-around", mb: 1 }}>
                  <Typography variant="h5" sx={{ textAlign: 'center', fontFamily: 'var(--PT_font)' }}>
                    Assign Task
                  </Typography>
                  <TaskIcon sx={{ color: '#00D2FC', fontSize: '3rem' }} />
                </Box>
                <Divider />

                {toDo[0]?.tags ? <>{toDo[0]?.tags?.map((value) => {
                  const labelId = `checkbox-list-secondary-label-${value}`;
                  return (
                    <ListItem
                      key={value}
                      secondaryAction={
                        <Checkbox
                          edge="end"
                          onChange={handleToggle(value)}
                          // checked={toDo[0]?.taskDone.indexOf(value) !== -1}
                          inputProps={{ "aria-labelledby": labelId }}
                        />
                      }
                      disablePadding
                    >
                      <ListItemButton>
                        <ListItemText id={value._id} primary={value} />
                      </ListItemButton>
                    </ListItem>
                  );
                })}</>
                  : <Box sx={{ height: '100%', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                    <Typography variant="h5">
                      No Task Assign Yet
                    </Typography>
                    <Box sx={{ height: '80%', width: '100%', display: 'flex', justifyContent: 'center' }}>
                      <img src={fun} height='220px' width='220px' alt="" />
                    </Box>
                  </Box>}
              </List>
            </Paper>
          </Grid>

          {/* task summary */}
          <Grid item xs={12} md={4}>
            <Paper elevation={6} sx={{ height: '350px', width: '100%' }}>
              <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-around", py: 1 }}>
                <Typography variant="h5" sx={{ textAlign: 'center', fontFamily: 'var(--PT_font)' }}>
                  Leave Dates
                </Typography>
                <DateRangeIcon sx={{ color: '#00D2FC', fontSize: '3rem' }} />
              </Box>
              <Divider />

              <Box sx={{ display: "flex", width: '100%', justifyContent: "center" }}>
                <LeaveCalender sx={{ width: '100%', boxShadow: '0', margin: '0 auto' }} leave={leave} />
              </Box>
            </Paper>
          </Grid>

          {/* meeting card */}
          <Grid item xs={12} md={4}>
            <Paper elevation={6} sx={{ height: '350px', width: '100%' }}>
              <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-around", py: 1 }}>
                <Typography variant="h5" sx={{ textAlign: 'center', fontFamily: 'var(--PT_font)' }}>
                  Meeting
                </Typography>
                <GroupsIcon sx={{ color: '#00D2FC', fontSize: '3rem' }} />
              </Box>
              <Divider />

              {toDo[0]?.startTime ? <Box sx={{ mt: 1, ml: 2 }}>
                <Typography variant="h5" component="div">
                  Meeting Today
                </Typography>
                <Typography variant="body2">
                  {toDo[0]?.startTime}AM
                </Typography>
              </Box> :
                <Box sx={{ height: '100%', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                  <Typography variant="h5">
                    No Meeting Schedule Yet
                  </Typography>
                  <Box sx={{ height: '80%', width: '100%', display: 'flex', justifyContent: 'center' }}>
                    <img src={fun} height='220px' width='220px' alt="" />
                  </Box>
                </Box>}
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default EmployeeDashboardHome;