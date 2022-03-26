import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import HomeIcon from "@mui/icons-material/Home";
import { Breadcrumbs, Container, Grid, Typography, useTheme } from "@mui/material";
// Breadcrumbs
import Chip from "@mui/material/Chip";
import { emphasize, styled } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import OneLeaveRequest from "./OneLeaveRequest/OneLeaveRequest";

const LeaveRequests = () => {
  const theme = useTheme();
  const useStyle = makeStyles({
    announceBox: {
      width: "100%",
      padding: "3px 5px",
      marginBottom: "25px",
      borderRadius: "13px !important",
      border: "2px solid lightGray",
      transition: "all .3s ease",

      "&:hover": {
        border: "2px solid gray",
        transform: "scale(1.05)",
      },
    },
    activeAnnounceBox: {
      width: "100%",
      padding: "3px 5px",

      borderRadius: "13px !important",

      border: "2px solid gray",
      boxShadow: "1px 10px 30px #b6b7b7 !important",
    },
    announceTop: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
    },
    announceTitle: {
      color: "gray",
      fontWeight: "400 !important",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    dateStyle: {
      position: "relative",
      color: "#fff",
      background: "#009EFA",
      padding: "2px 10px 1px 20px",
      borderRadius: "20px",
      fontStyle: "italic",
      "&::after": {
        content: '""',
        position: "absolute",
        height: "5px",
        width: "5px",
        background: "#fff",
        borderRadius: "50%",
        top: "50%",
        left: "11%",
        transform: "translate(-50%, -50%)",
      },
    },
    announceP: {
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
      fontFamily: "var(--PT_font) !important",
      textTransform: "capitalize",
      [theme.breakpoints.down("sm")]: {
        display: "none !important",
      },
    },
    rightIcon: {
      backgroundColor: "lightGray",
      color: "white",
      width: "40px",
      margin: "5px 0px 5px 0px",
      borderRadius: "5px",
      padding: "5px 0px 0px 11px",
    },
    announces: {
      color: "#ff7b3d",
    },
  });
  const { announces, announceBox, activeAnnounceBox, announceTop, announceTitle, dateStyle, announceP, rightIcon } = useStyle();

  const [isActive, setActive] = useState();
  const handleClick = (id) => {
    console.log(id);
    setActive(id);
  };

  const [data, setData] = useState([]);
  //pagination
  const [page, setPage] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  useEffect(() => {
    fetch("https://ancient-thicket-61342.herokuapp.com/leave")
      .then((res) => res.json())
      .then((data) => {
        setData(data.data.reverse());
        const count = data.data.count;
        const pageNumber = Math.ceil(count / 10);
        setPageCount(pageNumber);
      });
  }, [data]);

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
      <Box>
        <Typography sx={{ mt: 2, color: "var(--p_color)" }} variant="h4">
          Leave Requests
        </Typography>
        <Breadcrumbs aria-label="breadcrumb">
          <Link to="/dashboard">
            <StyledBreadcrumb to="/dashboard" label="Dashboard" icon={<HomeIcon fontSize="small" />} />
          </Link>
          <Link to="/dashboard/leaveRequests">
            <StyledBreadcrumb component="a" href="#" label="Leave Requests" />
          </Link>
        </Breadcrumbs>
      </Box>

      <Box sx={{ mt: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            {data?.map((data) => (
              <Box>
                <Typography sx={{ color: "gray" }}>
                  {data?.department}
                </Typography>
                <Box className={data._id === isActive ? activeAnnounceBox : announceBox}>
                  <Box sx={{ padding: "10px" }}>
                    <Box className={announceTop}>
                      <Typography sx={{ color: "gray" }}>
                        {data?.tripStart} To {data?.tripEnd}
                      </Typography>
                      <Box
                        variant="body2"
                        className={data?.status === "pending" ? "pending-color" : "approved-color"}
                      >
                        <Typography variant="body1">{data?.status}</Typography>
                      </Box>
                    </Box>
                    <Box>
                      <Typography variant="h5">
                        {data.name}
                      </Typography>
                    </Box>
                    <Box className={announceTop}>
                      <Typography className={announces} variant="body1">
                        {data.leaveType}
                      </Typography>
                      <Link to={`/dashboard/leaveRequests/${data._id}`}>
                        <Box className={rightIcon}>
                          <ArrowForwardIosOutlinedIcon fontSize="small" />
                        </Box>
                      </Link>
                    </Box>
                  </Box>
                </Box>
              </Box>
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