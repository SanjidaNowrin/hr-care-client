import { Paper, Box, Grid, Typography } from '@mui/material';
import React from 'react';
import { makeStyles } from '@mui/styles';
import OfflineBoltIcon from '@mui/icons-material/OfflineBolt';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import DynamicFeedIcon from '@mui/icons-material/DynamicFeed';
import BeenhereIcon from '@mui/icons-material/Beenhere';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
// Import Swiper React components
import { Card, CardContent } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "../../Swiper/Swipper.css";
import { EffectCoverflow, Pagination } from "swiper";

const LeaveRequest = () => {
    const useStyle = makeStyles({
        topText: {
            textTransform: 'capitalize',
            fontWeight: '400 !important',
            color: '#845EC2',
            fontFamily: 'var(--PT_font) !important',
        },
        sectionTitle: {
            textTransform: 'capitalize',
            fontWeight: '600 !important',
            padding: '20px 0'
        },
        pText: {
            textTransform: 'capitalize',
            fontWeight: '400 !important',
            fontFamily: 'var(--PT_font) !important',
            color: 'var(--pt_color)',
            width: '90%'
        },
        iconWrap: {
            width: '30px !important',
            height: '30px !important',
            background: '#00D2FC !important',
        },
        listText: {
            position: 'relative',
            left: '-15px',
            fontSize: '1.2rem !important',
            color: 'var(--p_color) !important'
        },
        featureCard: {
            textAlign: 'center',
            padding: '10px 0',
            border: '1px solid #F2F2F2',
            background: '#F2F2F2 !important',
            boxShadow: '0px 7px 15px rgb(0, 0, 0, .3) !important',
            color: '#000 !important'
        },
        cardBox: {
          background: "#FFFFFF !important",
          textAlign: "center",
          paddingTop: "20px",
          transition: "all .3s !important",
          cursor: "pointer",
        },
    })
    const { topText, sectionTitle, pText, cardBox,featureCard } = useStyle();

    var slideImg = [
        {
            id: "01",
            img: "https://i.ibb.co/2Yn1L7p/leave2.webp"
        },
        {
            id: "02",
            img: "https://i.ibb.co/pyC9kjv/leave3.webp"
        }
    ]
    return (
        <Box sx={{ py: 8 }}>
            <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
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
                    <img src="https://i.ibb.co/2Yn1L7p/leave2.webp" />
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
                    <img src="https://i.ibb.co/pyC9kjv/leave3.webp" />
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
                    <img src="https://i.ibb.co/2Yn1L7p/leave2.webp" />
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
                    <img src="https://i.ibb.co/pyC9kjv/leave3.webp" />
                  </CardContent>
                </Card>
              </SwiperSlide>
            </Swiper>
                </Grid>

                <Grid item xs={12} md={6} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'conter' }}>
                    <Box>
                        <Typography className={topText} variant="h6">Leave Requests</Typography>
                        <Typography variant="h4" className={sectionTitle}>
                            Every employee can request his leave
                        </Typography>
                        <Typography variant="body1" className={pText}>
                            An employee can submit different types of leave applications. Different types of leaves are casual, sick, earn, maternity, married, etc. Admin can be granted employees leave or cancel leave.
                        </Typography>

                        <Box sx={{ mr: 6, mt: 4 }}>
                            <Grid container spacing={{ xs: 2, sm: 3, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                                <Grid item xs={2} sm={4} md={6}>
                                    <Paper className={featureCard}>
                                        <OfflineBoltIcon sx={{ color: 'var(--p_color)' }} fontSize="large" />

                                        <Typography sx={{ fontWeight: '600' }} variant='body1'>
                                            Employee submit <br /> request.
                                        </Typography>
                                    </Paper>
                                </Grid>

                                <Grid item xs={2} sm={4} md={6}>
                                    <Paper className={featureCard}>
                                        <DynamicFeedIcon sx={{ color: 'var(--p_color)' }} fontSize="large" />

                                        <Typography sx={{ fontWeight: '600' }} variant='body1'>
                                            Multiple vacation <br /> options.
                                        </Typography>
                                    </Paper>
                                </Grid>

                                <Grid item xs={2} sm={4} md={6}>
                                    <Paper className={featureCard}>
                                        <BeenhereIcon sx={{ color: 'var(--p_color)' }} fontSize="large" />

                                        <Typography sx={{ fontWeight: '600' }} variant='body1'>
                                            Admin granted <br /> leave.
                                        </Typography>
                                    </Paper>
                                </Grid>

                                <Grid item xs={2} sm={4} md={6}>
                                    <Paper className={featureCard}>
                                        <HighlightOffIcon sx={{ color: 'var(--p_color)' }} fontSize="large" />

                                        <Typography sx={{ fontWeight: '600' }} variant='body1'>
                                            Admin cancel <br /> leave.
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

export default LeaveRequest;