import { Box, Container, Grid, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";
import { Link } from "react-router-dom";
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import TwitterIcon from '@mui/icons-material/Twitter';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

const Footer = () => {
    const useStyle = makeStyles({
        footer: {
            background: 'var(--p_color)',
            marginTop: '60px',
            position: 'relative',
            color: 'white',
            '&::after': {
                position: 'absolute',
                content: '""',
                backgroundImage: 'url("https://i.ibb.co/pQYnnrH/footer-shape.png")',
                backgroundSize: 'cover',
                height: '53px',
                width: '100%',
                top: '0'
            }
        },
        socialIcon: {
            display: 'flex',
            marginTop: '20px'
        },
        iconItem: {
            background: 'transparent',
            border: '1px solid #fff',
            borderRadius: '50%',
            height: '40px',
            width: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 5px',
            transition: 'all .3s ease-in-out !important',
            '&:hover': {
                background: '#fff',
                '& $icon': {
                    color: 'var(--p_color)'
                }
            }
        },
        icon: {
            color: '#fff',
            transition: 'all .3s ease-in-out !important'
        },
        unorderList: {
            padding: '0',
            listStyle: 'none'
        },
        footerLink: {
            display: 'flex',
            alignItems: 'center',
            textTransform: 'capitalize',
            color: '#fff',
            position: 'relative',
            transform: 'translateX(0)',
            transition: 'all .3s ease-in-out !important',
            '&:hover': {
                transform: 'translateX(12px)',
                color: '#fff'
            }
        },
        spanStyle: {
            color: '#fff',
            fontWeight: '500'
        },
        copyRight: {
            textAlign: 'center',
            borderTop: '1px solid #fff',
            padding: '20px 0',
            background: 'var(--p_color)',
            marginTop: '20px',
            color: 'white',
            boxShadow: '0 0 30px 15px #0000004f'
        }
    })
    const { footer, socialIcon, iconItem, icon, footerLink, unorderList, spanStyle, copyRight } = useStyle();
    return (
        <Box className={footer}>
            <Container>
                <Box sx={{ pt: 12 }}>
                    <Grid container spacing={4}>
                        <Grid item xs={12} md={4}>
                            <Box className="single-ooter">
                                <Typography variant="h4" sx={{ mb: 2, fontWeight: '700', color: '#fff' }}>HR Care
                                </Typography>
                                <Typography variant="body1">
                                    This is Human resource management software which is also called Payroll software. Using this software, a company can manage their employer details, attendance, Leave, holidays, Salary, etc.
                                </Typography>
                                <Box className={socialIcon}>
                                    <a className={iconItem} href="#">
                                        <FacebookOutlinedIcon className={icon} fontSize='small' />
                                    </a>
                                    <a className={iconItem} href="#">
                                        <TwitterIcon className={icon} fontSize='small' />
                                    </a>
                                    <a className={iconItem} href="#">
                                        <GitHubIcon className={icon} fontSize='small' />
                                    </a>
                                    <a className={iconItem} href="#">
                                        <LinkedInIcon className={icon} fontSize='small' />
                                    </a>
                                </Box>
                            </Box>
                        </Grid>

                        <Grid item xs={12} md={2}>
                            <Box>
                                <Typography variant="h5" sx={{ mb: 2, fontWeight: '700', color: '#fff' }}>Quick Links
                                </Typography>
                                <ul className={unorderList}>
                                    <li>
                                        <Link className={footerLink} to="/">
                                            <ArrowRightIcon fontSize='large' /> home
                                        </Link>
                                    </li>
                                    <li>
                                        <Link className={footerLink} to="/">
                                            <ArrowRightIcon fontSize='large' /> Features
                                        </Link>
                                    </li>
                                    <li>
                                        <Link className={footerLink} to="/">
                                            <ArrowRightIcon fontSize='large' /> Team
                                        </Link>
                                    </li>
                                    <li>
                                        <Link className={footerLink} to="/">
                                            <ArrowRightIcon fontSize='large' />services
                                        </Link>
                                    </li>
                                    <li>
                                        <Link className={footerLink} to="/">
                                            <ArrowRightIcon fontSize='large' /> contact us
                                        </Link>
                                    </li>
                                </ul>
                            </Box>
                        </Grid>

                        <Grid item xs={12} md={2}>
                            <Box>
                                <Typography variant="h5" sx={{ mb: 2, fontWeight: '700', color: '#fff' }}>Supports
                                </Typography>
                                <ul className={unorderList}>
                                    <li>
                                        <Link className={footerLink} to="/">
                                            <ArrowRightIcon fontSize='large' /> Help
                                        </Link>
                                    </li>
                                    <li>
                                        <Link className={footerLink} to="/">
                                            <ArrowRightIcon fontSize='large' /> Videos
                                        </Link>
                                    </li>
                                    <li>
                                        <Link className={footerLink} to="/">
                                            <ArrowRightIcon fontSize='large' /> Terms of Use
                                        </Link>
                                    </li>
                                    <li>
                                        <Link className={footerLink} to="/">
                                            <ArrowRightIcon fontSize='large' /> Privacy Policy
                                        </Link>
                                    </li>
                                </ul>
                            </Box>
                        </Grid>

                        <Grid item xs={12} md={4}>
                            <Box>
                                <Typography variant="h5" sx={{ mb: 2, fontWeight: '700', color: '#fff' }}>Contact Us
                                </Typography>
                                <Box>
                                    <Typography variant="body1" sx={{ mb: 1 }}><span className={spanStyle}>Location:</span> 1750 kaliakoir, Gazipur <br /> Dhaka, Bangladesh</Typography>

                                    <Typography variant="body1" sx={{ mb: 1 }}><span className={spanStyle}>Email:</span> support@hrcare.com</Typography>

                                    <Typography variant="body1" sx={{ mb: 1 }}><span className={spanStyle}>Phone:</span> +044 0145 055</Typography>

                                    <Typography variant="body1"><span className={spanStyle}>Website:</span> www.hrcare.com</Typography>
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
            </Container>

            <Box className={copyRight}>
                <Typography variant="body1">&copy; 2022 All rights reserved by HR Care</Typography>
            </Box>
        </Box>
    );
};

export default Footer;
