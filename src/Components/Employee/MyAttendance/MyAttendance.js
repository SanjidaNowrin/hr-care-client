import React, { useState } from "react";
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
const MyAttendance = () => {
  const [punchIn, setPunchIn] = useState([]);
  const [punchOut, setPunchOut] = useState([]);
  let time = new Date().toLocaleString();
  const handlePunchIn = () => {
    // const data=[time,user.email]
    setPunchIn(time);
    // console.log(data)
  };

  const handlePunchOut = () => {
    setPunchOut(time);
  };
  //console.log(punchOut);
  const { user } = useAuth();
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
      fontSize: "14px !important",
    },
    imgStyle: {
      borderRadius: "50% !important",
      width: "50% !important",
      margin: "40px auto 20px",
    },
  }));
  const classes = useStyles();

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
                <Button onClick={handlePunchIn}
                  style={{
                    background: "#00D2FC !important",
                    color: "#fff !important",
                    fontWeight: 'bold !important' 
                  }}
                  className="btn_regular"

                >
                  Punch In
                </Button>
                <Button
                  onClick={handlePunchOut}
                  size="small"
                  className="btn_regular"
                >
                  Punch Out
                </Button>
              </CardActions >
            </Card >
          </Grid >
          <Grid item xs={12} md={6}>
            {/* timeline */}
            <Typography
              align="center"
              mb={8}
              sx={{ textAlign: "center !important", fontWeight: "400" }}
              variant="h4"
            >
              All <span style={{ color: " #01578A" }}>Activities</span>
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
                  {/* punchin */}
                  <Paper elevation={3} className={classes.paper}>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <TimerTwoToneIcon />
                      <Typography className={classes.timeFont}>
                        {punchIn}
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
                        {punchOut}
                      </Typography>
                    </Box>
                  </Paper>
                </TimelineContent>
              </TimelineItem>
            </Timeline>
          </Grid>
        </Grid >
      </Container >
    </Box >
  );
};

export default MyAttendance;
