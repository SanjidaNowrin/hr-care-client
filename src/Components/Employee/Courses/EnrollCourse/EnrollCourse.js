import {
  Box,
  Breadcrumbs,
  Button,
  Container,
  Divider,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import useAuth from "../../../../hooks/useAuth";
import axios from "axios";
import Swal from "sweetalert2";

// Breadcrumbs
import Chip from "@mui/material/Chip";
import { emphasize, styled } from "@mui/material/styles";
import HomeIcon from "@mui/icons-material/Home";
import { Link, useParams } from "react-router-dom";

const EnrollCourse = () => {
  const { user } = useAuth();
  const { id } = useParams();
  const [courses, setCourses] = useState([]);
  const [enroll, setEnroll] = useState([]);
  useEffect(() => {
    fetch("https://hr-care.onrender.com/courses")
      .then((res) => res.json())
      .then((data) => setCourses(data?.data));
  }, [courses]);

  useEffect(() => {
    const filterData = courses.filter((data) => data._id === id);
    setEnroll(filterData);
  }, [id, courses]);

  const handleEnroll = (data) => {
    const email = user.email;
    const courseId = data._id;
    const courseName = data.name;
    const author = data.author;
    const authorImg = data.authorImg;
    const courseImg = data.courseImg;
    const newData = {
      email,
      courseId,
      courseName,
      author,
      authorImg,
      courseImg,
    };

    axios.post("https://hr-care.onrender.com/enrolls", newData);
    Swal.fire({
      position: "middle",
      icon: "success",
      title: "Successfully Enroll",
      showConfirmButton: false,
      timer: 2000,
    });
  };

  const [enrolls, setEnrolls] = useState([]);
  const [userId, setUserId] = useState("");
  const [filterData, setFilterData] = useState([]);
  useEffect(() => {
    fetch("https://hr-care.onrender.com/enrolls")
      .then((res) => res.json())
      .then((data) => setEnrolls(data.data));
  }, [enrolls]);
  useEffect(() => {
    const filterUser = enrolls.filter((data) => data.email === user.email);
    setFilterData(filterUser);
    filterData.map((item) => setUserId(item.courseId));
  }, [id, filterData, userId]);

  // Breadcrumbs
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
  return (
    <Container>
      {/* Breadcrumbs */}
      <Box sx={{ mb: 4 }}>
        <Typography sx={{ mt: 2, color: "var(--p_color)" }} variant="h4">
          Enroll Course
        </Typography>
        <Breadcrumbs aria-label="breadcrumb">
          <Link to="/dashboard">
            <StyledBreadcrumb
              to="/dashboard"
              label="Dashboard"
              icon={<HomeIcon fontSize="small" />}
            />
          </Link>
          <Link to="/dashboard/course">
            <StyledBreadcrumb component="a" href="#" label="Courses" />
          </Link>
          <Link to="/dashboard/course">
            <StyledBreadcrumb component="a" href="#" label="Enroll" />
          </Link>
        </Breadcrumbs>
      </Box>

      <>
        {enroll.map((item) => (
          <Box key={item._id} sx={{ mb: 4 }}>
            <Typography variant="h5">{item.topic}</Typography>
            <Typography
              variant="h3"
              sx={{
                width: { md: "65%" },
                color: "var(--p_color)",
                fontWeight: "700",
                mb: 2,
              }}
            >
              {item.name}
            </Typography>
            <Divider />
            <Typography sx={{ my: 1 }} variant="body1">
              by <span style={{ color: "#845EC2" }}>{item.author}</span> -{" "}
              {item.date}
            </Typography>
            <Divider />
            <Box
              sx={{
                display: { md: "flex" },
                alignItems: "center",
                justifyContent: "space-between",
                my: 4,
              }}
            >
              <Typography
                sx={{ width: { md: "60%" }, mb: { sm: 2, xs: 2 } }}
                variant="body1"
              >
                {item.des}
              </Typography>
              <img src={item.courseImg} alt="" />
            </Box>
            {id !== userId ? (
              <Button
                onClick={() => handleEnroll(item)}
                className="btn_regular"
              >
                Start Course
              </Button>
            ) : (
              <Button className="btn_regular">Already Enroll</Button>
            )}
          </Box>
        ))}
      </>
    </Container>
  );
};

export default EnrollCourse;
