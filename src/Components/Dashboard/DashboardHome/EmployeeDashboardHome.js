import { Container } from "@mui/material";
import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TrendingDownIcon from "@material-ui/icons/TrendingDown";
import TodayIcon from "@material-ui/icons/Today";
import TrendingUpIcon from "@material-ui/icons/TrendingUp";
import TaskIcon from '@mui/icons-material/Task';
import GroupsIcon from '@mui/icons-material/Groups';
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

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Checkbox from "@mui/material/Checkbox";
import Avatar from "@mui/material/Avatar";


import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';


const EmployeeDashboardHome = () => {
  const { user } = useAuth();
  const [attendance, setAttendance] = useState([]);
  const [holiday, setHoliday] = useState([]);
  const [leave, setLeave] = useState([]);

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
        setLeave(filteredLeave);
        setAttendance(filteredData);
        setHoliday(filteredHoliday);
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
      border: '.5px solid #b6b7b7',
      borderRadius: "10px",
      overflow: "hidden",
      width: "100%",
      height: "120px",
      background: "white",
      // boxShadow: '1px 10px 10px #b6b7b7'
    },
    dashTopText: {
      padding: "13px 10px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "",
    },
  });

  const { dashTopText, dashTopBox } = useStyle();

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
            <Box sx={{ background: "rgba(75, 192, 192, .8)" }} className={dashTopBox}>
              <Box className={dashTopText}>
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
                {attendance.length}
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12} md={3}>
            <Box className={dashTopBox} sx={{ background: 'rgba(255, 206, 86, .8)' }}>
              <Box className={dashTopText} sx={{}}>
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
                {attendance.length - holiday.length - leave.length}
              </Typography>
              {/* <TrendingUpIcon></TrendingUpIcon> */}
            </Box>
          </Grid>

          <Grid item xs={12} md={3}>
            <Box className={dashTopBox} sx={{ background: 'rgba(255, 99, 132, .8)' }}>
              <Box className={dashTopText} sx={{}}>
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
                0
              </Typography>
              {/* <TrendingDownIcon></TrendingDownIcon> */}
            </Box>
          </Grid>

          <Grid item xs={12} md={3}>
            <Box className={dashTopBox} sx={{ background: 'rgba(54, 162, 235, .8)' }}>
              <Box className={dashTopText} sx={{}}>
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
            </Box>
          </Grid>
        </Grid>
      </Box>

      {/* charts */}

      <Box
        sx={{


        }}
      >
        <Grid container spacing={3}>
          <Grid item xs={12} md={3}>
            <Box sx={{ height: '300px', width: '300px', margin: '30px', background: 'white', display: 'flex', flexDirection: 'column', justifyContent: 'center', border: '.5px solid #b6b7b7' }}>
              <Typography variant="h6" sx={{ color: 'rgba(255, 159, 64, 1)', margin: '0 auto' }}>
                Attendance
              </Typography>

              <PieChartsChartJs holiday={holiday} leave={leave} attendance={attendance} dateString={dateString}></PieChartsChartJs>
            </Box>
          </Grid>
          <Grid item xs={12} md={9}>

            <Box sx={{ height: '300px', width: '90%', margin: '30px', background: 'white', border: '1px solid #b6b7b7' }}>
              <LineChartsChartJs thisMonthTask={thisMonthTask}></LineChartsChartJs>
            </Box>



          </Grid>
        </Grid>
      </Box>


      {/* ASSIGN Task */}
      <Box sx={{}}>
        <Grid container spacing={5}>
          <Grid item xs={12} md={6}>
            <List dense sx={{ height: '300px', width: '80%', margin: '30px', border: '.5px solid #b6b7b7', bgcolor: 'background.paper' }}>
              <Box sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}>
                <Typography variant="h6" sx={{ color: 'rgba(75, 192, 192, .8)', margin: '20px ' }}>
                  Assign Task
                </Typography>
                <TaskIcon sx={{ color: 'rgba(75, 192, 192, .8)', margin: '20px ' }}></TaskIcon>
              </Box>

              {toDo[0]?.tags?.map((value) => {
                const labelId = `checkbox-list-secondary-label-${value}`;
                return (
                  <ListItem
                    key={value}
                    secondaryAction={
                      <Checkbox
                        edge="end"
                        onChange={handleToggle(value)}
                        checked={toDo[0]?.taskDone.indexOf(value) !== -1}
                        inputProps={{ 'aria-labelledby': labelId }}
                      />
                    }
                    disablePadding
                  >
                    <ListItemButton>

                      <ListItemText id={value._id} primary={value} />
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>
          </Grid>
          <Grid item xs={12} md={6}>

            <Box sx={{ height: '300px', width: '80%', margin: '30px', background: 'white', display: 'flex', flexDirection: 'column', justifyContent: 'center', border: '.5px solid #b6b7b7' }}>
              <Box sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}>
                <Typography variant="h6" sx={{
                  color: 'rgba(75, 192, 192, .8) ', margin: '20px '
                }}>
                  Meeting
                </Typography>
                <GroupsIcon sx={{ color: 'rgba(75, 192, 192, .8) ', margin: '20px ' }}></GroupsIcon>
              </Box>
              <Card sx={{}}>
                <CardContent>

                  <Typography variant="h5" component="div">
                    Meeting Today
                  </Typography>

                  <Typography variant="body2">

                    {toDo[0]?.endTime}PM
                  </Typography>
                </CardContent>

              </Card>

              <Card sx={{}}>
                <CardContent>

                  <Typography variant="h5" component="div">
                    Meeting Tomorrow
                  </Typography>

                  <Typography variant="body2">
                    {toDo[0]?.startTime}AM

                  </Typography>
                </CardContent>

              </Card>
            </Box>
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
    </Container >
  );
};

export default EmployeeDashboardHome;
