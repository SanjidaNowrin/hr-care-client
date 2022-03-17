import { Container } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TrendingDownIcon from '@material-ui/icons/TrendingDown';
import TodayIcon from '@material-ui/icons/Today';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import { makeStyles } from '@mui/styles';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import HomeIcon from '@mui/icons-material/Home';
import { Link } from 'react-router-dom';
import { emphasize, styled } from '@mui/material/styles';
import Chip from '@mui/material/Chip';
import PieCharts from '../Charts/PieCharts';
import LineCharts from '../Charts/LineCharts';
import BarChartJs from '../Charts/BarChartJs';
import DoughnutChartJs from '../Charts/DoughnutChartJs';
import LineChartsChartJs from '../Charts/LineChartsChartJs';
import PieChartsChartJs from '../Charts/PieChartsChartJs';
import dateFormat from '../../Share/DateFormat/dateFormat';
import useAuth from '../../../hooks/useAuth';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Checkbox from '@mui/material/Checkbox';
import Avatar from '@mui/material/Avatar';

const EmployeeDashboardHome = () => {
  const { user } = useAuth();
  console.log(user)
  const [attendance, setAttendance] = useState([]);
  const [holiday, setHoliday] = useState([]);
  const [leave, setLeave] = useState([]);

  const [toDo, setToDo] = useState([]);
  const [checked, setChecked] = React.useState([]);
  const [thisMonthTask, setThisMonthTask] = React.useState([]);

  const [taskUpdate, setTaskUpdate] = useState(false);
  console.log(taskUpdate, thisMonthTask)
  console.log(checked)
  // fetch attendence

  const currentDate = dateFormat(new Date().toLocaleString().split(",")[0], 'yyyy-MM-dd');
  const dateString = currentDate.split('-')[1];
  console.log(dateString, currentDate, holiday, attendance)
  useEffect(() => {
    fetch(`https://ancient-thicket-61342.herokuapp.com/attendance/${user.email}`)
      .then(res => res.json())
      .then(data => {

        const filteredData = data?.result?.filter(x => x?.date?.split('-')[1] === dateString)

        const filteredHoliday = data?.result?.filter(y => y.status === 'Holiday');
        const filteredLeave = data?.result?.filter(y => y.status === 'Leave');
        setLeave(filteredLeave)
        setAttendance(filteredData)
        setHoliday(filteredHoliday)
        console.log(data.result, filteredData, filteredHoliday)
      })
  }, [dateString, user?.email]);

  //assign task 
  useEffect(() => {
    fetch("https://ancient-thicket-61342.herokuapp.com/taskAssign")
      .then((res) => res.json())
      .then((data) => {
        const filterThisMonthTask = data?.data?.filter(task => (task.email === user.email && task.date.split('-')[1] === dateString));
        const filterTask = data?.data?.filter(task => (task.email === user.email && task.date === currentDate))
        console.log(filterTask)
        setToDo(filterTask)
        setChecked(filterTask[0]?.taskDone)
        setThisMonthTask(filterThisMonthTask)
        console.log(filterThisMonthTask)
      });
  }, [taskUpdate, user.email, currentDate, checked, dateString]);

  const StyledBreadcrumb = styled(Chip)(({ theme }) => {
    const backgroundColor =
      theme.palette.mode === 'light'
        ? theme.palette.grey[100]
        : theme.palette.grey[800];
    return {
      backgroundColor,
      height: theme.spacing(3),
      color: theme.palette.text.primary,
      fontWeight: theme.typography.fontWeightRegular,
      '&:hover, &:focus': {
        backgroundColor: emphasize(backgroundColor, 0.06),
      },
      '&:active': {
        boxShadow: theme.shadows[1],
        backgroundColor: emphasize(backgroundColor, 0.12),
      },
    };
  });

  const useStyle = makeStyles({
    dashTopBox: {
      // border: '1px solid #00D2FC',
      borderRadius: '10px',
      overflow: 'hidden',
      width: '100%',
      height: '120px',
      background: 'white'
      // boxShadow: '1px 10px 10px #b6b7b7'
    },
    dashTopText: {
      padding: '13px 10px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      background: '',
    }
  })

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
    console.log(newChecked)
    setChecked(newChecked);
    fetch(`https://ancient-thicket-61342.herokuapp.com/taskAssign`, {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        email: user.email,
        date: currentDate,
        task: newChecked
      })

    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result)
        setTaskUpdate(!taskUpdate)
      })
  };
  return (
    <Container sx={{ background: '#F7F9FE' }}>
      <Typography sx={{ mt: 2, color: 'var(--p_color)' }} variant="h4">
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

                <Typography variant="h6" sx={{ color: 'rgba(75, 192, 192, 1)', textAlign: 'center' }}>
                  Total Working Day
                </Typography>
                <br />

              </Box>
              {/* <TodayIcon></TodayIcon> */}
              <Typography variant="h3" sx={{ textAlign: 'center', color: 'rgba(75, 192, 192, 1)', py: 1 }}>
                {attendance.length}
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={6} md={3}>
            <Box className={dashTopBox} sx={{}}>
              <Box className={dashTopText} sx={{}}>
                <Typography variant="h6" sx={{ color: 'rgba(255, 206, 86, 1)' }}>
                  Present
                </Typography>



              </Box>
              <Typography variant="h3" sx={{ textAlign: 'center', color: 'rgba(255, 206, 86, 1)', py: 1 }}>
                {attendance.length - holiday.length - leave.length}
              </Typography>
              {/* <TrendingUpIcon></TrendingUpIcon> */}
            </Box>
          </Grid>

          <Grid item xs={6} md={3}>
            <Box className={dashTopBox} sx={{}}>
              <Box className={dashTopText} sx={{}}>
                <Typography variant="h6" sx={{ color: 'rgba(255, 99, 132, .8)' }}>
                  Absent
                </Typography>



              </Box>
              <Typography variant="h3" sx={{ textAlign: 'center', color: 'rgba(255, 99, 132, .8)', py: 1 }}>
                0
              </Typography>
              {/* <TrendingDownIcon></TrendingDownIcon> */}
            </Box>
          </Grid>

          <Grid item xs={6} md={3}>
            <Box className={dashTopBox} sx={{}}>
              <Box className={dashTopText} sx={{}}>
                <Typography variant="h6" sx={{ color: 'rgba(255, 159, 64, 1)' }}>
                  Holiday
                </Typography>



              </Box>
              <Typography variant="h3" sx={{ textAlign: 'center', color: 'rgba(255, 159, 64, 1)', py: 1 }}>
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

      <Box sx={{ height: '300px', width: '100%', display: 'flex', marginTop: '40px', }}>
        {/* <Box sx={{ height: '300px', width: '50%', margin: '20px', background: 'white' }}>
                    <BarChartJs></BarChartJs>
                </Box> */}
        {/* <Box sx={{ height: '300px', width: '50%', margin: '20px', background: 'white' }}>
                    <DoughnutChartJs attendance={attendance} dateString={dateString}></DoughnutChartJs>
                </Box> */}

        <Box sx={{ height: '300px', width: '300px', margin: '30px', background: 'white', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <Typography variant="h6" sx={{ color: 'rgba(255, 159, 64, 1)', margin: '0 auto' }}>
            Attendance
          </Typography>

          <PieChartsChartJs holiday={holiday} leave={leave} attendance={attendance} dateString={dateString}></PieChartsChartJs>
        </Box>
        <Box sx={{ height: '300px', width: '100%', display: 'flex', marginTop: '40px' }}>
          <Box sx={{ height: '300px', width: '100%', margin: '30px', background: 'white' }}>
            <LineChartsChartJs thisMonthTask={thisMonthTask}></LineChartsChartJs>
          </Box>


        </Box>
      </Box>


      {/* ASSIGN Task */}
      <Box sx={{ height: '300px', width: '100%', display: 'flex', marginTop: '40px' }}>
        <List dense sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
          <Typography variant="h6" sx={{ color: 'rgba(255, 159, 64, 1)' }}>
            Assign Task
          </Typography>
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
      </Box>

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