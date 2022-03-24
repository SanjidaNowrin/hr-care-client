import {
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/system";
import React from "react";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import GitHubIcon from "@mui/icons-material/GitHub";

const Team = ({ team }) => {
  const { name, developer, image, portfolio, github, linkedIn } = team;
  const useStyle = makeStyles({
    cardContainer: {
      padding: "15px",
      borderRadius: "5px",
      border: "1px solid var(--p_color)",
      transition: "all .3s ease-in-out !important",
      "&:hover": {
        "& $cardBox": {
          background: "#c3e4f7 !important",
          transform: "translateY(-30px)",
        },
        "& $cardTitle": {
          color: "black",
        },
      },
    },
    cardImg: {
      height: "200px",
      width: "200px",
      borderRadius: "50%",
      margin: "40px auto 20px",
    },
    cardBox: {
      boxShadow: "0px 7px 15px rgb(0, 0, 0, .2) !important",
      background: "transparent !important",
      position: "relative",
      transition: "all .3s ease-in-out !important",
    },
    cardContent: {
      textAlign: "center",
    },
    cardTitle: {
      fontWeight: "700",
      color: "var(--p_color)",
      transition: "all .3s ease-in-out !important",
    },
  });

  const { cardContainer, cardImg, cardBox, cardContent, cardTitle } =
    useStyle();
  return (
    <Grid item xs={12} sm={6} md={4}>
      <Box className={cardContainer} data-aos="zoom-in-down">
        <Card className={cardBox}>
          <CardMedia className={cardImg} image={image} />
          <CardContent className={cardContent}>
            <Typography variant="h5" className={cardTitle}>
              {name}
            </Typography>

            <Typography
              variant="body1"
              sx={{ fontWeight: "600" }}
              color="text.secondary"
            >
              {developer}
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-evenly",
                my: 2,
              }}
            >
              <a target="_blank" rel="noreferrer" href={linkedIn}>
                <LinkedInIcon
                  fontSize="large"
                  sx={{ color: "var(--p_color) !important" }}
                />
              </a>
              <a target="_blank" rel="noreferrer" href={github}>
                <GitHubIcon
                  fontSize="large"
                  sx={{ color: "var(--p_color) !important" }}
                />
              </a>
              <a target="_blank" rel="noreferrer" href={portfolio}>
                <AccountCircleIcon
                  fontSize="large"
                  sx={{ color: "var(--p_color) !important" }}
                />
              </a>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Grid>
  );
};

export default Team;
