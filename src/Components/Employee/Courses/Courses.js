import { Box, Container, Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Course from './Course/Course';

const Courses = () => {
    const [courses, setCourses] = useState([]);
    useEffect(() => {
        fetch('/courses.json')
            .then(res => res.json())
            .then(data => setCourses(data))
    }, [])
    return (
        <Container>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', my: 5 }}>
                <Typography variant="h4" sx={{ fontWeight: '700', color: '#00D2FC' }}>Our Populer Courses</Typography>
            </Box>
            <Box sx={{ mb: 5 }}>
                <Grid container spacing={4}>
                    {
                        courses.map(item => <Course
                            key={item.id}
                            item={item}
                        ></Course>)
                    }
                </Grid>
            </Box>
        </Container>
    );
};

export default Courses;