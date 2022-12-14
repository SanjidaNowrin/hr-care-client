import { Paper, Box, Grid, Typography } from "@mui/material";
import React from "react";
import { makeStyles } from "@mui/styles";
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';
import HourglassBottomRoundedIcon from '@mui/icons-material/HourglassBottomRounded';
import DateRangeIcon from '@mui/icons-material/DateRange';
import FeedIcon from '@mui/icons-material/Feed';

const SalaryFeatures = () => {
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
      <Grid container spacing={4}>
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
          <Box>
            <Typography className={topText} variant="h6">
              Employees Salary Sheet
            </Typography>
            <Typography variant="h4" className={sectionTitle}>
              Generate monthly salary sheets
            </Typography>
            <Typography variant="body1" className={pText}>
              After processing all of the monthly tasks. Admin can generate salary sheet pdf format with all employees by their present, absent, leave, holiday, bank account etc necessary informations.
            </Typography>

            <Box sx={{ mr: { md: 6 }, mt: 4 }}>
              <Grid
                container
                spacing={{ xs: 2, sm: 3, md: 3 }}
                columns={{ xs: 4, sm: 8, md: 12 }}
              >
                <Grid item xs={2} sm={4} md={6}>
                  <Paper className={featureCard}>
                    <DownloadForOfflineIcon
                      sx={{ color: "var(--p_color)" }}
                      fontSize="large"
                    />

                    <Typography sx={{ fontWeight: "600" }} variant="body1">
                      Salary Sheet <br /> Downloadable
                    </Typography>
                  </Paper>
                </Grid>

                <Grid item xs={2} sm={4} md={6}>
                  <Paper className={featureCard}>
                    <HourglassBottomRoundedIcon
                      sx={{ color: "var(--p_color)" }}
                      fontSize="large"
                    />

                    <Typography sx={{ fontWeight: "600" }} variant="body1">
                      Counted by payable <br /> days
                    </Typography>
                  </Paper>
                </Grid>

                <Grid item xs={2} sm={4} md={6}>
                  <Paper className={featureCard}>
                    <DateRangeIcon
                      sx={{ color: "var(--p_color)" }}
                      fontSize="large"
                    />

                    <Typography sx={{ fontWeight: "600" }} variant="body1">
                      Filter by date <br /> range
                    </Typography>
                  </Paper>
                </Grid>

                <Grid item xs={2} sm={4} md={6}>
                  <Paper className={featureCard}>
                    <FeedIcon
                      sx={{ color: "var(--p_color)" }}
                      fontSize="large"
                    />

                    <Typography sx={{ fontWeight: "600" }} variant="body1">
                      Show all necessary
                      <br /> information
                    </Typography>
                  </Paper>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>

        <Grid
          item
          xs={12}
          md={6}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box>
            <img
              style={{ width: "100%" }}
              src="https://i.ibb.co/FgnJgDY/hrsalary-copy.png"
              alt="SalaryFeatures"
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SalaryFeatures;
