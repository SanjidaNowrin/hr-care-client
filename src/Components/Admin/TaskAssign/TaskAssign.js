import React, { useEffect, useState } from "react";
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
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import Tooltip from "@mui/material/Tooltip";
import ReactTagInput from "@pathofdev/react-tag-input";
import "@pathofdev/react-tag-input/build/index.css";
import SendIcon from "@mui/icons-material/Send";
const TaskAssign = () => {
  const { register, handleSubmit, reset } = useForm();
  const [employees, setEmployees] = useState([]);
  const [employeeName, setEmployeeName] = useState([]);
  const [task, setTask] = useState([]);
  const [tags, setTags] = useState([]);

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
  //   table
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "#a3d2ed",
      color: theme.palette.common.black,
      fontSize: 24,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 18,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));
  const handleData = (event) => {
    setEmployeeName(event.target.value);
  };

  useEffect(() => {
    fetch("https://ancient-thicket-61342.herokuapp.com/employees")
      .then((res) => res.json())
      .then((data) => setEmployees(data.data));
  }, []);
  //submit form
  const onSubmit = (data, e) => {
    fetch("https://ancient-thicket-61342.herokuapp.com/taskAssign", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        email: data.employee.email,
        ID: data.employee.ID,
        name: data.employee.name,
        date: data.date,
        tags: tags,
        startTime: data.startTime,
        endTime: data.endTime,
      }),
    })
      .then((res) => res.json())
      .then((result) => console.log(result));
    reset();
  };

  //get task
  useEffect(() => {
    fetch("https://ancient-thicket-61342.herokuapp.com/taskAssign")
      .then((res) => res.json())
      .then((data) => setTask(data.data));
  }, [task]);
  // delete
  const handleDelete = (item) => {
    fetch(`https://ancient-thicket-61342.herokuapp.com/taskAssign/${item._id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.deletedCount === 1) {
        }
      });
  };

  return (
    <>
      <Container>
        {/* Breadcrumbs */}
        <Box sx={{ mb: 2 }}>
          <Typography
            sx={{ mt: 2, mb: 1, color: "var(--p_color)" }}
            variant="h4"
          >
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

        <Grid container spacing={3}>
          <Grid item xs={12} md={4} sm={12}>
            <Paper sx={{ p: 4, mt: 2, mb: 5 }} elevation={6}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "0.9rem",
                }}
              >
                <Typography
                  sx={{
                    textAlign: "center",
                    marginTop: "0px",
                    fontSize: "1.9rem",
                  }}
                  variant="h5"
                >
                  <span style={{ color: " #01578A" }}> Assign </span> Task
                </Typography>
                <img src="https://img.icons8.com/ios-filled/50/000000/batch-assign.png" alt="icon" />
              </Box>
              <form sx={{ mb: 5, mt: 5 }} onSubmit={handleSubmit(onSubmit)}>
                <Box sx={{ width: "100%" }}>
                  <label
                    style={{ display: "block", marginBottom: "4px" }}
                    htmlFor="title"
                  >
                    Employee Name <span style={{ color: "red" }}>*</span>
                  </label>
                  <TextField
                    style={{ width: "100%" }}
                    {...register("employee")}
                    id="outlined-select-currency"
                    select
                    label="Name"
                    value={employeeName}
                    onChange={handleData}
                    required
                  >
                    {employees.map((option) => (
                      <MenuItem key={option.name} value={option}>
                        {option.name}
                      </MenuItem>
                    ))}
                  </TextField>
                </Box>
                <label
                  style={{
                    display: "block",
                    marginBottom: "4px",
                    marginTop: "0.7rem",
                  }}
                  htmlFor="title"
                >
                  Add Task <span style={{ color: "red" }}>*</span>
                </label>
                <ReactTagInput
                  label="Add Task"
                  style={{ width: "100%" }}
                  {...register("tags")}
                  tags={tags}
                  value={tags}
                  placeholder="Type and press enter"
                  maxTags={10}
                  editable={true}
                  readOnly={false}
                  removeOnBackspace={true}
                  onChange={(newTags) => setTags(newTags)}
                />
                <label
                  style={{
                    display: "block",
                    marginBottom: "4px",
                    marginTop: "0.7rem",
                  }}
                  htmlFor="date"
                >
                  Date <span style={{ color: "red" }}>*</span>
                </label>
                <TextField
                  sx={{ width: "100%" }}
                  variant="outlined"
                  id="date"
                  type="date"
                  {...register("date", { required: true })}
                />
                <label
                  style={{
                    display: "block",
                    marginBottom: "4px",
                    marginTop: "0.7rem",
                  }}
                  htmlFor="title"
                >
                  Today Meeting Time <span style={{ color: "red" }}>*</span>
                </label>
                <TextField
                  sx={{ width: "100%" }}
                  variant="outlined"
                  id="startTime"
                  type="time"
                  {...register("startTime", { required: true })}
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
                    Send{" "}
                    <SendIcon sx={{ marginLeft: "5px", fontSize: "1rem" }} />
                  </Button>
                </Box>
              </form>
            </Paper>
          </Grid>
          <Grid item xs={12} md={8} sm={0} sx={{ marginTop: "1rem" }}>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>Employee</StyledTableCell>
                    <StyledTableCell align="center">Date</StyledTableCell>
                    <StyledTableCell align="center">Task</StyledTableCell>
                    <StyledTableCell align="right">Action</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {task.map((item) => (
                    <StyledTableRow>
                      <StyledTableCell component="th" scope="row">
                        {item.name}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {item.date}
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {item.tags.map((tag) => (
                          <li>{tag}</li>
                        ))}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        <Tooltip title="Delete">
                          <DeleteOutlineOutlinedIcon
                            sx={{ cursor: "pointer" }}
                            onClick={() => handleDelete(item)}
                          />
                        </Tooltip>
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default TaskAssign;
