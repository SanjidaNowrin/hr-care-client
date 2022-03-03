import { Breadcrumbs, Container, Grid, Paper, Typography, useTheme } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// Breadcrumbs
import Chip from '@mui/material/Chip';
import { emphasize, styled } from '@mui/material/styles';
import HomeIcon from '@mui/icons-material/Home';
import OneLeaveRequest from "./OneLeaveRequest/OneLeaveRequest";

const LeaveRequests = () => {
    const theme = useTheme();
    const useStyle = makeStyles({
        announceBox: {
            width: '100%',
            padding: '5px 10px',
            border: "2px solid #fff",
            borderRadius: '13px !important',
            marginBottom: '20px',
            transition: 'all .3s ease',
            "&:hover": {
                border: "2px solid #009EFA",
                boxShadow: '1px 10px 30px #b6b7b7 !important'
            },
        },
        activeAnnounceBox: {
            width: '100%',
            padding: '5px 10px',
            border: "2px solid #fff",
            borderRadius: '13px !important',
            marginBottom: '20px',
            border: "2px solid #009EFA",
            boxShadow: '1px 10px 30px #b6b7b7 !important'
        },
        announceTop: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
        },
        announceTitle: {
            color: '#845EC2',
            fontWeight: '400 !important',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        },
        dateStyle: {
            position: "relative",
            color: "#fff",
            background: '#FFC75F',
            padding: '2px 10px 1px 20px',
            borderRadius: '20px',
            fontStyle: 'italic',
            "&::after": {
                content: '""',
                position: 'absolute',
                height: '5px',
                width: '5px',
                background: '#fff',
                borderRadius: '50%',
                top: '50%',
                left: '11%',
                transform: 'translate(-50%, -50%)'
            },
        },
        announceP: {
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            fontFamily: 'var(--PT_font) !important',
            textTransform: 'capitalize',
            [theme.breakpoints.down("sm")]: {
                display: "none !important",
            },
        }
    });
    const { announceBox, activeAnnounceBox, announceTop, announceTitle, dateStyle, announceP } = useStyle();

    const [isActive, setActive] = useState();
    const handleClick = (id) => {
        console.log(id)
        setActive(id);
    };

    const [data, setData] = useState([]);
    useEffect(() => {
        fetch("https://ancient-thicket-61342.herokuapp.com/leave")
            .then((res) => res.json())
            .then((data) => setData(data.data));
    }, []);

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
            <Box>
                <Typography
                    sx={{ mt: 2, color: 'var(--p_color)' }} variant="h4">
                    Leave Requests
                </Typography>
                <Breadcrumbs aria-label="breadcrumb">
                    <Link to="/dashboard">
                        <StyledBreadcrumb
                            to="/dashboard"
                            label="Dashboard"
                            icon={<HomeIcon fontSize="small" />}
                        />
                    </Link>
                    <Link to="/dashboard/leaveRequests"><StyledBreadcrumb component="a" href="#" label="Leave Requests" /></Link>
                </Breadcrumbs>
            </Box>

            <Box sx={{ mt: 4 }}>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>

                        {data?.map((data) => (
                            <Link
                                to={`/dashboard/leaveRequests/${data._id}`}>
                                <Paper
                                    onClick={() => handleClick(data._id)}
                                    className={data._id === isActive ? activeAnnounceBox : announceBox}
                                    key={data._id}
                                >
                                    <Box className={announceTop}>
                                        <Typography className={announceTitle} variant="h6">
                                            {data.name}
                                        </Typography>

                                        <Typography variant="body2" className={dateStyle}>{data.leaveType}</Typography>
                                    </Box>
                                    <Box className={announceTop}>
                                        <Typography className={announceP} variant="body1">{data?.designation}</Typography>
                                        <Typography className={announceP} variant="body1">{data?.department}</Typography>
                                        <Typography className={announceP} variant="body1">{data?.status}</Typography>
                                    </Box>

                                </Paper>
                            </Link>
                        ))}
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <OneLeaveRequest data={data}></OneLeaveRequest>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
};

export default LeaveRequests;
