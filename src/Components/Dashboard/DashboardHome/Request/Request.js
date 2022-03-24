import React, { useEffect, useState } from "react";
import SystemUpdateAltOutlinedIcon from "@mui/icons-material/SystemUpdateAltOutlined";
import OpenInFullOutlinedIcon from "@mui/icons-material/OpenInFullOutlined";
import { Box, Paper, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Link } from "react-router-dom";

const Request = ({ employees }) => {
    const [leave, setLeave] = useState([]);
    useEffect(() => {
        fetch(`https://ancient-thicket-61342.herokuapp.com/leave`)
            .then((res) => res.json())
            .then((data) => setLeave(data.data));
    }, []);

    const [employeePending, setEmployeePending] = useState([]);
    const [leavePending, setLeavePending] = useState([]);
    useEffect(() => {
        const filterData = employees?.filter((data) => data.status === "Pending");
        setEmployeePending(filterData);
    }, [employees]);
    useEffect(() => {
        const filterData = leave.filter((data) => data.status === "pending");
        setLeavePending(filterData);
    }, [leave]);

    function leftPad(number) {
        var output = number + "";
        while (output.length < 2) {
            output = "0" + output;
        }
        return output;
    }

    const useStyle = makeStyles({
        reqContainer: {
            background: "transparent",
        },
        reqBox: {
            background: "#fff",
            border: "1px solid #845EC2",
        },
        reqText: {
            display: "flex",
            justifyContent: "space-between",
            padding: "12px 20px",
            background: "#fff",
            color: "#845EC2",
        },
        reqAction: {
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            background: "#845EC2",
            padding: "10px",
            color: "#fff",
        },
    });
    const { reqContainer, reqBox, reqText, reqAction } = useStyle();

    return (
        <Box className={reqContainer}>
            <Paper elevation={8} className={reqBox}>
                <Box className={reqText}>
                    <Box>
                        <Typography variant="h4">
                            {leftPad(employeePending.length)}
                        </Typography>
                        <Typography variant="h5">Pending Employees</Typography>
                    </Box>
                    <SystemUpdateAltOutlinedIcon fontSize="large" />
                </Box>
                <Link to="/dashboard/all_employees">
                    <Box className={reqAction}>
                        <Typography variant="h6">Check Now</Typography>
                        <OpenInFullOutlinedIcon />
                    </Box>
                </Link>
            </Paper>

            <Paper elevation={8} sx={{ mt: 3, border: "1px solid #009EFA" }} className={reqBox}>
                <Box sx={{ color: "#009EFA" }} className={reqText}>
                    <Box>
                        <Typography variant="h4">{leftPad(leavePending.length)}</Typography>
                        <Typography variant="h5">Pending Leave</Typography>
                    </Box>
                    <SystemUpdateAltOutlinedIcon fontSize="large" />
                </Box>
                <Link to="/dashboard/LeaveRequests">
                    <Box sx={{ background: "#009EFA" }} className={reqAction}>
                        <Typography variant="h6">Check Now</Typography>
                        <OpenInFullOutlinedIcon />
                    </Box>
                </Link>
            </Paper>
        </Box>
    );
};

export default Request;
