import { Paper, Box, Grid, Typography } from "@mui/material";
import React from "react";
import { makeStyles } from "@mui/styles";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import DownloadForOfflineOutlinedIcon from "@mui/icons-material/DownloadForOfflineOutlined";
import DynamicFormOutlinedIcon from "@mui/icons-material/DynamicFormOutlined";
import SyncAltOutlinedIcon from "@mui/icons-material/SyncAltOutlined";
import { Card, CardContent } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "../../Swiper/Swipper.css";
import { EffectCoverflow, Pagination } from "swiper";

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
    iconWrap: {
      width: "30px !important",
      height: "30px !important",
      background: "#00D2FC !important",
    },
    listText: {
      position: "relative",
      left: "-15px",
      fontSize: "1.2rem !important",
      color: "var(--p_color) !important",
    },
    featureCard: {
      textAlign: "center",
      padding: "10px 0",
      border: "1px solid #F2F2F2",
      background: "#F2F2F2 !important",
      boxShadow: "0px 7px 15px rgb(0, 0, 0, .3) !important",
      color: "#000 !important",
    },
    cardBox: {
      background: "#FFFFFF !important",
      textAlign: "center",
      paddingTop: "20px",
      transition: "all .3s !important",
      cursor: "pointer",
    },
  });
  const {
    topText,
    sectionTitle,
    pText,
    iconWrap,
    listText,
    featureCard,
    cardBox,
  } = useStyle();

  var slideImg = [
    {
      id: "01",
      img: "https://i.ibb.co/ZgL7Gnc/id.webp",
    },
    {
      id: "02",
      img: "https://i.ibb.co/kxhPXNC/2id.webp",
    },
  ];
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

            <Box sx={{ mr: 6, mt: 4 }}>
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

        <Grid item xs={12} md={6}>
          <Box>
            <Swiper
              autoplay={{ delay: 3000, disableOnInteraction: false }}
              effect={"coverflow"}
              grabCursor={true}
              centeredSlides={true}
              slidesPerView={"auto"}
              coverflowEffect={{
                rotate: 50,
                stretch: 0,
                depth: 100,
                modifier: 1,
                slideShadows: true,
              }}
              pagination={true}
              modules={[EffectCoverflow, Pagination]}
              className="mySwiper"
            >
              <SwiperSlide className="features-slide">
                <Card
                  sx={{ my: 3 }}
                  elevation={12}
                  className={cardBox}
                  sx={{ borderRadius: 4 }}
                >
                  <CardContent>
                    <img src="https://i.ibb.co/ZgL7Gnc/id.webp" />
                  </CardContent>
                </Card>
              </SwiperSlide>
              <SwiperSlide className="features-slide">
                <Card
                  sx={{ my: 4 }}
                  elevation={12}
                  className={cardBox}
                  sx={{ borderRadius: 4 }}
                >
                  <CardContent>
                    <img src="https://i.ibb.co/kxhPXNC/2id.webp" />
                  </CardContent>
                </Card>
              </SwiperSlide>
              <SwiperSlide className="features-slide">
                <Card
                  sx={{ my: 4 }}
                  elevation={12}
                  className={cardBox}
                  sx={{ borderRadius: 4 }}
                >
                  <CardContent>
                    <img src="https://i.ibb.co/kxhPXNC/2id.webp" />
                  </CardContent>
                </Card>
              </SwiperSlide>
              <SwiperSlide className="features-slide">
                <Card
                  sx={{ my: 4 }}
                  elevation={12}
                  className={cardBox}
                  sx={{ borderRadius: 4 }}
                >
                  <CardContent>
                    <img src="https://i.ibb.co/ZgL7Gnc/id.webp" />
                  </CardContent>
                </Card>
              </SwiperSlide>
            </Swiper>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default EmployeeIdCard;
