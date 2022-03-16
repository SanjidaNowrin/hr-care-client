import { Box, Container } from '@mui/material';
import React from 'react';
import VideoPlayer from "react-video-js-player"
import videoSrc from "../../../assets/video/hrcare.mp4"
import './HeroVideo.css'

const HeroVideo = () => {

    return (
        <Container>

            <Box sx={{ mt: 5 }} >
                <VideoPlayer src={videoSrc} height="450" />
            </Box>

        </Container>
    );
};

export default HeroVideo;