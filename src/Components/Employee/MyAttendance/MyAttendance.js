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
import Typography from "@material-ui/core/Typography";
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
const MyAttendance = () => {
  const { user } = useAuth();
  const [times, setTimes] = useState([]);
  const [today, setToday] = useState({});

  let time = new Date().toLocaleString();
  useEffect(() => {
    fetch(
      `https://ancient-thicket-61342.herokuapp.com/attendance/${user.email}`
    )
      .then((res) => res.json())
      .then((data) => setTimes(data.result));
  }, [user.email, times]);

  const todaydate = time.split(",")[0];
  useEffect(() => {
    const foundToday = times.find((time) => time.date === todaydate);
    setToday(foundToday);
  }, [times, todaydate]);
  console.log(today?.date);

  //punchin
  const handlePunchIn = () => {
    let entryTime = {};
    entryTime.ID = 1;
    entryTime.email = user.email;
    entryTime.date = time.split(",")[0];
    entryTime.entry = time.split(",")[1];
    entryTime.leave = "";

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
          }
        });
      Swal.fire("You are Punched IN");
    }
  };

  // punchout button

  const handlePunchOut = () => {
    let leaveTime = {};
    leaveTime.date = time.split(",")[0];
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
    } else {
      Swal.fire("At first Punch IN");
    }
  };

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
  }));
  const classes = useStyles();
  console.log(today?._id);
  return (
    <Box mt={7}>
      <Container>
        <Grid container spacing={8}>
          <Grid item xs={12} md={6}>
            <Card className={classes.cardStyle}>
              <CardActionArea>
                <CardMedia
                  className={classes.imgStyle}
                  align="center"
                  component="img"
                  src={user.photoURL}
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
          </Grid>
          <Grid item xs={12} md={6}>
            {/* timeline */}
            <Typography
              align="center"
              mb={8}
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
      </Container>
    </Box>
  );
};

export default MyAttendance;
