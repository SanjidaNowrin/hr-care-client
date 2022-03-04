import { Avatar, Paper, Box, Grid, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import React from 'react';
import { makeStyles } from '@mui/styles';
import OfflineBoltIcon from '@mui/icons-material/OfflineBolt';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import StopCircleIcon from '@mui/icons-material/StopCircle';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const Attendance = () => {
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
            border: '1px solid #00D2FC',
            background: '#00D2FC !important',
            boxShadow: '0px 7px 15px rgb(0, 210, 252, .5) !important'
        }
    })
    const { topText, sectionTitle, pText, iconWrap, listText, featureCard } = useStyle();
    return (
        <Box sx={{ py: 8 }}>
            <Grid container spacing={2}>
                <Grid item xs={12} md={6} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'conter' }}>
                    <Box>
                        <Typography className={topText} variant="h6">Daily Attendance</Typography>
                        <Typography variant="h4" className={sectionTitle}>
                            Every employee given there Daily Attendance
                        </Typography>
                        <Typography variant="body1" className={pText}>
                            HR Software is system for company to maintain a database of their employers performance. Using this software, a company can manage their employer details, attendance, Leave, holidays, Salary, etc.
                        </Typography>

                        <Box sx={{ mr: 6, mt: 4 }}>
                            <Grid container spacing={{ xs: 2, sm: 3, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                                <Grid item xs={2} sm={4} md={6}>
                                    <Paper className={featureCard}>
                                        <OfflineBoltIcon sx={{ color: '#fff' }} fontSize="large" />

                                        <Typography variant='body1'>
                                            Faster attendance <br /> process.
                                        </Typography>
                                    </Paper>
                                </Grid>

                                <Grid item xs={2} sm={4} md={6}>
                                    <Paper className={featureCard}>
                                        <PlayCircleOutlineIcon sx={{ color: '#fff' }} fontSize="large" />

                                        <Typography variant='body1'>
                                            Punch In to start <br /> work.
                                        </Typography>
                                    </Paper>
                                </Grid>

                                <Grid item xs={2} sm={4} md={6}>
                                    <Paper className={featureCard}>
                                        <StopCircleIcon sx={{ color: '#fff' }} fontSize="large" />

                                        <Typography variant='body1'>
                                            Punch Out to end <br /> work.
                                        </Typography>
                                    </Paper>
                                </Grid>

                                <Grid item xs={2} sm={4} md={6}>
                                    <Paper className={featureCard}>
                                        <AccessTimeIcon sx={{ color: '#fff' }} fontSize="large" />

                                        <Typography variant='body1'>
                                            Calculate your work<br /> Time.
                                        </Typography>
                                    </Paper>
                                </Grid>
                            </Grid>
                        </Box>

                    </Box>
                </Grid>

                <Grid item xs={12} md={6}>
                    <Box>
                        <img style={{ width: '100%' }} src="https://i.ibb.co/X3NtB4g/HR-Care-1.png" alt="img" />
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Attendance;