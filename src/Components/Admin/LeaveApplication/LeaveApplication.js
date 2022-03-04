import { Button, Grid, MenuItem, Paper, TextField } from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
import Modal from "@mui/material/Modal";
import { makeStyles } from "@mui/styles";
import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
};

const LeaveApplication = ({ leave, setIsChange, isChange }) => {
    const [success, setSuccess] = useState("");
    const { name, email, message, tripStart, tripEnd, leaveType, _id, status } = leave;
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

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
        setIsChange(!isChange);
        setSuccess("");
        axios.put(`https://ancient-thicket-61342.herokuapp.com/leave/${_id}`, data);
        reset();
        setSuccess("leave added successfully");
    };

    const useStyle = makeStyles({
        leaveContainer: {
            border: "1px solid gray",
            marginBottom: "15px",
            borderRadius: "5px",
        },
        leaveBox: {
            margin: "auto",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
        },
    });

    const { leaveContainer, leaveBox } = useStyle();

    const statuss = [
        {
            value: "Approve",
            label: "Approve",
        },
        {
            value: "Cancel",
            label: "Cancel",
        },
    ];

    const [statuses, setStatuses] = useState();

    const handleChange = (event) => {
        setStatuses(event.target.value);
    };

    return (
        <Box className={leaveContainer}>
            {/* Modal add */}

            <div>
                <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    open={open}
                    onClose={handleClose}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                        timeout: 500,
                    }}
                >
                    <Fade in={open}>
                        <Box sx={style}>
                            <form sx={{ mb: 5, mt: 5 }} onSubmit={handleSubmit(onSubmit)}>
                                <Box sx={{ mb: 1 }}>
                                    <label style={{ display: "block" }} htmlFor="title">
                                        Status <span style={{ color: "red" }}>*</span>
                                    </label>
                                    <TextField
                                        onBlur={handleOnChange}
                                        sx={{ width: "100%" }}
                                        defaultValue={statuses}
                                        id="outlined-select-currency"
                                        select
                                        {...register("status", { required: true })}
                                        onChange={handleChange}
                                    >
                                        {statuss.map((option) => (
                                            <MenuItem key={option.value} value={option.value}>
                                                {option.label}
                                            </MenuItem>
                                        ))}
                                    </TextField>

                                    {/* <TextField
                                        onBlur={handleOnChange}
                                        sx={{ width: "100%" }}
                                        defaultValue={status}
                                        select
                                        variant="outlined"
                                        id="status"
                                        type="status"
                                        {...register("status", { required: true })}
                                    /> */}
                                </Box>

                                <Box>
                                    <label style={{ display: "block" }} htmlFor="date">
                                        Start Date <span style={{ color: "red" }}>*</span>
                                    </label>
                                    <TextField
                                        onBlur={handleOnChange}
                                        sx={{ width: "100%" }}
                                        defaultValue={tripStart}
                                        variant="outlined"
                                        id="date"
                                        type="date"
                                        {...register("tripStart", { required: true })}
                                    />
                                </Box>

                                <Box>
                                    <label style={{ display: "block" }} htmlFor="date">
                                        End Day <span style={{ color: "red" }}>*</span>
                                    </label>
                                    <TextField
                                        onBlur={handleOnChange}
                                        sx={{ width: "100%" }}
                                        defaultValue={tripEnd}
                                        variant="outlined"
                                        id="date"
                                        type="date"
                                        {...register("tripEnd", { required: true })}
                                    />
                                </Box>
                                {/* </Box> */}

                                <Box sx={{ textAlign: "center", mt: 3 }}>
                                    <Button
                                        sx={{ background: "#01578A !important", color: "#fff !important", width: "100%" }}
                                        className="btn_regular"
                                        type="submit"
                                    >
                                        Submit
                                    </Button>

                                    {success && <p>{success}</p>}
                                </Box>
                            </form>
                        </Box>
                    </Fade>
                </Modal>
            </div>

            {/* leave application  */}

            <Paper elevation={6}>
                <Grid container>
                    <Grid className={leaveBox} item xs={12} md={3} sm={12}>
                        <Box>
                            <h3>{name}</h3>
                            <h4 style={{ marginTop: "-17px" }}>{email}</h4>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={7} sm={12}>
                        <Box sx={{ mx: 3 }}>
                            <h3>{leaveType}</h3>
                            <Box sx={{ mt: "-18px" }}>
                                <span>Leave Start {tripStart} </span>
                                <span> Days {tripEnd}</span>
                            </Box>
                            <p>{message}</p>
                        </Box>
                    </Grid>
                    <Grid className={leaveBox} item xs={12} md={2} sm={12}>
                        <Box sx={{ mb: 2 }}>
                            <p>{status}</p>
                            <Button onClick={handleOpen} className="btn_regular">
                                {status}
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
            </Paper>
        </Box>
    );
};

export default LeaveApplication;
