import { Button, Card, CardContent, CardMedia, Grid, Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";

import React from "react";
import "./Team.css";

const Team = ({ team }) => {
    const { name, developer, image, portfolio } = team;
    return (
        <Grid item xs={12} sm={6} md={4}>
            <Paper elevation={6}>
                <Card className="team-container" sx={{ maxWidth: 545 }}>
                    <CardMedia className="team-image" image={image} />

                    <CardContent className="team-box">
                        <Typography gutterBottom variant="h5" component="div">
                            {name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {developer}
                        </Typography>
                        <Button style={{ marginTop: "12px", marginBottom: "12px" }} className="btn_regular ">
                            <a href={portfolio}>Read More</a>
                        </Button>
                    </CardContent>
                </Card>
            </Paper>
        </Grid>
    );
};

export default Team;
