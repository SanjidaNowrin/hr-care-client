import { Container, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import Footer from "./../../Share/Footer/Footer";
import Navbar from "./../../Share/Navbar/Navbar";
import Team from "./Team/Team";
import TeamAbout from "./TeamAbout/TeamAbout";

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
      <Box>
        <Box data-aos="fade-up" sx={{ pt: 12, mt: 4, textAlign: "center" }}>
          <Typography className="section_title" variant="h4">
            About Us
          </Typography>
        </Box>
        <Container>
          <TeamAbout></TeamAbout>
        </Container>
      </Box>
      <Box sx={{ mt: 8 }}>
        <Box data-aos="fade-down" sx={{ pb: 6, textAlign: "center" }}>
          <Typography className="section_title" variant="h4">
            Our Team
          </Typography>
        </Box>

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
