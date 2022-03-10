import React, { useEffect, useState, useRef } from "react";
import {
  Box,
  Breadcrumbs,
  Button,
  Container,
  FormControl as FormGroup,
  Grid,
  Paper,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import Chip from "@mui/material/Chip";
import { emphasize, styled } from "@mui/material/styles";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import HomeIcon from "@mui/icons-material/Home";
const TaskAssign = () => {
  const { register, handleSubmit, reset } = useForm();
  const [employees, setEmployees] = useState([]);
  const [employeeName, setEmployeeName] = useState("");
  const [task,setTask]=useState([]);
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

  const handleChange = (event) => {
    setEmployeeName(event.target.value);
  };
  console.log(employeeName);
  useEffect(() => {
    fetch("https://ancient-thicket-61342.herokuapp.com/employees")
      .then((res) => res.json())
      .then((data) => setEmployees(data.data));
  }, []);
  //submit form
  const onSubmit = (data, e) => {
    // data.completedTask = [];
    console.log(data);
    fetch("http://localhost:5000/taskAssign", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((result) => console.log(result));
    e.target.reset();
  };
  let time = new Date().toLocaleString();
  const todaydate = time.split(",")[0];
  console.log(todaydate);
  //get task
//   useEffect(() => {
//     fetch(`http://localhost:5000/comment/${id}`)
//       .then((res) => res.json())
//       .then((data) => setTask(data));
//   }, [task]);
  return (
    <>
      <Container>
        {/* Breadcrumbs */}
        <Box sx={{ mb: 4 }}>
          <Typography sx={{ mt: 2, color: "var(--p_color)" }} variant="h4">
            Employee Task
          </Typography>
          <Breadcrumbs aria-label="breadcrumb">
            <Link to="/dashboard">
              <StyledBreadcrumb
                to="/dashboard"
                label="Dashboard"
                icon={<HomeIcon fontSize="small" />}
              />
            </Link>
            <Link to="/dashboard/task_assign">
              <StyledBreadcrumb component="a" href="#" label="Task" />
            </Link>
          </Breadcrumbs>
        </Box>

        <Grid container spacing={2}>
          <Grid item xs={12} md={3} sm={0}></Grid>

          <Grid item xs={12} md={6} sm={12}>
            <Paper sx={{ p: 4, mt: 2, mb: 5 }} elevation={6}>
              <Typography
                sx={{ textAlign: "center", margin: "15px" }}
                variant="h4"
              >
                <span style={{ color: " #01578A" }}> Assign </span> Task
              </Typography>
              <form sx={{ mb: 5, mt: 5 }} onSubmit={handleSubmit(onSubmit)}>
                <Box sx={{ width: "100%" }}>
                  <label
                    style={{ display: "block", marginBottom: "10px" }}
                    htmlFor="title"
                  >
                    Employee Name <span style={{ color: "red" }}>*</span>
                  </label>
                  <TextField
                    style={{ width: "100%" }}
                    {...register("email")}
                    id="outlined-select-currency"
                    select
                    label="Name"
                    value={employeeName}
                    onChange={handleChange}
                    required
                  >
                    {employees.map((option) => (
                      <MenuItem key={option.name} value={option.email}>
                        {option.name}
                      </MenuItem>
                    ))}
                  </TextField>
                </Box>

                <label
                  style={{
                    display: "block",
                    marginBottom: "10px",
                    marginTop: "1rem",
                  }}
                  htmlFor="title"
                >
                  Add Task <span style={{ color: "red" }}>*</span>
                </label>
                <TextField
                  id="outlined-select-currency"
                  label="Add Task"
                  style={{ width: "100%" }}
                  {...register("task")}
                  placeholder="Write Task Here"
                />
                <Box sx={{ textAlign: "center", mt: 3 }}>
                  <Button
                    sx={{
                      background: "#01578A !important",
                      color: "#fff !important",
                      width: "100%",
                    }}
                    className="btn_regular"
                    type="submit"
                  >
                    Submit
                  </Button>
                </Box>
              </form>
            </Paper>
          </Grid>

          <Grid item xs={12} md={3} sm={0}></Grid>
        </Grid>
      </Container>
    </>
  );
};

export default TaskAssign;
