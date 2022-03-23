import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { Button, Container, Grid, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import { makeStyles } from "@mui/styles";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

// import required modules
import SwiperCore, { Navigation, Autoplay } from "swiper";
SwiperCore.use([Navigation, Autoplay]);

const Banner = () => {
  const [banner, setBanner] = useState([]);
  useEffect(() => {
    fetch("./banner.json")
      .then((res) => res.json())
      .then((data) => setBanner(data));
  }, []);

  const theme = useTheme();
  const useStyle = makeStyles({
    verticalCenter: {
      display: "flex",
      alignItems: "center",
      [theme.breakpoints.down("sm")]: {
        textAlign: "center !important",
      },
    },
    bannerTitle: {
      marginBottom: "20px !important",
      fontWeight: "600 !important",
      color: "#000",
      fontFamily: "var(--PT_font) !important",
    },
  });

  const { verticalCenter, bannerTitle } = useStyle();

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        mt: { xs: 12, sm: 12, md: 8 },
        pt: { xs: 6, sm: 12, md: 0 },
        mb: { xs: 12, sm: 12, md: 0 },
      }}
    >
      <Container>
        <Swiper
          loop={true}
          navigation={true}
          autoplay={{ delay: 6000, disableOnInteraction: false }}
          className="mySwiper"
        >
          {banner.map((item) => (
            <SwiperSlide key={item.title}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6} className={verticalCenter}>
                  <Box sx={{ mt: { sm: 12, md: 0 }, pt: { sm: 4, md: 0 } }}>
                    <Typography variant="h3" className={bannerTitle}>
                      {item.title}
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        mt: 1,
                        color: "var(--pt_color)",
                        fontFamily: "var(--PT_font)",
                      }}
                    >
                      {item.description}
                    </Typography>

                    <Box>
                      <Link to="/dashboard">
                        <Button
                          className="btn_regular"
                          sx={{
                            mt: 3,
                            borderRadius: "5px !important",
                            background: "#01578A !important",
                          }}
                        >
                          Let's Start
                        </Button>
                      </Link>
                      <a href="#video">
                        <Button
                          className="btn_regular"
                          sx={{
                            mt: 3,
                            ml: 2,
                            background: "transparent !important",
                            color: "#000 !important",
                            border: "1px solid #01578A !important",
                          }}
                        >
                          Watch Video
                        </Button>
                      </a>
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
                    justifyContent: "conter",
                  }}
                >
                  <Box sx={{ width: "100%" }}>
                    <img
                      src={item.img}
                      alt="banner"
                      border="0"
                      style={{ width: "100%" }}
                    />
                  </Box>
                </Grid>
              </Grid>
            </SwiperSlide>
          ))}
        </Swiper>
      </Container>
    </Box>
  );
};

export default Banner;
