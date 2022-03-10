import { Box, Breadcrumbs, Container, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Course from "./Course/Course";
import Divider from '@mui/material/Divider';
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";

// Breadcrumbs
import Chip from '@mui/material/Chip';
import { emphasize, styled } from '@mui/material/styles';
import HomeIcon from '@mui/icons-material/Home';
import { Link } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";

const Courses = () => {
    const [courses, setCourses] = useState([]);
    const { user } = useAuth();
    useEffect(() => {
        fetch("https://ancient-thicket-61342.herokuapp.com/courses")
            .then((res) => res.json())
            .then((data) => setCourses(data?.data));
    }, [courses]);

    // Breadcrumbs
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

    const [enrolls, setEnrolls] = useState([]);
    const [enrollEmail, setEnrollEmail] = useState('');
    const [filterData, setFilterData] = useState([]);
    useEffect(() => {
        fetch('https://ancient-thicket-61342.herokuapp.com/enrolls')
            .then(res => res.json())
            .then(data => setEnrolls(data.data))
    }, [])
    useEffect(() => {
        const filterUser = enrolls.filter(data => data.email === user.email);
        setFilterData(filterUser)
        filterData.map(item => setEnrollEmail(item.email));
    }, [enrolls, user.email])
    // console.log(filterData)

    return (
        <Container>
            {/* Breadcrumbs */}
            <Box sx={{ mb: 4 }}>
                <Typography
                    sx={{ mt: 2, color: 'var(--p_color)' }} variant="h4">
                    Skill Improvement Courses
                </Typography>
                <Breadcrumbs aria-label="breadcrumb">
                    <Link to="/dashboard">
                        <StyledBreadcrumb
                            to="/dashboard"
                            label="Dashboard"
                            icon={<HomeIcon fontSize="small" />}
                        />
                    </Link>
                    <Link to="/dashboard/course"><StyledBreadcrumb component="a" href="#" label="Courses" /></Link>
                </Breadcrumbs>
            </Box>

            {
                filterData.length > 0 ? <>
                    <Box sx={{ py: 2, }}>
                        <Typography className="section_title" variant="h4">
                            My Course
                        </Typography>
                    </Box>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={8}>
                            {
                                filterData.map(item =>
                                    <Box sx={{ display: { md: 'flex' } }} key={item._id}>
                                        <img src={item.courseImg} alt="" />
                                        <Box sx={{ display: 'flex', flexDirection: 'column', px: 1, py: 3, justifyContent: 'space-between' }}>
                                            <Typography sx={{ width: { xs: '250px' } }} component="div" variant="h5">
                                                {item.courseName}
                                            </Typography>
                                            <Box sx={{ display: 'flex', alignItems: 'center', mt: { xs: '1' } }}>
                                                <Avatar alt="Remy Sharp" src={item.authorImg} />
                                                <Typography sx={{ ml: 1 }} component="div" variant="body1">
                                                    {item.author}
                                                </Typography>
                                            </Box>
                                        </Box>
                                    </Box>
                                )
                            }
                        </Grid>
                    </Grid>
                    <Box sx={{ pt: 6, pb: 2, textAlign: 'center' }}>
                        <Typography className="section_title" variant="h4">
                            Other Course
                        </Typography>
                    </Box>
                </> : ""
            }

            <Box sx={{ mb: 5 }}>
                <Grid container spacing={4}>
                    {courses?.map((item) => (
                        <Course key={item._id} item={item} email={enrollEmail}></Course>
                    ))}
                </Grid>
            </Box>
        </Container>
    );
};

export default Courses;
