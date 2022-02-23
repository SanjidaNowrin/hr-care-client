import { Box, Container, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Course from "./Course/Course";

const Courses = () => {
  const [courses, setCourses] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/courses")
      .then((res) => res.json())
      .then((data) => setCourses(data.data));
  }, []);

  return (
    <Container>
        <Typography
          style={{ textAlign: "center", fontWeight: "500" ,marginTop:"1.5rem",marginBottom:"2rem"}}
          variant="h4"
        >
          Our Popular <span style={{ color: " #01578A" }}>Courses</span>
        </Typography>
      <Box sx={{ mb: 5 }}>
        <Grid container spacing={4}>
          {courses?.map((item) => (
            <Course key={item.id} item={item}></Course>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default Courses;
