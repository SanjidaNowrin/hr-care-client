import { Avatar, Box, Grid, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import React from 'react';
import { makeStyles } from '@mui/styles';

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
        }
    })
    const { topText, sectionTitle, pText, iconWrap, listText } = useStyle();
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

                        {/* list item */}
                        <List sx={{ mt: 2 }}>
                            <ListItem sx={{ py: 0 }}>
                                <ListItemAvatar>
                                    <Avatar className={iconWrap}>
                                        <CheckIcon fontSize="medium" />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText>
                                    <Typography className={listText} variant="body1">
                                        Faster attendance process.
                                    </Typography>
                                </ListItemText>
                            </ListItem>

                            <ListItem sx={{ py: 0 }}>
                                <ListItemAvatar>
                                    <Avatar className={iconWrap}>
                                        <CheckIcon fontSize="medium" />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText>
                                    <Typography className={listText} variant="body1">
                                        Punch In to start work.
                                    </Typography>
                                </ListItemText>
                            </ListItem>

                            <ListItem sx={{ py: 0 }}>
                                <ListItemAvatar>
                                    <Avatar className={iconWrap}>
                                        <CheckIcon fontSize="medium" />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText>
                                    <Typography className={listText} variant="body1">
                                        Punch Out to end work.
                                    </Typography>
                                </ListItemText>
                            </ListItem>

                            <ListItem sx={{ py: 0 }}>
                                <ListItemAvatar>
                                    <Avatar className={iconWrap}>
                                        <CheckIcon fontSize="medium" />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText>
                                    <Typography className={listText} variant="body1">
                                        Punch In to start work.
                                    </Typography>
                                </ListItemText>
                            </ListItem>
                        </List>
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