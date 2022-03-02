import { Grid, Paper, TextField, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { Box } from "@mui/system";
import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import "./Leave.css";

const Leave = () => {
    const { user } = useAuth();

    const [leaveData, setLeaveData] = useState({});

    const handleOnChange = (e) => {
        const field = e.target.title;
        const value = e.target.value;
        const newAnnounceData = { ...leaveData };
        newAnnounceData[field] = value;
        setLeaveData(newAnnounceData);
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
    return (
        <div>
            <Grid container spacing={2}>
                <Grid item xs={12} md={3} sm={0}></Grid>

                <Grid item xs={12} md={6} sm={12}>
                    <Paper sx={{ p: 4, mt: 5, mb: 5 }} elevation={6}>
                        <Typography sx={{ textAlign: "center", margin: "15px" }} variant="h4">
                            <span style={{ color: " #01578A" }}> Leave</span> Form
                        </Typography>
                        <form sx={{ mb: 5, mt: 5 }} onSubmit={handleSubmit(onSubmit)}>
                            <Box sx={{ mb: 1 }}>
                                <label style={{ display: "block" }} htmlFor="title">
                                    Name <span style={{ color: "red" }}>*</span>
                                </label>
                                <TextField
                                    onBlur={handleOnChange}
                                    value={user?.displayName}
                                    sx={{ width: "100%" }}
                                    variant="outlined"
                                    id="title"
                                    type="title"
                                    {...register("name", { required: true })}
                                />
                            </Box>
                            <Box sx={{ mb: 1 }}>
                                <label style={{ display: "block" }} htmlFor="title">
                                    Email <span style={{ color: "red" }}>*</span>
                                </label>
                                <TextField
                                    onBlur={handleOnChange}
                                    value={user?.email}
                                    sx={{ width: "100%" }}
                                    variant="outlined"
                                    id="title"
                                    type="title"
                                    {...register("email", { required: true })}
                                />
                            </Box>
                            <Box sx={{ mb: 1 }}>
                                <label style={{ display: "block" }} htmlFor="title">
                                    Reason <span style={{ color: "red" }}>*</span>
                                </label>
                                <TextField
                                    onBlur={handleOnChange}
                                    sx={{ width: "100%" }}
                                    variant="outlined"
                                    id="title"
                                    type="title"
                                    {...register("leaveType", { required: true })}
                                />
                            </Box>
                            <Box sx={{ display: "flex", width: "100%", justifyContent: "space-between", mb: 1 }}>
                                <Box sx={{ marginRight: "10px" }}>
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
                                <Box>
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

                                {/* <Box>
                                    <label style={{ display: "block" }} htmlFor="date">
                                        Start Date <span style={{ color: "red" }}>*</span>
                                    </label>
                                    <TextField
                                        onBlur={handleOnChange}
                                        sx={{ width: "100%" }}
                                        variant="outlined"
                                        id="date"
                                        type="date"
                                        {...register("tripStart", { required: true })}
                                    />
                                </Box>

                                <Box>
                                    <label style={{ display: "block" }} htmlFor="date">
                                        Total Day <span style={{ color: "red" }}>*</span>
                                    </label>
                                    <TextField
                                        onBlur={handleOnChange}
                                        sx={{ width: "100%" }}
                                        variant="outlined"
                                        id="date"
                                        type="number"
                                        {...register("tripEnd", { required: true })}
                                    />
                                </Box> */}
                            </Box>

                            <Box sx={{ mb: 1 }}>
                                <label style={{ display: "block" }} htmlFor="title">
                                    Write Text <span style={{ color: "red" }}>*</span>
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
        </div>
    );
};

export default Leave;
