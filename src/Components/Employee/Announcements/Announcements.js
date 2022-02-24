import { Container, Grid, Paper, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Announcement from "./Announcement/Announcement";

const Announcements = () => {
  const useStyle = makeStyles({
    announceBox: {
      border: "1.5px solid white",
      padding: "8px",
      borderRadius: "5px",
      marginBottom: "10px",
      "&:hover": {
        border: "1.5px solid #009EFA",
      },
    },
    dateStyle: {
      position: "relative",
      color: "gray",
      top: "-5px",
    },
  });

  const { announceBox, dateStyle } = useStyle();

  const [data, setData] = useState([]);
  console.log(data);
  useEffect(() => {
    fetch("https://ancient-thicket-61342.herokuapp.com/announcement")
      .then((res) => res.json())
      .then((data) => setData(data.data));
  }, []);
  return (
    <div>
      <Typography
        sx={{ textAlign: "center", margin: "40px", color: "#01578A" }}
        variant="h3"
      >
        Announcements
      </Typography>
      <Container>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            {data?.map((data) => (
              <Link to={`/dashboard/announcements/${data._id}`}>
                <Paper elevation={6}>
                  <Box key={data._id} className={announceBox}>
                    <Typography sx={{ color: "#01578A" }} variant="h6">
                      #{data.title}
                    </Typography>

                    <span className={dateStyle}>{data.date}</span>
                    <Typography>{data?.text.slice(0, 40)}</Typography>
                  </Box>
                </Paper>
              </Link>
            ))}
          </Grid>
          <Grid item xs={12} md={6}>
            <Announcement data={data}></Announcement>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Announcements;
