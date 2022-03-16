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
import SwiperCore, {
    Navigation, Autoplay
} from 'swiper';
SwiperCore.use([Navigation, Autoplay]);

const Banner = () => {
    const [banner, setBanner] = useState([]);
    useEffect(() => {
        fetch('./banner.json')
            .then(res => res.json())
            .then(data => setBanner(data))
    }, [])

    const theme = useTheme();
    const useStyle = makeStyles({
        verticalCenter: {
            display: "flex",
            alignItems: "center",
            [theme.breakpoints.down("sm")]: {
                textAlign: 'center !important'
            }
        },
        bannerTitle: {
            marginBottom: '20px !important',
            fontWeight: '600 !important',
            color: 'var(--p_color)'
        }
    })

    const { verticalCenter, bannerTitle } = useStyle();

    return (
        <Box sx={{ my: 8 }}>
            <Container>
                <Swiper
                    loop={true} autoplay={{ delay: 4000, disableOnInteraction: false }} navigation={true} className="mySwiper">
                    {
                        banner.map(item =>
                            <SwiperSlide key={item.id}>
                                <Grid container spacing={8}>
                                    <Grid item xs={12} md={6} className={verticalCenter}>
                                        <Box>
                                            <Typography variant="h3" className={bannerTitle}>
                                                {item.name}
                                            </Typography>
                                            <Typography variant="h5" style={{ color: '#845EC2', fontWeight: '400' }}>
                                                {item.title}
                                            </Typography>
                                            <Typography variant="body1" sx={{ mt: 1, color: 'var(--pt_color)', fontFamily: 'var(--PT_font)' }}>
                                                {item.description}
                                            </Typography>

                                            <Link to="/dashboard">
                                                <Button className="btn_regular" sx={{ mt: 3 }}>
                                                    Let's Start
                                                </Button>
                                            </Link>
                                        </Box>
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <Box>
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
                        )
                    }
                </Swiper>
            </Container>
        </Box>
    );
};

export default Banner;