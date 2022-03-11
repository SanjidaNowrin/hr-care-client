import { Box, Container, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React from 'react';
import Attendance from './Attendance/Attendance';
import EmployeeIdCard from './EmployeeIdCard/EmployeeIdCard';
import LeaveRequest from './LeaveRequest/LeaveRequest';

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
                width: '40%',
                background: '#00D2FC',
                top: '43px',
                left: '0'
            },
            '&::after': {
                content: '""',
                position: 'absolute',
                height: '3px',
                width: '20%',
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
                <Typography className="section_title" variant="h4">
                    Our Main Features
                </Typography>
            </Box>

            <Attendance></Attendance>
            <LeaveRequest></LeaveRequest>
            <EmployeeIdCard></EmployeeIdCard>
        </Container>
    );
};

export default MainFeatures;