import HomeIcon from "@mui/icons-material/Home";
import { Box, Breadcrumbs, Container, Typography } from "@mui/material";
// Breadcrumbs
import Chip from "@mui/material/Chip";
import { emphasize, styled } from "@mui/material/styles";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LeaveApplication from "./LeaveApplication";

const LeaveApplications = () => {
    const [leaves, setLeave] = useState([]);
    const [isChange, setIsChange] = useState(false);
    console.log(leaves);

    useEffect(() => {
        fetch("https://ancient-thicket-61342.herokuapp.com/leave")
            .then((res) => res.json())
            .then((data) => {
                setLeave(data.data);
                console.log(data);
            });
    }, [isChange]);

    // Breadcrumbs
    const StyledBreadcrumb = styled(Chip)(({ theme }) => {
        const backgroundColor = theme.palette.mode === "light" ? theme.palette.grey[100] : theme.palette.grey[800];
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
        <Container>
            {/* Breadcrumbs */}
            <Box sx={{ mb: 4 }}>
                <Typography sx={{ mt: 2, color: "var(--p_color)" }} variant="h4">
                    Leave Application
                </Typography>
                <Breadcrumbs aria-label="breadcrumb">
                    <Link to="/dashboard">
                        <StyledBreadcrumb to="/dashboard" label="Dashboard" icon={<HomeIcon fontSize="small" />} />
                    </Link>
                    <Link to="/dashboard/leaveApplications">
                        <StyledBreadcrumb component="a" href="#" label="Leave Application" />
                    </Link>
                </Breadcrumbs>
            </Box>

            <Box>
                {leaves.map((leave) => (
                    <LeaveApplication isChange={isChange} setIsChange={setIsChange} key={leave.id} leave={leave}></LeaveApplication>
                ))}
            </Box>
        </Container>
    );
};

export default LeaveApplications;
