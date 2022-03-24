import { Paper, Box, Grid, Typography } from "@mui/material";
import React from "react";
import { makeStyles } from "@mui/styles";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import DownloadForOfflineOutlinedIcon from "@mui/icons-material/DownloadForOfflineOutlined";
import DynamicFormOutlinedIcon from "@mui/icons-material/DynamicFormOutlined";
import SyncAltOutlinedIcon from "@mui/icons-material/SyncAltOutlined";

const EmployeeIdCard = () => {
  const useStyle = makeStyles({
    topText: {
      textTransform: "capitalize",
      fontWeight: "400 !important",
      color: "#845EC2",
      fontFamily: "var(--PT_font) !important",
    },
    sectionTitle: {
      textTransform: "capitalize",
      fontWeight: "600 !important",
      padding: "20px 0",
    },
    pText: {
      textTransform: "capitalize",
      fontWeight: "400 !important",
      fontFamily: "var(--PT_font) !important",
      color: "var(--pt_color)",
      width: "90%",
    },
    featureCard: {
      textAlign: "center",
      padding: "10px 0",
      border: "1px solid #fff",
      background: "#fff !important",
      boxShadow: "0px 7px 20px rgb(0, 0, 0, .2) !important",
      color: "#000 !important",
      transition: "all .3s !important",
      cursor: "pointer",
      "&:hover": {
        background: "#c3e4f7 !important",
        border: "1px solid #c3e4f7",
        boxShadow: "0px 7px 20px rgb(195, 228, 247, .8) !important",
      },
    },
  });
  const { topText, sectionTitle, pText, featureCard } = useStyle();

  return (
    <Box sx={{ py: 8 }}>
      <Grid container spacing={4} style={{ overflowX: "hidden" }}>
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "conter",
          }}
        >
          <Box data-aos="zoom-in-right">
            <img
              style={{ width: "100%" }}
              src="https://i.ibb.co/DM8xDNR/id-card.jpg"
              alt="EmployeeIdCard"
            />
          </Box>
        </Grid>

        <Grid
          item
          xs={12}
          md={6}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "conter",
          }}
        >
          <Box data-aos="zoom-in-left">
            <Typography className={topText} variant="h6">
              Employee ID Card
            </Typography>
            <Typography variant="h4" className={sectionTitle}>
              Every employee will get their company ID card
            </Typography>
            <Typography variant="body1" className={pText}>
              Employee ID cards help to increase security due to the magnetic
              scanning strips on the back of the cards, can make clocking in and
              out easier, helps to simplify scheduling and makes transitions.
              Employee ID cards benefit not only your business and it's
              employees, but your customers as well.
            </Typography>

            <Box sx={{ mr: { md: 6 }, mt: 4 }}>
              <Grid
                container
                spacing={{ xs: 2, sm: 3, md: 3 }}
                columns={{ xs: 4, sm: 8, md: 12 }}
              >
                <Grid item xs={2} sm={4} md={6}>
                  <Paper className={featureCard}>
                    <PersonSearchIcon
                      sx={{ color: "var(--p_color)" }}
                      fontSize="large"
                    />

                    <Typography sx={{ fontWeight: "600" }} variant="body1">
                      Admin can find employee <br /> id card.
                    </Typography>
                  </Paper>
                </Grid>

                <Grid item xs={2} sm={4} md={6}>
                  <Paper className={featureCard}>
                    <DownloadForOfflineOutlinedIcon
                      sx={{ color: "var(--p_color)" }}
                      fontSize="large"
                    />

                    <Typography sx={{ fontWeight: "600" }} variant="body1">
                      PDF formate Download <br /> id card
                    </Typography>
                  </Paper>
                </Grid>

                <Grid item xs={2} sm={4} md={6}>
                  <Paper className={featureCard}>
                    <DynamicFormOutlinedIcon
                      sx={{ color: "var(--p_color)" }}
                      fontSize="large"
                    />

                    <Typography sx={{ fontWeight: "600" }} variant="body1">
                      Empolyee id card fully <br /> dynamic.
                    </Typography>
                  </Paper>
                </Grid>

                <Grid item xs={2} sm={4} md={6}>
                  <Paper className={featureCard}>
                    <SyncAltOutlinedIcon
                      sx={{ color: "var(--p_color)" }}
                      fontSize="large"
                    />

                    <Typography sx={{ fontWeight: "600" }} variant="body1">
                      Admin also update <br /> id card.
                    </Typography>
                  </Paper>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default EmployeeIdCard;
