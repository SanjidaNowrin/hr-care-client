import { Card, CardContent, Container, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { Box } from '@mui/system';
import { makeStyles } from '@mui/styles';

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import SwiperCore, {
    Navigation, Autoplay, Pagination
} from 'swiper';
SwiperCore.use([Navigation, Autoplay, Pagination]);

const Features = () => {
    const [features, setFeatures] = useState([]);
    useEffect(() => {
        fetch('./features.json')
            .then(res => res.json())
            .then(data => setFeatures(data))
    }, [])
    const useStyle = makeStyles({
        cardBox: {
            background: '#FFFFFF !important',
            textAlign: 'center',
            paddingTop: '20px',
            transition: 'all .3s !important',
            cursor: 'pointer',
            '&:hover': {
                background: '#c3e4f7 !important'
            }
        },
        iconBox: {
            height: '100px',
            width: '100px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: 'auto',
            background: '#0000001c'
        }
    });
    const { cardBox, iconBox } = useStyle();

    return (
        <>
            <Box sx={{ py: 5, background: '#F2F2F2' }}>
                <Container>
                    <Swiper
                        loop={true} autoplay={{ delay: 3000, disableOnInteraction: false }} navigation={true}
                        slidesPerView={1}
                        spaceBetween={10}
                        pagination={false}
                        breakpoints={{
                            640: {
                                slidesPerView: 2,
                                spaceBetween: 20,
                            },
                            768: {
                                slidesPerView: 4,
                                spaceBetween: 30,
                            },
                            1024: {
                                slidesPerView: 4,
                                spaceBetween: 30
                            },
                        }}
                        modules={[Pagination]}
                        className="mySwiper"
                        style={{ padding: '25px 15px' }}
                    >
                        {
                            features.map(item =>
                                <SwiperSlide key={item.id}>
                                    <Card sx={{ my: 4 }} elevation={12} className={cardBox} sx={{ borderRadius: 10 }}>
                                        <Box className={iconBox}>
                                            <img style={{ width: '100%' }} src={item.img} alt="" />
                                        </Box>
                                        <CardContent>
                                            <Typography variant="h5" color="text.primary" gutterBottom>
                                                {item.title}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                {item.des}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </SwiperSlide>
                            )
                        }
                    </Swiper>
                </Container>
            </Box>
        </>
    );
};

export default Features;