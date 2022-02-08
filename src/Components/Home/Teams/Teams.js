import { Container, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState, useEffect } from "react";
import Team from "../Team/Team";

const Teams = () => {
    const [teams, setTeams] = useState([]);

    useEffect(() => {
        fetch("./teamData.json")
            .then((res) => res.json())
            .then((data) => setTeams(data));
    }, []);
    return (
        <Box>
            <Typography style={{ textAlign: "center", margin: "40px" }} variant="h2">
                Our <span style={{ color: " #ff6f91" }}>Team</span>
            </Typography>
            <Container>
                <Grid container spacing={4}>
                    {teams.map((team) => (
                        <Team key={team.id} team={team}></Team>
                    ))}
                </Grid>
            </Container>
        </Box>
    );
};

export default Teams;
