import { Button, Grid, Paper, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

const AddAnnouncement = () => {
    const [announceData, setAnnounceData] = useState({});

    const handleOnChange = (e) => {
        const field = e.target.name;
        const value = e.target.value;
        const newAnnounceData = { ...announceData };
        newAnnounceData[field] = value;
        console.log(newAnnounceData);
        setAnnounceData(newAnnounceData);
    };

    const { register, handleSubmit } = useForm();
    const onSubmit = (data) => console.log(data);
    return (
        <div>
            <Grid container spacing={2}>
                <Grid item xs={12} md={3}></Grid>

                <Grid item xs={12} md={6}>
                    <Paper sx={{ p: 4, mt: 5 }} elevation={6}>
                        <Typography sx={{ textAlign: "center", margin: "15px", color: "#009EFA" }} variant="h4">
                            Add Announcement
                        </Typography>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Box sx={{ mb: 2 }}>
                                <label style={{ display: "block" }} htmlFor="title">
                                    Title <span style={{ color: "red" }}>*</span>
                                </label>
                                <TextField
                                    onBlur={handleOnChange}
                                    sx={{ width: "100%" }}
                                    variant="outlined"
                                    id="title"
                                    type="text"
                                    {...register("name", { required: true })}
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
                                    style={{ width: "480px", height: "120px" }}
                                    variant="outlined"
                                    id="title"
                                    type="text"
                                    {...register("text", { required: true })}
                                />
                            </Box>
                            <Box sx={{ textAlign: "center", mt: 3 }}>
                                <Button
                                    sx={{ background: "#00D2FC !important", color: "#fff !important", width: "100%" }}
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
