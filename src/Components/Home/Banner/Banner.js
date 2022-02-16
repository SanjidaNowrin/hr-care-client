import React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { Typography, Button, Container, useTheme } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Link } from "react-router-dom";
const Banner = () => {
    const theme = useTheme();
    const useStyle = makeStyles({
        verticalCenter: {
            display: "flex",
            alignItems: "center",
            [theme.breakpoints.down("sm")]: {
                textAlign: 'center !important'
            }
        },
        bannerTitle: {
            marginBottom: '20px !important',
            fontWeight: '700 !important',
            color: '#009efa'
        }
    })

    const { verticalCenter, bannerTitle } = useStyle();

    return (
        <Box sx={{ py: 10 }}>
            <Container>
                <Grid container spacing={8}>
                    <Grid
                        item
                        xs={12}
                        md={6}
                        className={verticalCenter}
                    >
                        <Box>
                            <Typography className={bannerTitle} variant="h3">
                                HR Care
                            </Typography>
                            <Typography variant="h5">
                                Human Resource Management Admin Template
                            </Typography>
                            <Typography variant="body1" sx={{ mt: 1, color: '#818181', fontFamily: 'var(--PT_font)' }}>
                                HR Software is system for company to maintain a database of their
                                employers performance. Using this software, a company can manage their employer details, attendance, Leave, holidays, Salary, etc.
                            </Typography>
                            <Link to="/dashboard">
                                <Button className="btn_regular" sx={{ mt: 3 }}>
                                    Let's Start
                                </Button>
                            </Link>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <img
                            src="https://i.ibb.co/52VcGBf/banner.png"
                            alt="banner"
                            border="0"
                            style={{ width: "100%" }}
                        />
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default Banner;