import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import CoPresentIcon from '@mui/icons-material/CoPresent';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import PersonOffIcon from '@mui/icons-material/PersonOff';
import DirectionsWalkIcon from '@mui/icons-material/DirectionsWalk';
import Typography from '@mui/material/Typography';
//Employee table detail
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { makeStyles } from '@mui/styles';
import { Container } from '@mui/material';
import { emphasize, styled } from '@mui/material/styles';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Chip from '@mui/material/Chip';
import HomeIcon from '@mui/icons-material/Home';
import { Link } from 'react-router-dom';
import TodayAttendance from './TodayAttendance/TodayAttendance';
import CalenderChart from './HolidayCalender/CalenderChart';


const DashboardHome = () => {
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        fetch('https://ancient-thicket-61342.herokuapp.com/employees')
            .then(res => res.json())
            .then(data => setEmployees(data.data))
    }, [])

    const [attendance, setAttendance] = useState([]);
    const [todayPresent, setTodayPresent] = useState([]);
    const [leave, setLeave] = useState([]);

    let time = new Date().toLocaleString();
    const todaydate = time.split(",")[0];


    useEffect(() => {
        fetch('https://ancient-thicket-61342.herokuapp.com/attendance')
            .then(res => res.json())
            .then(data => setAttendance(data.data))
    }, [])

    // todayPresent
    useEffect(() => {
        const filterData = attendance.filter(item => item.date === todaydate);
        setTodayPresent(filterData)
    }, [todaydate, attendance])

    // on leave
    useEffect(() => {
        const filterData = todayPresent.filter(item => item.leave !== "");
        setLeave(filterData)
    }, [todayPresent])

    const totalEmployee = employees.length;
    const present = todayPresent.length;
    const absent = totalEmployee - present | 0;

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
            border: '1px solid #00D2FC',
            borderRadius: '10px',
            overflow: 'hidden',
            width: '100%',
            boxShadow: '1px 10px 30px #b6b7b7'
        },
        dashTopText: {
            padding: '13px 10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: '#00D2FC',
        }
    })

    const { dashTopText, dashTopBox } = useStyle();

    const date = new Date();
    const takeDate = date.toString().slice(0, 16);
    return (
        <Container>
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
                                <Typography variant="h6" sx={{ color: '#fff' }}>
                                    Total Employee
                                </Typography>
                                <PeopleAltIcon style={{ fontSize: '3rem', color: '#fff' }}></PeopleAltIcon>
                            </Box>

                            <Typography variant="h3" sx={{ textAlign: 'center', color: '#00D2FC', py: 1 }}>
                                0{employees.length}
                            </Typography>
                        </Box>
                    </Grid>

                    <Grid item xs={6} md={3}>
                        <Box className={dashTopBox} sx={{ border: '1px solid #845EC2 !important' }}>
                            <Box className={dashTopText} sx={{ background: '#845EC2 !important' }}>
                                <Typography variant="h6" sx={{ color: '#fff' }}>
                                    Present Today
                                </Typography>
                                <CoPresentIcon style={{ fontSize: '3rem', color: '#fff' }}></CoPresentIcon>
                            </Box>
                            <Typography variant="h3" sx={{ textAlign: 'center', color: '#845EC2', py: 1 }}>
                                0{present}
                            </Typography>
                        </Box>
                    </Grid>

                    <Grid item xs={6} md={3}>
                        <Box className={dashTopBox} sx={{ border: '1px solid #fb3e6a !important' }}>
                            <Box className={dashTopText} sx={{ background: '#fb3e6a !important' }}>
                                <Typography variant="h6" sx={{ color: '#fff' }}>
                                    Total Absent
                                </Typography>
                                <PersonOffIcon style={{ fontSize: '3rem', color: '#fff' }}></PersonOffIcon>
                            </Box>
                            <Typography variant="h3" sx={{ textAlign: 'center', color: '#fb3e6a', py: 1 }}>
                                0{absent}
                            </Typography>
                        </Box>
                    </Grid>

                    <Grid item xs={6} md={3}>
                        <Box className={dashTopBox} sx={{ border: '1px solid #18025B !important' }}>
                            <Box className={dashTopText} sx={{ background: '#18025B !important' }}>
                                <Typography variant="h6" sx={{ color: '#fff' }}>
                                    On Leave
                                </Typography>
                                <DirectionsWalkIcon style={{ fontSize: '3rem', color: '#fff' }}></DirectionsWalkIcon>
                            </Box>
                            <Typography variant="h3" sx={{ textAlign: 'center', color: '#18025B', py: 1 }}>
                                0{leave.length}
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>
            </Box>

            {/* Total attendance chart area */}
            <Box sx={{ my: 5 }}>
                <Box sx={{ background: 'var(--s_color)', py: 2, px: 2, display: 'flex', justifyContent: 'space-between' }}>
                    <Typography sx={{ color: '#fff' }} variant="h5">Today Attendance</Typography>
                    <Typography sx={{ color: '#fff' }} variant="h5">{takeDate}</Typography>
                </Box>
                {/* Table on employee details */}
                <Grid container spacing={0}>
                    <Grid item xs={12} md={12}>
                        <TableContainer sx={{ overflowX: 'scroll' }} component={Paper}>
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
                                    {todayPresent.map((item) => <TodayAttendance
                                        key={item._id}
                                        item={item}
                                    ></TodayAttendance>)}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                </Grid>
            </Box>
         {/* <CalenderChart/> */}
        </Container>
    );
};

export default DashboardHome;