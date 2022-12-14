/* eslint-disable jsx-a11y/iframe-has-title */
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";
import { Box, Container, Grid, Paper, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";
import { Link } from "react-router-dom";
import InstagramIcon from "@mui/icons-material/Instagram";
import LanguageIcon from "@mui/icons-material/Language";
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
      alignItems: "center",
      justifyContent: "center",
      margin: "auto",
    },
    iconItem: {
      background: "transparent",
      border: "1px solid #fff",
      borderRadius: "50%",
      height: "50px",
      width: "50px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      transition: "all .3s ease-in-out !important",
    },
    icon: {
      color: "#fff",
      transition: "all .3s ease-in-out !important",
    },
    unorderList: {
      padding: "0",
      listStyle: "none",
      textAlign: "left",
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
    featureCard: {
      transition: "all .3s !important",
      cursor: "pointer",
      paddingRight: "1.5rem",
      "&:hover": {
        "& $iconItem": {
          background: "#fff !important",
          "& $icon": {
            color: "#01578A",
            transform: "scale(1.2)",
            transition: "all .3s ease-in-out !important",
          },
        },
      },
    },
  });
  const {
    featureCard,
    footer,
    socialIcon,
    iconItem,
    icon,
    footerLink,
    unorderList,
    copyRight,
  } = useStyle();
  return (
    <Box className={footer}>
      <Container>
        <Box>
          <Grid container spacing={4}>
            <Grid item xs={12} md={5}>
              <Box className="single-ooter">
                <Link to="/">
                  <img
                    src="https://i.ibb.co/7KZFxyc/hr-care-logo.png"
                    alt="hr care"
                    style={{ width: "200px" }}
                  />
                </Link>
                <Typography sx={{ mt: 1 }} variant="body1">
                  This is Human resource management software which is also
                  called software.HRM is often referred to simply as human
                  resources. Using this software, a company can manage their
                  employer details.A company is only as good as its employees,
                  making HRM a crucial part of maintaining or improving the
                  health of the business Leave, holidays, Salary, etc.
                </Typography>
              </Box>
            </Grid>
            {/* Quicks links section  */}
            <Grid item xs={12} md={3}>
              <Box>
                <Typography
                  variant="h5"
                  sx={{ mb: 2, fontWeight: "700", color: "#fff" }}
                >
                  Quick Links
                </Typography>
                <Box>
                  <ul className={unorderList}>
                    <li>
                      <Link className={footerLink} to="/dashboard/leave">
                        <ArrowRightIcon fontSize="large" /> Leave
                      </Link>
                    </li>
                    <li>
                      <Link className={footerLink} to="/dashboard/course">
                        <ArrowRightIcon fontSize="large" />
                        Course
                      </Link>
                    </li>
                    <li>
                      <Link className={footerLink} to="/dashboard/attendance">
                        <ArrowRightIcon fontSize="large" /> Attendance
                      </Link>
                    </li>
                    <li>
                      <Link
                        className={footerLink}
                        to="/dashboard/announcements"
                      >
                        <ArrowRightIcon fontSize="large" /> Announcement
                      </Link>
                    </li>
                    <li>
                      <Link className={footerLink} to="/dashboard/myinfo">
                        <ArrowRightIcon fontSize="large" /> My Information
                      </Link>
                    </li>
                  </ul>
                </Box>
              </Box>
            </Grid>

            {/* Follow us section  */}
            <Grid item xs={12} md={4}>
              <Typography
                variant="h5"
                sx={{ mb: 2, fontWeight: "700", color: "#fff" }}
              >
                Follow Us
              </Typography>

              <Box sx={{ mr: { md: 6 } }}>
                <Grid container>
                  <Box className={socialIcon} className={featureCard}>
                    <a
                      target="_blank"
                      className={iconItem}
                      href="https://web.facebook.com/"
                      rel="noreferrer"
                    >
                      <FacebookOutlinedIcon className={icon} fontSize="small" />
                    </a>
                  </Box>
                  <Box className={socialIcon} className={featureCard}>
                    <a
                      target="_blank"
                      className={iconItem}
                      href="https://twitter.com/"
                      rel="noreferrer"
                    >
                      <TwitterIcon className={icon} fontSize="small" />
                    </a>
                  </Box>
                  <Box className={socialIcon} className={featureCard}>
                    <a
                      target="_blank"
                      className={iconItem}
                      href="https://github.com/"
                      rel="noreferrer"
                    >
                      <GitHubIcon className={icon} fontSize="small" />
                    </a>
                  </Box>
                </Grid>
                {/* </Grid> */}
                <Grid container mt={3}>
                  <Box className={socialIcon} className={featureCard}>
                    <a
                      target="_blank"
                      className={iconItem}
                      href="https://www.linkedin.com/"
                      rel="noreferrer"
                    >
                      <LinkedInIcon className={icon} fontSize="small" />
                    </a>
                  </Box>
                  <Box className={socialIcon} className={featureCard}>
                    <a
                      target="_blank"
                      className={iconItem}
                      href="https://hrcare.netlify.app/"
                      rel="noreferrer"
                    >
                      <LanguageIcon className={icon} fontSize="small" />
                    </a>
                  </Box>
                  <Box className={socialIcon} className={featureCard}>
                    <a
                      target="_blank"
                      className={iconItem}
                      href="https://www.instagram.com/?hl=en"
                      rel="noreferrer"
                    >
                      <InstagramIcon className={icon} fontSize="small" />
                    </a>
                  </Box>
                </Grid>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>

      <Box className={copyRight}>
        <Typography variant="body1">
          &copy; 2022 All rights reserved by HR Care
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;
