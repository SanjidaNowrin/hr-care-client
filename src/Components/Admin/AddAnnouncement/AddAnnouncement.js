import { Button, Grid, Paper, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
const AddAnnouncement = () => {
    const [announceData, setAnnounceData] = useState({});

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
        axios.post("https://ancient-thicket-61342.herokuapp.com/announcement", data);
        reset();
        Swal.fire({
            position: "middle",
            icon: "success",
            title: "Announcement added successfully",
            showConfirmButton: false,
            timer: 2000,
          });
    };
    return (
        <div>
            <Grid container spacing={2}>
                <Grid item xs={12} md={3}></Grid>

                <Grid item xs={12} md={6}>
                    <Paper sx={{ p: 4, mt: 5 }} elevation={6}>
                        <Typography sx={{ textAlign: "center", margin: "15px"}} variant="h4">
                        Add<span style={{ color: " #01578A" }}> Announcement</span>
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
                                    style={{ width: "490px", height: "120px" }}
                                    variant="outlined"
                                    id="text"
                                    type="text"
                                    {...register("text", { required: true })}
                                />
                            </Box>
                            <Box sx={{ textAlign: "center", mt: 3 }}>
                                <Button
                                    sx={{ background: "#01578A !important", color: "#fff !important", width: "100%" }}
                                    className="btn_regular"
                                    type="submit"
                                >
                                    Add Announcement
                                </Button>
                            </Box>
                        </form>
                    </Paper>
                </Grid>

                <Grid item xs={12} md={3}></Grid>
            </Grid>
        </div>
    );
};

export default AddAnnouncement;
