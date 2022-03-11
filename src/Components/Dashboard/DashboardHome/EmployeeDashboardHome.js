import { Container } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TrendingDownIcon from '@material-ui/icons/TrendingDown';
import TodayIcon from '@material-ui/icons/Today';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import { makeStyles } from '@mui/styles';
import PieCharts from '../Charts/PieCharts';
import LineCharts from '../Charts/LineCharts';
import BarChartJs from '../Charts/BarChartJs';
import DoughnutChartJs from '../Charts/DoughnutChartJs';
import LineChartsChartJs from '../Charts/LineChartsChartJs';
import PieChartsChartJs from '../Charts/PieChartsChartJs';
import useAuth from '../../../hooks/useAuth';
import dateFormat from '../../Share/DateFormat/dateFormat';
const EmployeeDashboardHome = () => {
    const { user } = useAuth();
    console.log(user)
    const [attendance, setAttendance] = useState([]);
    // fetch attendence

    const currentDate = dateFormat(new Date().toLocaleString().split(",")[0], 'yyyy-MM-dd');
    const dateString = currentDate.split('-')[1];
    console.log(dateString, currentDate)
    useEffect(() => {
        fetch(`https://ancient-thicket-61342.herokuapp.com/attendance/${user?.email}`)
            .then(res => res.json())
            .then(data => {

                const filteredData = data?.result?.filter(x => x?.date?.split('-')[1] === dateString)
                console.log(data.result, filteredData)
                setAttendance(filteredData)
            })
    }, [])



    const useStyle = makeStyles({
        dashTopBox: {
            // border: '1px solid #00D2FC',
            borderRadius: '10px',
            overflow: 'hidden',
            width: '100%',
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
    return (
        <Container sx={{ background: '#F7F9FE' }}>

            <Box sx={{ mt: 3 }}>
                <Grid container spacing={3}>
                    <Grid item xs={6} md={3}>
                        <Box className={dashTopBox}>
                            <Box className={dashTopText}>

                                <Typography variant="h5" sx={{ color: 'rgba(75, 192, 192, 1)' }}>
                                    Total Working Day
                                </Typography>
                                <TodayIcon></TodayIcon>
                                <Typography variant="h4" sx={{ textAlign: 'center', color: 'rgba(75, 192, 192, 1)', py: 1 }}>
                                    {attendance.length}
                                </Typography>
                            </Box>
                        </Box>
                    </Grid>

                    <Grid item xs={6} md={3}>
                        <Box className={dashTopBox} sx={{}}>
                            <Box className={dashTopText} sx={{}}>
                                <Typography data-testid="typography" variant="h5" sx={{ color: 'rgba(255, 206, 86, 1)' }}>
                                    Present
                                </Typography>


                                <Typography variant="h4" sx={{ textAlign: 'center', color: 'rgba(255, 206, 86, 1)', py: 1 }}>
                                    {attendance.length}
                                </Typography>
                                <TrendingUpIcon></TrendingUpIcon>
                            </Box>
                        </Box>
                    </Grid>

                    <Grid item xs={6} md={3}>
                        <Box className={dashTopBox} sx={{}}>
                            <Box className={dashTopText} sx={{}}>
                                <Typography variant="h6" sx={{ color: 'rgba(255, 99, 132, .8)' }}>
                                    Absent
                                </Typography>


                                <Typography variant="h6" sx={{ textAlign: 'center', color: 'rgba(255, 99, 132, .8)', py: 1 }}>
                                    0
                                </Typography>
                                <TrendingDownIcon></TrendingDownIcon>
                            </Box>
                        </Box>
                    </Grid>

                    <Grid item xs={6} md={3}>
                        <Box className={dashTopBox} sx={{}}>
                            <Box className={dashTopText} sx={{}}>
                                <Typography variant="h6" sx={{ color: 'rgba(255, 159, 64, 1)' }}>
                                    Remaining Leave
                                </Typography>


                                <Typography variant="h6" sx={{ textAlign: 'center', color: 'rgba(255, 159, 64, 1)', py: 1 }}>
                                    0
                                </Typography>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Box>



            {/* charts */}

            <Box sx={{ height: '300px', width: '100%', display: 'flex', marginTop: '40px', }}>
                <Box sx={{ height: '300px', width: '50%', margin: '20px', background: 'white' }}>
                    <BarChartJs></BarChartJs>
                </Box>
                <Box sx={{ height: '300px', width: '50%', margin: '20px', background: 'white' }}>
                    <DoughnutChartJs attendance={attendance} dateString={dateString}></DoughnutChartJs>
                </Box>
            </Box>

            <Box sx={{ height: '300px', width: '100%', display: 'flex', marginTop: '40px' }}>
                <Box sx={{ height: '300px', width: '50%', margin: '30px', background: 'white' }}>
                    <LineChartsChartJs></LineChartsChartJs>
                </Box>
                <Box sx={{ height: '300px', width: '50%', margin: '30px', background: 'white' }}>
                    <PieChartsChartJs></PieChartsChartJs>
                </Box>
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