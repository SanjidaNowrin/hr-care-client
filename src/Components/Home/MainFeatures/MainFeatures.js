import { Box, Container, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React from 'react';
import Attendance from './Attendance/Attendance';

const MainFeatures = () => {
    const useStyle = makeStyles({
        topTitle: {
            position: 'relative',
            textAlign: 'center',
            fontFamily: 'var(--PT_font) !important',
            display: 'inline-block',
            '&::before': {
                content: '""',
                position: 'absolute',
                height: '3px',
                width: '120px',
                background: '#00D2FC',
                top: '43px',
                left: '0'
            },
            '&::after': {
                content: '""',
                position: 'absolute',
                height: '3px',
                width: '70px',
                background: '#845EC2',
                top: '43px',
                left: '118px'
            }
        }
    });

    const { topTitle } = useStyle();

    return (
        <Container>
            <Box sx={{ pt: 8, textAlign: 'center', }}>
                <Typography className={topTitle} variant="h4">
                    Our Main Features
                </Typography>
            </Box>
            <Attendance></Attendance>
            <h1>MainFeatures comming</h1>
        </Container>
    );
};

export default MainFeatures;