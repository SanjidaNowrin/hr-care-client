import { Box, Breadcrumbs, Button, Container, TextField, Typography } from "@mui/material";
import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

// Breadcrumbs
import Chip from '@mui/material/Chip';
import { emphasize, styled } from '@mui/material/styles';
import HomeIcon from '@mui/icons-material/Home';
import { Link } from "react-router-dom";

const AddCourse = () => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    axios.post("https://ancient-thicket-61342.herokuapp.com/courses", data);
    reset();
    Swal.fire({
      position: "middle",
      icon: "success",
      title: "Course added successfully",
      showConfirmButton: false,
      timer: 2000,
    });
  };

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
          Add New Courses
        </Typography>
        <Breadcrumbs aria-label="breadcrumb">
          <Link to="/dashboard">
            <StyledBreadcrumb
              to="/dashboard"
              label="Dashboard"
              icon={<HomeIcon fontSize="small" />}
            />
          </Link>
          <Link to="/dashboard/add_course"><StyledBreadcrumb component="a" href="#" label="Add Course" /></Link>
        </Breadcrumbs>
      </Box>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Box sx={{ mb: 2 }}>
          <label style={{ display: "block" }} htmlFor="title">
            Course Title <span style={{ color: "red" }}>*</span>
          </label>
          <TextField
            sx={{ width: "100%" }}
            placeholder="Enter your course title"
            variant="outlined"
            id="title"
            type="text"
            {...register("name", { required: true })}
          />
        </Box>

        <Box sx={{ mb: 2 }}>
          <label style={{ display: "block" }} htmlFor="des">
            Description <span style={{ color: "red" }}>*</span>
          </label>
          <TextField
            sx={{ width: "100%" }}
            placeholder="Write Description"
            variant="outlined"
            rows={4}
            multiline
            id="des"
            type="text"
            {...register("des", { required: true })}
          />
        </Box>

        <Box sx={{ mb: 2 }}>
          <label style={{ display: "block" }} htmlFor="cImg">
            Course Image Link <span style={{ color: "red" }}>*</span>
          </label>
          <TextField
            sx={{ width: "100%" }}
            placeholder="Course Related Image Link"
            variant="outlined"
            id="cImg"
            type="text"
            {...register("courseImg", { required: true })}
          />
        </Box>

        <Box
          sx={{ mb: 2, display: "flex", alignItems: "center", width: "100%" }}
        >
          <Box sx={{ width: "100%", mr: 1 }}>
            <label style={{ display: "block" }} htmlFor="topic">
              Topic <span style={{ color: "red" }}>*</span>
            </label>
            <TextField
              sx={{ width: "100%" }}
              placeholder="Course Topic"
              variant="outlined"
              id="topic"
              type="text"
              {...register("topic", { required: true })}
            />
          </Box>
        </Box>

        <Box
          sx={{ mb: 2, display: "flex", alignItems: "center", width: "100%" }}
        >
          <Box sx={{ width: "100%", mr: 1 }}>
            <label style={{ display: "block" }} htmlFor="aName">
              Author Name <span style={{ color: "red" }}>*</span>
            </label>
            <TextField
              sx={{ width: "100%" }}
              placeholder="Enter Author Name"
              variant="outlined"
              id="aName"
              type="text"
              {...register("author", { required: true })}
            />
          </Box>
          <Box sx={{ width: "100%", mx: 1 }}>
            <label style={{ display: "block" }} htmlFor="price">
              Price <span style={{ color: "red" }}>*</span>
            </label>
            <TextField
              sx={{ width: "100%" }}
              placeholder="Enter Price"
              variant="outlined"
              id="price"
              type="number"
              {...register("price", { required: true })}
            />
          </Box>
          <Box sx={{ width: "100%", ml: 1 }}>
            <label style={{ display: "block" }} htmlFor="date">
              Pubish Date <span style={{ color: "red" }}>*</span>
            </label>
            <TextField
              sx={{ width: "100%" }}
              variant="outlined"
              id="date"
              type="date"
              {...register("date", { required: true })}
            />
          </Box>
        </Box>

        <Box sx={{ mb: 2 }}>
          <label style={{ display: "block" }} htmlFor="aImg">
            Author Image Link <span style={{ color: "red" }}>*</span>
          </label>
          <TextField
            sx={{ width: "100%" }}
            placeholder="Enter Author Image Link"
            variant="outlined"
            id="aImg"
            type="text"
            {...register("authorImg", { required: true })}
          />
        </Box>

        <Box sx={{ textAlign: "center", mt: 3, mb: 6 }}>
          <Button
            sx={{ color: "#fff !important", width: "100%" }}
            className="btn_regular"
            type="submit"
          >
            Add New Course
          </Button>
        </Box>
      </form>
    </Container>
  );
};

export default AddCourse;
