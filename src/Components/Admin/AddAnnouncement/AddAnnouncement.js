import {
  Breadcrumbs,
  Button,
  Container,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

// Breadcrumbs
import Chip from "@mui/material/Chip";
import { emphasize, styled } from "@mui/material/styles";
import HomeIcon from "@mui/icons-material/Home";
import { Link } from "react-router-dom";

const AddAnnouncement = () => {
  const [announceData, setAnnounceData] = useState({});
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    fetch("https://hr-care.onrender.com/employees")
      .then((res) => res.json())
      .then((data) => setEmployees(data.result));
  }, []);

  const handleOnChange = (e) => {
    const field = e.target.title;
    const value = e.target.value;
    const newAnnounceData = { ...announceData };
    newAnnounceData[field] = value;
    setAnnounceData(newAnnounceData);
  };

  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data) => {
    console.log(data);

    employees.map((user) =>
      fetch("https://hr-care.onrender.com/announcement", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          ID: user?.ID,
          email: user?.email,
          title: data?.title,
          date: data?.date,
          text: data?.text,
          status: "unread",
        }),
      })
    );

    reset();
    Swal.fire({
      position: "middle",
      icon: "success",
      title: "Announcement added successfully",
      showConfirmButton: false,
      timer: 2000,
    });
  };

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
    <Container sx={{ mb: 6 }}>
      {/* Breadcrumbs */}
      <Box sx={{ mb: 2 }}>
        <Typography sx={{ mt: 2, color: "var(--p_color)" }} variant="h4">
          Announcement
        </Typography>
        <Breadcrumbs aria-label="breadcrumb">
          <Link to="/dashboard">
            <StyledBreadcrumb
              to="/dashboard"
              label="Dashboard"
              icon={<HomeIcon fontSize="small" />}
            />
          </Link>
          <Link to="/dashboard/add_announcement">
            <StyledBreadcrumb component="a" href="#" label="Add Announcement" />
          </Link>
        </Breadcrumbs>
      </Box>

      <Grid container spacing={2}>
        <Grid
          sx={{
            display: { xs: "none", sm: "none", md: "flex", lg: "flex" },
            alignItems: "center",
            justifyContent: "center",
          }}
          item
          xs={12}
          md={6}
        >
          <Box>
            <img
              style={{ width: "100%" }}
              src="https://i.ibb.co/Npzb5V4/5889300.jpg"
              alt="announce"
            />
          </Box>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 4, mt: 3, width: "100%" }} elevation={6}>
            <Typography
              sx={{
                textAlign: "center",
                margin: "15px 0",
                fontFamily: "var(--PT_font)",
              }}
              variant="h4"
            >
              Add New{" "}
              <span style={{ color: "var(--p_color)" }}>Announcement</span>
            </Typography>
            <form sx={{ mb: 5, mt: 5 }} onSubmit={handleSubmit(onSubmit)}>
              <Box>
                <label style={{ display: "block" }} htmlFor="title">
                  Title <span style={{ color: "red" }}>*</span>
                </label>
                <TextField
                  onBlur={handleOnChange}
                  sx={{ width: "100%" }}
                  variant="outlined"
                  id="title"
                  type="title"
                  {...register("title", { required: true })}
                />
              </Box>
              <Box>
                <label style={{ display: "block" }} htmlFor="date">
                  Date <span style={{ color: "red" }}>*</span>
                </label>
                <TextField
                  onBlur={handleOnChange}
                  sx={{ width: "100%" }}
                  variant="outlined"
                  id="date"
                  type="date"
                  {...register("date", { required: true })}
                />
              </Box>
              <Box sx={{ mt: 2 }}>
                <label style={{ display: "block" }} htmlFor="title">
                  Write Text <span style={{ color: "red" }}>*</span>
                </label>
                <textarea
                  onChange={handleOnChange}
                  style={{ width: "100%", height: "120px" }}
                  variant="outlined"
                  id="text"
                  type="text"
                  {...register("text", { required: true })}
                />
              </Box>
              <Box sx={{ textAlign: "center", mt: 3 }}>
                <Button
                  sx={{
                    background: "var(--p_color) !important",
                    color: "#fff !important",
                    width: "100%",
                  }}
                  className="btn_regular"
                  type="submit"
                >
                  Add Announcement
                </Button>
              </Box>
            </form>
          </Paper>
        </Grid>

        <Grid
          sx={{
            display: { xs: "flex", sm: "flex", md: "none", lg: "none" },
            alignItems: "center",
            justifyContent: "center",
          }}
          item
          xs={12}
          md={6}
        >
          <Box>
            <img
              style={{ width: "100%" }}
              src="https://i.ibb.co/Npzb5V4/5889300.jpg"
              alt="announce"
            />
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AddAnnouncement;
