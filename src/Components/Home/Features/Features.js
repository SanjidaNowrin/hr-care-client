import { Card, CardContent, Container, Grid, Typography } from '@mui/material';
import React from 'react';
import LaptopMacOutlinedIcon from '@mui/icons-material/LaptopMacOutlined';
import ViewInArOutlinedIcon from '@mui/icons-material/ViewInArOutlined';
import CodeOffOutlinedIcon from '@mui/icons-material/CodeOffOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { Box } from '@mui/system';
import { makeStyles } from '@mui/styles';

const Features = () => {
    const useStyle = makeStyles({
        cardBox: {
            background: '#ffe8e8 !important',
            textAlign: 'center',
            paddingTop: '20px',
            transition: 'all .3s !important',
            cursor: 'pointer',
            '&:hover': {
                background: '#fff !important'
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
        },
        icon: {
            color: '#845EC2',
            height: '60px !important',
            width: '60px !important',
            '&:hover': {
                color: '#fff !important'
            }
        }
    });

    const { cardBox, iconBox, icon } = useStyle();

    return (
        <Container>
            <Grid container spacing={4}>
                <Grid item xs={12} sm={6} md={3}>
                    <Card elevation={12} className={cardBox} sx={{ borderRadius: 10 }}>
                        <Box className={iconBox}>
                            <LaptopMacOutlinedIcon className={icon} fontSize='large' />
                        </Box>
                        <CardContent>
                            <Typography variant="h5" color="text.primary" gutterBottom>
                                Responsive Design
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Completely responsive, fully functional on ipads, iphones, tablets, and other mobile phones.
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                    <Card elevation={12} className={cardBox} sx={{ borderRadius: 10 }}>
                        <Box className={iconBox}>
                            <ViewInArOutlinedIcon className={icon} fontSize='large' />
                        </Box>
                        <CardContent>
                            <Typography variant="h5" color="text.primary" gutterBottom>
                                Advanced Features
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Advanced features tools like graphs, charts, invoices, video & audio call's, projects, etc.
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                    <Card elevation={12} className={cardBox} sx={{ borderRadius: 10 }}>
                        <Box className={iconBox}>
                            <CodeOffOutlinedIcon className={icon} fontSize='large' />
                        </Box>
                        <CardContent>
                            <Typography variant="h5" color="text.primary" gutterBottom>
                                Clean Codes
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Well tested, well documented and W3 validated code. Developers can take advantage immediately.
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                    <Card elevation={12} className={cardBox} sx={{ borderRadius: 10 }}>
                        <Box className={iconBox}>
                            <SearchOutlinedIcon className={icon} fontSize='large' />
                        </Box>
                        <CardContent>
                            <Typography variant="h5" color="text.primary" gutterBottom>
                                SEO Friendly
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                A SEO friendly website has certain features and characteristics that helps search engines.
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Features;