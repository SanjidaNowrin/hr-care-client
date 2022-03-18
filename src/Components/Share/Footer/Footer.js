/* eslint-disable jsx-a11y/iframe-has-title */
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";
import { Box, Container, Grid, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
    const useStyle = makeStyles({
        footer: {
            background: "#01578A",
            marginTop: "80px",
            position: "relative",
            color: "white",
            "&::after": {
                position: "absolute",
                content: '""',
                backgroundSize: "cover",
                height: "53px",
                width: "100%",
                top: "0",
            },
        },
        socialIcon: {
            display: "flex",
            marginTop: "20px",
        },
        iconItem: {
            background: "transparent",
            border: "1px solid #fff",
            borderRadius: "50%",
            height: "40px",
            width: "40px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 5px",
            transition: "all .3s ease-in-out !important",
            "&:hover": {
                background: "#fff",
                "& $icon": {
                    color: "#01578A",
                },
            },
        },
        icon: {
            color: "#fff",
            transition: "all .3s ease-in-out !important",
        },
        unorderList: {
            padding: "0",
            listStyle: "none",
        },
        footerLink: {
            display: "flex",
            alignItems: "center",
            textTransform: "capitalize",
            color: "#fff",
            position: "relative",
            transform: "translateX(0)",
            transition: "all .3s ease-in-out !important",
            "&:hover": {
                transform: "translateX(12px)",
                color: "#fff",
            },
        },
        spanStyle: {
            color: "#fff",
            fontWeight: "500",
        },
        copyRight: {
            textAlign: "center",
            borderTop: "1px solid #fff",
            padding: "20px 0",
            background: "#01578A",
            marginTop: "20px",
            color: "white",
            boxShadow: "0 0 30px 15px #0000004f",
        },
    });
    const { footer, socialIcon, iconItem, icon, footerLink, unorderList, copyRight } = useStyle();
    return (
        <Box className={footer}>
            <Container>
                <Box>
                    <Grid container spacing={4}>
                        <Grid item xs={12} md={4}>
                            <Box className="single-ooter">
                                <Link to="/">
                                    <img
                                        src="https://i.ibb.co/7KZFxyc/hr-care-logo.png"
                                        alt="hr care"
                                        style={{ width: '200px' }}
                                    />
                                </Link>
                                <Typography sx={{ mt: 1 }} variant="body1">
                                    This is Human resource management software which is also called Payroll software. Using this software, a
                                    company can manage their employer details, attendance, Leave, holidays, Salary, etc.
                                </Typography>
                                <Box className={socialIcon}>
                                    <a className={iconItem} href="#">
                                        <FacebookOutlinedIcon className={icon} fontSize="small" />
                                    </a>
                                    <a className={iconItem} href="#">
                                        <TwitterIcon className={icon} fontSize="small" />
                                    </a>
                                    <a className={iconItem} href="#">
                                        <GitHubIcon className={icon} fontSize="small" />
                                    </a>
                                    <a className={iconItem} href="#">
                                        <LinkedInIcon className={icon} fontSize="small" />
                                    </a>
                                </Box>
                            </Box>
                        </Grid>

                        <Grid item xs={12} md={1}></Grid>

                        <Grid item xs={12} md={3}>
                            <Box>
                                <Typography variant="h5" sx={{ mb: 2, fontWeight: "700", color: "#fff" }}>
                                    Quick Links
                                </Typography>
                                <Box>
                                    <ul className={unorderList}>
                                        <li>
                                            <Link className={footerLink} to="/dashboard/myinfo">
                                                <ArrowRightIcon fontSize="large" /> My Information
                                            </Link>
                                        </li>
                                        <li>
                                            <Link className={footerLink} to="/dashboard/attendance">
                                                <ArrowRightIcon fontSize="large" /> Attendance
                                            </Link>
                                        </li>
                                        <li>
                                            <Link className={footerLink} to="/dashboard/announcements">
                                                <ArrowRightIcon fontSize="large" /> Announcement
                                            </Link>
                                        </li>
                                        <li>
                                            <Link className={footerLink} to="/dashboard/course">
                                                <ArrowRightIcon fontSize="large" />
                                                Course
                                            </Link>
                                        </li>
                                        <li>
                                            <Link className={footerLink} to="/dashboard/leave">
                                                <ArrowRightIcon fontSize="large" /> Leave
                                            </Link>
                                        </li>
                                    </ul>
                                </Box>
                            </Box>
                        </Grid>

                        {/* <Grid item xs={12} md={1}></Grid> */}

                        <Grid item xs={12} md={4}>
                            <Box>
                                <Typography variant="h5" sx={{ mb: 2, fontWeight: "700", color: "#fff" }}>
                                    Arrive at our Location
                                </Typography>
                                {/* using google maps  */}
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3652.2637669988117!2d90.4073473142542!3d23.737971695169474!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b8f4c4ce997f%3A0x94d6ee997ccd5010!2sHR%20Bhaban%2C%2026%2F1%2C%20Kakrail%20Road%2C%20Dhaka-1000%2C%20Bangladesh%2C%20Bir%20Uttam%20Samsul%20Alam%20Rd%2C%20Dhaka%201000!5e0!3m2!1sen!2sbd!4v1647339371577!5m2!1sen!2sbd"
                                    width="100%"
                                    height="100%"
                                ></iframe>
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
