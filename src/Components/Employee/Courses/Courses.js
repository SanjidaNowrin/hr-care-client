import { Box, Breadcrumbs, Container, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Course from "./Course/Course";

// Breadcrumbs
import Chip from '@mui/material/Chip';
import { emphasize, styled } from '@mui/material/styles';
import HomeIcon from '@mui/icons-material/Home';
import { Link } from "react-router-dom";

const Courses = () => {
    const [courses, setCourses] = useState([]);
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
            <Box sx={{ mb: 5 }}>
                <Grid container spacing={4}>
                    {courses?.map((item) => (
                        <Course key={item._id} item={item}></Course>
                    ))}
                </Grid>
            </Box>
        </Container>
    );
};

export default Courses;
