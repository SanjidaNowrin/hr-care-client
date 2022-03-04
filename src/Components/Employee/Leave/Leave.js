import { Container, Box, Grid, MenuItem, Paper, TextField, Typography, Breadcrumbs } from "@mui/material";
import Button from "@mui/material/Button";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";

// Breadcrumbs
import Chip from '@mui/material/Chip';
import { emphasize, styled } from '@mui/material/styles';
import HomeIcon from '@mui/icons-material/Home';
import { Link } from "react-router-dom";


const Leave = () => {
    const { user } = useAuth();
    const [leaveData, setLeaveData] = useState({});
    const [employee, setEmployee] = useState({});

    useEffect(() => {
        fetch(`https://ancient-thicket-61342.herokuapp.com/employees/${user?.email}`)
            .then((res) => res.json())
            .then((data) => setEmployee(data.result[0]));
    }, [user.email]);
    console.log(employee)

    const handleOnChange = (e) => {
        const field = e.target.title;
        const value = e.target.value;
        const newLeaveData = { ...leaveData };
        newLeaveData[field] = value;
        setLeaveData(newLeaveData);
    };

    const { register, handleSubmit, reset } = useForm();

    const onSubmit = (data) => {
        axios.post("https://ancient-thicket-61342.herokuapp.com/leave", data);
        reset();
        Swal.fire({
            position: "middle",
            icon: "success",
            title: "Leave added successfully",
            showConfirmButton: false,
            timer: 2000,
        });
    };

    const leaveTypes = [
        {
            value: "Casual Leave",
            label: "Casual Leave",
        },
        {
            value: "Sick Leave",
            label: "Sick Leave",
        },
        {
            value: "Marriage Leave",
            label: "Marriage Leave",
        },
        {
            value: "Maternity Leave",
            label: "Maternity Leave",
        },
        {
            value: "Earned Leave",
            label: "Earned Leave",
        }
    ];

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
                    Leave
                </Typography>
                <Breadcrumbs aria-label="breadcrumb">
                    <Link to="/dashboard">
                        <StyledBreadcrumb
                            to="/dashboard"
                            label="Dashboard"
                            icon={<HomeIcon fontSize="small" />}
                        />
                    </Link>
                    <Link to="/dashboard/leave"><StyledBreadcrumb component="a" href="#" label="Leave" /></Link>
                </Breadcrumbs>
            </Box>

            <Grid container spacing={2}>
                <Grid item xs={12} md={3} sm={0}></Grid>

                <Grid item xs={12} md={6} sm={12}>
                    <Paper sx={{ p: 4, mt: 2, mb: 5 }} elevation={6}>
                        <Typography sx={{ textAlign: "center", margin: "15px" }} variant="h4">
                            <span style={{ color: " #01578A" }}> Leave</span> Form
                        </Typography>
                        <form sx={{ mb: 5, mt: 5 }} onSubmit={handleSubmit(onSubmit)}>

                            <Box sx={{ display: "flex", width: "100%", justifyContent: "space-between", mb: 1 }}>
                                <Box sx={{ width: "48%" }}>
                                    <label style={{ display: "block" }} htmlFor="title">
                                        ID <span style={{ color: "red" }}>*</span>
                                    </label>
                                    <TextField
                                        onBlur={handleOnChange}
                                        value={employee?.ID}
                                        sx={{ width: "100%" }}
                                        variant="outlined"
                                        id="title"
                                        type="text"
                                        {...register("ID", { required: true })}
                                    />
                                </Box>
                                <Box sx={{ width: "48%" }}>
                                    <label style={{ display: "block" }} htmlFor="title">
                                        Name <span style={{ color: "red" }}>*</span>
                                    </label>
                                    <TextField
                                        onBlur={handleOnChange}
                                        value={employee?.name}
                                        sx={{ width: "100%" }}
                                        variant="outlined"
                                        id="title"
                                        type="text"
                                        {...register("name", { required: true })}
                                    />
                                </Box>

                            </Box>
                            <Box sx={{ display: "flex", width: "100%", justifyContent: "space-between", mb: 1 }}>
                                <Box sx={{ width: "48%" }}>
                                    <label style={{ display: "block" }} htmlFor="title">
                                        Department <span style={{ color: "red" }}>*</span>
                                    </label>
                                    <TextField
                                        onBlur={handleOnChange}
                                        value={employee?.department}
                                        sx={{ width: "100%" }}
                                        variant="outlined"
                                        id="title"
                                        type="text"
                                        {...register("department", { required: true })}
                                    />
                                </Box>
                                <Box sx={{ width: "48%" }}>
                                    <label style={{ display: "block" }} htmlFor="title">
                                        Designation <span style={{ color: "red" }}>*</span>
                                    </label>
                                    <TextField
                                        onBlur={handleOnChange}
                                        value={employee?.designation}
                                        sx={{ width: "100%" }}
                                        variant="outlined"
                                        id="title"
                                        type="text"
                                        {...register("designation", { required: true })}
                                    />
                                </Box>
                            </Box>

                            <Box sx={{ mb: 1 }}>
                                <label style={{ display: "block" }} htmlFor="title">
                                    Email <span style={{ color: "red" }}>*</span>
                                </label>
                                <TextField
                                    onBlur={handleOnChange}
                                    value={employee?.email}
                                    sx={{ width: "100%" }}
                                    variant="outlined"
                                    id="title"
                                    type="text"
                                    {...register("email", { required: true })}
                                />
                            </Box>

                            <Box sx={{ display: "flex", width: "100%", justifyContent: "space-between", mb: 1 }}>
                                <Box sx={{ width: "48%" }}>
                                    <label style={{ display: "block" }} htmlFor="title">
                                        Leave Type <span style={{ color: "red" }}>*</span>
                                    </label>
                                    <TextField
                                        onBlur={handleOnChange}
                                        sx={{ width: "100%" }}
                                        variant="outlined"
                                        id="outlined-basic"
                                        select
                                        {...register("leaveType", { required: true })}
                                    >
                                        {leaveTypes.map((option) => (
                                            <MenuItem key={option.value} value={option.value}>
                                                {option.label}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </Box>
                                <Box sx={{ width: "48%" }}>
                                    <label style={{ display: "block" }} htmlFor="title">
                                        Leave Days <span style={{ color: "red" }}>*</span>
                                    </label>
                                    <TextField
                                        onBlur={handleOnChange}
                                        sx={{ width: "100%" }}
                                        variant="outlined"
                                        id="outlined-basic"
                                        type="number"
                                        {...register("leaveDays", { required: true })}
                                    />
                                </Box>

                            </Box>
                            <Box sx={{ display: "flex", width: "100%", justifyContent: "space-between", mb: 1 }}>
                                <Box sx={{ width: "48%" }}>
                                    <label>
                                        Start Date <span style={{ color: "red" }}>*</span>
                                    </label>
                                    <TextField
                                        sx={{ width: "100%" }}
                                        onBlur={handleOnChange}
                                        {...register("tripStart")}
                                        id="outlined-basic"
                                        type="date"
                                        variant="outlined"
                                    />
                                </Box>
                                <Box sx={{ width: "48%" }}>
                                    <label>
                                        End Day <span style={{ color: "red" }}>*</span>
                                    </label>
                                    <TextField
                                        sx={{ width: "100%" }}
                                        {...register("tripEnd")}
                                        onBlur={handleOnChange}
                                        id="outlined-basic"
                                        type="date"
                                        variant="outlined"
                                    />
                                </Box>

                            </Box>

                            <Box sx={{ mb: 1 }}>
                                <label style={{ display: "block" }} htmlFor="title">
                                    Write your reason <span style={{ color: "red" }}>*</span>
                                </label>
                                <textarea
                                    onChange={handleOnChange}
                                    style={{ width: "100%", height: "120px" }}
                                    variant="outlined"
                                    id="text"
                                    type="text"
                                    {...register("message", { required: true })}
                                />
                            </Box>
                            <Box sx={{ textAlign: "center", mt: 3 }}>
                                <Button
                                    sx={{ background: "#01578A !important", color: "#fff !important", width: "100%" }}
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
        </Container >
    );
};

export default Leave;
