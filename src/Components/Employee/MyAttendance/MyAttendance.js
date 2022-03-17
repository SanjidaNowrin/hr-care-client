import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import { Container } from "@mui/material";
import { Grid } from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@mui/material/Typography";
import Timeline from "@material-ui/lab/Timeline";
import TimelineItem from "@material-ui/lab/TimelineItem";
import TimelineSeparator from "@material-ui/lab/TimelineSeparator";
import TimelineConnector from "@material-ui/lab/TimelineConnector";
import TimelineContent from "@material-ui/lab/TimelineContent";
import TimelineDot from "@material-ui/lab/TimelineDot";
import useAuth from "../../../hooks/useAuth";
import TimelineOppositeContent from "@material-ui/lab/TimelineOppositeContent";
import Paper from "@material-ui/core/Paper";
import TimerTwoToneIcon from "@material-ui/icons/TimerTwoTone";
import PauseCircleFilledTwoToneIcon from "@material-ui/icons/PauseCircleFilledTwoTone";
import PlayCircleFilledWhiteTwoToneIcon from "@material-ui/icons/PlayCircleFilledWhiteTwoTone";
import Swal from "sweetalert2";
import { QrReader } from "react-qr-reader";
import { emphasize, styled } from "@mui/material/styles";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Chip from "@mui/material/Chip";
import HomeIcon from "@mui/icons-material/Home";
import { Link } from "react-router-dom";
import dateFormat from "../../Share/DateFormat/dateFormat";

const MyAttendance = (props) => {
  const { user } = useAuth();
  const [times, setTimes] = useState([]);
  const [today, setToday] = useState({});
  const [employee, setEmployee] = useState({});

  let time = new Date().toLocaleString();
  useEffect(() => {
    fetch(
      `https://ancient-thicket-61342.herokuapp.com/attendance/${user.email}`
    )
      .then((res) => res.json())
      .then((data) => setTimes(data.result));
  }, [user.email, times]);

  const todaydate = dateFormat(time.split(",")[0], "yyyy-MM-dd");
  useEffect(() => {
    const foundToday = times.find((time) => time.date === todaydate);
    setToday(foundToday);
  }, [times, todaydate]);
  // console.log(today?.date)

  useEffect(() => {
    fetch(`https://ancient-thicket-61342.herokuapp.com/employees/${user.email}`)
      .then((res) => res.json())
      .then((data) => setEmployee(data.result));
  }, [user.email]);

  //punchin
  const handlePunchIn = () => {
    let entryTime = {};
    entryTime.ID = employee[0]?.ID;
    entryTime.name = employee[0]?.name;
    entryTime.email = user.email;
    entryTime.date = dateFormat(time.split(",")[0], "yyyy-MM-dd");
    entryTime.entry = time.split(",")[1];
    entryTime.leave = "";
    entryTime.status = "Present";

    if (today?.date === entryTime.date) {
      Swal.fire("You already Punched In");
    } else {
      fetch("https://ancient-thicket-61342.herokuapp.com/attendance/", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(entryTime),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.insertedId) {
            console.log(data);
          }
        });
      Swal.fire("You are Punched IN");
    }
  };

  // punchout button

  const handlePunchOut = () => {
    let leaveTime = {};
    leaveTime.date = dateFormat(time.split(",")[0], "yyyy-MM-dd");
    if (today?.date === leaveTime.date) {
      fetch(
        `https://ancient-thicket-61342.herokuapp.com/attendance/${today._id}`,
        {
          method: "PUT",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(leaveTime),
        }
      )
        .then((res) => res.json())
        .then((data) => console.log(data));
      Swal.fire("You are Punched Out");
      console.log(leaveTime);
    } else {
      Swal.fire("At first Punch IN");
    }
  };

  const [findPerson, setFindPerson] = useState(() => {
    const saved = sessionStorage.getItem("items");
    const initialValue = JSON.parse(saved);
    return initialValue || "";
  });
  sessionStorage.setItem("items", JSON.stringify(findPerson));
  const useStyles = makeStyles((theme) => ({
    paper: {
      padding: "6px 16px",
    },
    secondaryTail: {
      backgroundColor: theme.palette.secondary.main,
    },
    cardStyle: {
      boxShadow: "2px 15px 15px #F2F2F2 !important",
    },
    timeFont: {
      fontSize: "13px !important",
      fontWeight: "bold",
      marginLeft: "3px",
    },
    imgStyle: {
      borderRadius: "50% !important",
      width: "50% !important",
      margin: "40px auto 20px",
    },
    qrImage: {
      "&:hover": {
        transform: "scale(1.3)",
        marginLeft: "1.5rem !important",
        margin: "0 auto !important",
      },
    },
  }));
  const classes = useStyles();

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
  console.log(findPerson)
  return (
    <Container>
      {/* Breadcrumbs */}
      <Box sx={{ mb: 1 }}>
        <Typography
          sx={{ mt: 2, color: "var(--p_color) !important" }}
          variant="h4"
        >
          Daily Attendance
        </Typography>
        <Breadcrumbs aria-label="breadcrumb">
          <Link to="/dashboard">
            <StyledBreadcrumb
              to="/dashboard"
              label="Dashboard"
              icon={<HomeIcon fontSize="small" />}
            />
          </Link>
          <Link to="/dashboard/attendance">
            <StyledBreadcrumb component="a" href="#" label="Attendance" />
          </Link>
        </Breadcrumbs>
      </Box>

<<<<<<< HEAD
      <Grid container spacing={4}>
        {findPerson ? (
          <Grid container item xs={12} md={6} mt={3}>
            {user?.email == findPerson ? (
=======
      <Grid container >
        <Grid container item xs={12} md={6} mt={3}>
          {user?.email === findPerson ? (
            <Grid item xs={12} md={12} mt={3}>
>>>>>>> 1fa3645bd2745d1231620cb069d0d0bb43bb51b8
              <Card className={classes.cardStyle}>
                <CardActionArea>
                  <CardMedia
                    className={classes.imgStyle}
                    align="center"
                    component="img"
                    src={`data:image/jpeg;base64,${employee[0]?.photo}`}
                  />
                  <CardContent>
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="h3"
                      align="center"
                    >
                      {user.displayName}
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions
                  style={{ justifyContent: "center", marginBottom: "10px" }}
                >
                  <Button onClick={handlePunchIn} className="btn_regular">
                    Punch In
                  </Button>
                  <Button
                    onClick={handlePunchOut}
                    size="small"
                    className="btn_regular"
                  >
                    Punch Out
                  </Button>
                </CardActions>
              </Card>
<<<<<<< HEAD
            ) : (
              ""
            )}
          </Grid>
        ) : (
          <Grid item xs={12} md={6}>
            <Box mt={3} mb={2} sx={{ display: "flex", alignItems: "center" }}>
              <Typography variant="h6">
                <span style={{ color: "red" }}>*</span> Scan by QRCode
              </Typography>
=======
            </Grid>
          ) : (
            <Grid item xs={12} md={12} mt={3}>
              <Box mt={3} mb={2} sx={{ display: "flex", alignItems: "center" }}>
                <Typography variant="h6">
                  <span style={{ color: "red" }}>*</span> Scan by QRCode
                </Typography>
>>>>>>> 1fa3645bd2745d1231620cb069d0d0bb43bb51b8

                <a
                  href={`data:image/jpeg;base64,${employee[0]?.qrUrl.split(",")[1]
                    }`}
                  download
                >
                  <img
                    className={classes.qrImage}
                    width="30% !important"
                    src={`data:image/jpeg;base64,${employee[0]?.qrUrl.split(",")[1]
                      }`}
                    alt="Employee QrCode"
                  />
                </a>
              </Box>
              <Card className={classes.cardStyle}>
                <CardActionArea>
                  <CardContent>
                    {findPerson ? (
                      <h4 style={{ fontWeight: "500", textAlign: "center" }}>
                        <span
                          style={{
                            color: "green",
                            marginTop: "0px",
                            marginBottom: "0px",
                          }}
                        >
                          Verified Successfully!
                        </span>{" "}
                        {user.displayName}
                      </h4>
                    ) : (
                      <h3
                        style={{
                          color: "red",
                          fontWeight: "500",
                          textAlign: "center",
                          marginTop: "0px",
                          marginBottom: "0px",
                        }}
                      >
<<<<<<< HEAD
                        Verified Successfully!
                      </span>
                      {user.displayName}
                    </h4>
                  ) : (
                    <h3
                      style={{
                        color: "red",
                        fontWeight: "500",
                        textAlign: "center",
                        marginTop: "0px",
                        marginBottom: "0px",
=======
                        Not Verified yet !!
                      </h3>
                    )}
                    <QrReader
                      onResult={(result, error) => {
                        if (!!result) {
                          setFindPerson(result?.text);
                        }
                        if (!!error) {
                          console.info(error);
                        }
>>>>>>> 1fa3645bd2745d1231620cb069d0d0bb43bb51b8
                      }}
                    />
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          )}
        </Grid>

        <Grid item xs={12} md={6} mt={5}>
          {/* timeline activities */}
          <Typography
            align="center"
            sx={{ textAlign: "center !important", fontWeight: "400" }}
            variant="h4"
          >
            Todays <span style={{ color: " #01578A" }}>Activities</span>
          </Typography>
          <Timeline align="alternate">
            <TimelineItem>
              <TimelineOppositeContent>
                <Typography variant="body2" color="textSecondary">
                  Punch In at
                </Typography>
              </TimelineOppositeContent>
              <TimelineSeparator>
                <TimelineDot>
                  <PauseCircleFilledTwoToneIcon />
                </TimelineDot>
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent>
                {/* punchIn */}
                <Paper elevation={3} className={classes.paper}>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <TimerTwoToneIcon />
                    <Typography className={classes.timeFont}>
                      {today?.entry}
                    </Typography>
                  </Box>
                </Paper>
              </TimelineContent>
            </TimelineItem>
            <TimelineItem>
              <TimelineOppositeContent>
                <Typography variant="body2" color="textSecondary">
                  Punch Out at
                </Typography>
              </TimelineOppositeContent>
              <TimelineSeparator>
                <TimelineDot color="primary">
                  <PlayCircleFilledWhiteTwoToneIcon />
                </TimelineDot>
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent>
                <Paper elevation={3} className={classes.paper}>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <TimerTwoToneIcon />
                    <Typography className={classes.timeFont}>
                      {today?.leave}
                    </Typography>
                  </Box>
                </Paper>
              </TimelineContent>
            </TimelineItem>
          </Timeline>
        </Grid>
      </Grid>
      {/* trial */}
    </Container>
  );
};

export default MyAttendance;
