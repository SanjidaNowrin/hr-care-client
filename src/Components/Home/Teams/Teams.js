import { Container, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState, useEffect } from "react";
import Team from "./Team/Team";
import Navbar from "./../../Share/Navbar/Navbar";
import Footer from "./../../Share/Footer/Footer";

const Teams = () => {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    fetch("./teamData.json")
      .then((res) => res.json())
      .then((data) => setTeams(data));
  }, []);
  return (
    <>
      <Navbar />
      <Box sx={{ pt: 4 }}>
        <Typography
          sx={{ textAlign: "center", mb:4,fontWeight: "500" }}
          variant="h2"
        >
          Our <span style={{ color: " #01578A" }}>Team</span>
        </Typography>
        <Container>
          <Grid container spacing={4}>
            {teams.map((team) => (
              <Team key={team.id} team={team}></Team>
            ))}
          </Grid>
        </Container>
      </Box>
      <Footer />
    </>
  );
};

export default Teams;
