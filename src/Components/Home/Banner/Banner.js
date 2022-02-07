import React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { Typography, Button, Container } from "@mui/material";
const Banner = () => {
  const verticalCenter = {
    display: "flex",
    alignItems: "center",
    height: 400,
  };
  return (
    <div>
      <Container>
        <Grid container spacing={8}>
          <Grid
            item
            xs={12}
            md={6}
            style={{ ...verticalCenter, textAlign: "left" }}
          >
            <Box>
              <Typography variant="h4" sx={{ textTransform: "uppercase" }}>
                The Right candidate for our <br />
                Business
              </Typography>
              <p style={{ color: "gray" }}>
                HR Care is system for company to maintain a database of their
                employers performance.
              </p>
              <Button
                variant="contained"
                style={{ backgroundColor: "#2A4CC4", marginTop: "10px" }}
              >
                Get Started
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <img
              src="https://i.ibb.co/52VcGBf/banner.png"
              alt="banner"
              border="0"
              style={{ height: "60vh", width: "100%" }}
            />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Banner;
