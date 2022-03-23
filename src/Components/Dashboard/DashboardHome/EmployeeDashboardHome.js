import { Container } from "@mui/material";
import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TrendingDownIcon from "@material-ui/icons/TrendingDown";
import TodayIcon from "@material-ui/icons/Today";
import TrendingUpIcon from "@material-ui/icons/TrendingUp";
import TaskIcon from "@mui/icons-material/Task";
import GroupsIcon from "@mui/icons-material/Groups";
import { makeStyles } from "@mui/styles";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import HomeIcon from "@mui/icons-material/Home";
import { Link } from "react-router-dom";
import { emphasize, styled } from "@mui/material/styles";
import Chip from "@mui/material/Chip";
import PieCharts from "../Charts/PieCharts";
import LineCharts from "../Charts/LineCharts";
import BarChartJs from "../Charts/BarChartJs";
import DoughnutChartJs from "../Charts/DoughnutChartJs";
import LineChartsChartJs from "../Charts/LineChartsChartJs";
import PieChartsChartJs from "../Charts/PieChartsChartJs";
import dateFormat from "../../Share/DateFormat/dateFormat";
import useAuth from "../../../hooks/useAuth";
import CalenderChar from "../DashboardHome/HolidayCalender/CalenderChart";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Checkbox from "@mui/material/Checkbox";


import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import fun from '../../../assets/images/fun2.png';
import LeaveCalender from "./LeaveCalender/LeaveCalender";


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
  console.log(lastDay, typeof (lastDay))

  console.log(dateString, currentDate, holiday, attendance);
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

  //assign task
  useEffect(() => {
    fetch("https://ancient-thicket-61342.herokuapp.com/taskAssign")
      .then((res) => res.json())
      .then((data) => {
        const filterThisMonthTask = data?.data?.filter(
          (task) =>
            task.email === user.email && task.date.split("-")[1] === dateString
        );
        const filterTask = data?.data?.filter(
          (task) => task.email === user.email && task.date === currentDate
        );
        setToDo(filterTask);
        setChecked(filterTask[0]?.taskDone);
        setThisMonthTask(filterThisMonthTask);
      });
  }, [taskUpdate, user.email, currentDate, checked, dateString]);
  // task summary

  let totalTask = 0;
  let doneTask = 0;
  thisMonthTask.map(task => {
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
      border: '.5px solid #b6b7b7',
      borderRadius: "10px",
      overflow: "hidden",
      width: "100%",
      height: "120px",
      background: "white",
      // boxShadow: '1px 10px 10px #b6b7b7'
    },
    dashText: {
      padding: "13px 10px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "",
    },
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
    console.log(newChecked);
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
          <Grid item xs={12} md={3}>
            <Box sx={{ background: "rgba(54, 162, 235, .6)" }} className={dashBox}>
              <Box className={dashText}>
                <Typography
                  variant="h6"
                  sx={{ color: "black", textAlign: "center" }}
                >
                  Total Working Day
                </Typography>
                <br />
              </Box>
              {/* <TodayIcon></TodayIcon> */}
              <Typography
                variant="h3"
                sx={{
                  textAlign: "center",
                  color: "black",
                  py: 1,
                }}
              >
                {lastDay - holiday.length}
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12} md={3}>
            <Box className={dashBox} sx={{ background: 'rgba(75, 192, 192, .6)' }}>
              <Box className={dashText} sx={{}}>
                <Typography
                  variant="h6"
                  sx={{ color: "black" }}
                >
                  Present
                </Typography>
              </Box>
              <Typography
                variant="h3"
                sx={{
                  textAlign: "center",
                  color: "black",
                  py: 1,
                }}
              >
                {present.length}
              </Typography>
              {/* <TrendingUpIcon></TrendingUpIcon> */}
            </Box>
          </Grid>

          <Grid item xs={12} md={3}>
            <Box className={dashBox} sx={{ background: 'rgba(255, 99, 132, .6)' }}>
              <Box className={dashText} sx={{}}>
                <Typography
                  variant="h6"
                  sx={{ color: "black" }}
                >
                  Absent
                </Typography>
              </Box>
              <Typography
                variant="h3"
                sx={{
                  textAlign: "center",
                  color: "black",
                  py: 1,
                }}
              >
                {lastDay - present.length - holiday.length - leave.length}
              </Typography>
              {/* <TrendingDownIcon></TrendingDownIcon> */}
            </Box>
          </Grid>

          <Grid item xs={12} md={3}>
            <Box className={dashBox} sx={{ background: ' rgba(255, 206, 86, .6)' }}>
              <Box className={dashText} sx={{}}>
                <Typography
                  variant="h6"
                  sx={{ color: "black" }}
                >
                  Holiday
                </Typography>
              </Box>
              <Typography
                variant="h3"
                sx={{
                  textAlign: "center",
                  color: "black",
                  py: 1,
                }}
              >
                {holiday.length}
              </Typography>
              {/*  <Box sx={{ height: '300px', width: '300px', margin: '30px', background: 'white', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                <Typography variant="h6" sx={{ color: 'rgba(255, 159, 64, 1)', margin: '0 auto' }}>
                                    Attendance
                                </Typography>

                                <PieChartsChartJs holiday={holiday} leave={leave} attendance={attendance} dateString={dateString}></PieChartsChartJs>
                            </Box>*/}
            </Box>
          </Grid>
        </Grid>
      </Box>

      {/* charts */}

      <Box sx={{}}>
        <Grid container spacing={3}>
          {/* <Box sx={{ height: '300px', width: '50%', margin: '20px', background: 'white' }}>
                    <BarChartJs></BarChartJs>
                </Box> */}
          {/* <Box sx={{ height: '300px', width: '50%', margin: '20px', background: 'white' }}>
                    <DoughnutChartJs attendance={attendance} dateString={dateString}></DoughnutChartJs>
                </Box> */}
          <Grid item xs={12} md={4}>
            <Box sx={{ height: '300px', width: '350px', margin: '30px 0', background: 'white', display: 'flex', flexDirection: 'column', justifyContent: 'center', border: '.5px solid #b6b7b7' }}>
              <Typography variant="h6" sx={{ color: 'rgba(255, 159, 64, 1)', margin: '0 auto' }}>
                Leave
              </Typography>

              <PieChartsChartJs casualLeave={casualLeave} sickLeave={sickLeave} ></PieChartsChartJs>
            </Box>
          </Grid>
          <Grid item xs={12} md={8}>

            <Box sx={{ height: '300px', width: '100%', margin: '30px 0', marginLeft: '10px', background: 'white', border: '1px solid #b6b7b7' }}>
              <LineChartsChartJs thisMonthTask={thisMonthTask}></LineChartsChartJs>
            </Box>
          </Grid>
        </Grid>
      </Box>

      {/* ASSIGN Task */}
      <Box sx={{}}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <List dense sx={{ height: '350px', width: '100%', margin: '30px 0', border: '.5px solid #b6b7b7', bgcolor: 'background.paper' }}>
              <Box sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}>
                <Typography variant="h6" sx={{ color: 'rgba(75, 192, 192, .8)', margin: '20px ' }}>
                  Assign Task
                </Typography>
                <TaskIcon sx={{ color: 'rgba(75, 192, 192, .8)', margin: '20px ', fontSize: '40px' }}></TaskIcon>
              </Box>

              {toDo[0]?.tags ? <>{toDo[0]?.tags?.map((value) => {
                const labelId = `checkbox-list-secondary-label-${value}`;
                return (
                  <ListItem
                    key={value}
                    secondaryAction={
                      <Checkbox
                        edge="end"
                        onChange={handleToggle(value)}
                        checked={toDo[0]?.taskDone.indexOf(value) !== -1}
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
                : <Box sx={{ height: '100%', width: '100%' }}>
                  <Typography variant="h5">

                    No Task Assign Yet
                  </Typography>
                  <Box sx={{ height: '80%', width: '100%', display: 'flex', justifyContent: 'center' }}>
                    <img src={fun} height='220px' width='220px' alt="" />
                  </Box>

                </Box>}
            </List>
          </Grid>
          {/* task summary */}
          <Grid item xs={12} md={4}>

            <Card sx={{ height: '350px', width: '100%', margin: '30px', background: 'white', display: 'flex', flexDirection: 'column', justifyContent: 'center', border: '.5px solid #b6b7b7' }}>
              <Typography variant="h6" sx={{ color: 'rgba(75, 192, 192, .8)', margin: '10px ', textAlign: 'center' }}>
                Leave Dates
              </Typography>
              <Box sx={{
                display: "flex",
                width: '100%',
                justifyContent: "center",
              }}>
                <LeaveCalender sx={{ width: '100%', boxShadow: '0', margin: '0 auto' }} leave={leave} /></Box>
              {/* <CardContent>
                <Box sx={{
                  display: "flex",

                  justifyContent: "space-between",
                }}>
                  <Typography variant="h6" sx={{
                    color: 'rgba(75, 192, 192, .8) '
                  }}>
                    Task Summary
                  </Typography>
                  <GroupsIcon sx={{ color: 'rgba(75, 192, 192, .8) ', fontSize: '40px' }}></GroupsIcon>
                </Box>
                <Typography variant="h5" component="div">
                  Task Assign
                </Typography>
                {totalTask?.length}
                <Typography variant="body2">

                </Typography>
                <Typography variant="h5" component="div">
                  Task Done
                </Typography>
                {doneTask?.length}
                <Typography variant="body2">

                </Typography>
              </CardContent> */}

            </Card>

          </Grid>



          {/* meeting card */}
          <Grid item xs={12} md={4}>



            <Card sx={{ height: '350px', width: '100%', margin: '30px', background: 'white', display: 'flex', flexDirection: 'column', justifyContent: 'center', border: '.5px solid #b6b7b7' }}>
              <CardContent sx={{ height: '100%' }}>
                <Box sx={{
                  display: "flex",

                  justifyContent: "space-between",
                }}>
                  <Typography variant="h6" sx={{
                    color: 'rgba(75, 192, 192, .8) ', margin: '10px '
                  }}>
                    Meeting
                  </Typography>
                  <GroupsIcon sx={{ color: 'rgba(75, 192, 192, .8) ', margin: '20px ', fontSize: '40px' }}></GroupsIcon>
                </Box>
                {toDo[0]?.startTime ? <> <Typography variant="h5" component="div">
                  Meeting Today
                </Typography>

                  <Typography variant="body2">

                    {toDo[0]?.startTime}AM
                  </Typography>

                </> :
                  <Box sx={{ height: '100%', width: '100%' }}>
                    <Typography variant="h5">

                      No Meeting Schedule Yet
                    </Typography>
                    <Box sx={{ height: '80%', width: '100%', display: 'flex', justifyContent: 'center' }}>
                      <img src={fun} height='220px' width='220px' alt="" />
                    </Box>

                  </Box>}
              </CardContent>


            </Card>



          </Grid>
        </Grid>
      </Box>
      {/* meeting time  */}

      {/* 
            <Box sx={{ height: '300px', width: '80%', display: 'flex', margin: '40px' }}>
                <Box sx={{ height: '300px', width: '80%', background: 'white' }}>
                    <PieCharts />
                    <Typography variant="p"> Contribuation by department </Typography>
                </Box>


                <Box sx={{ height: '300px', width: '80%', background: 'white' }}>
                    <LineCharts />
                    <Typography variant="p"> Performance Improvement </Typography>
                </Box>

            </Box> */}
    </Container>
  );
};

export default EmployeeDashboardHome;
