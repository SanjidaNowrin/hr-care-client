import React from 'react';
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { Typography, Button, Container, useTheme } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Link } from "react-router-dom";

const Item = ({item}) => {
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
            color: '#01578A'
        }
    })

    const { verticalCenter, bannerTitle } = useStyle();



    return (
            <Box sx={{ py: 10 }} style={{width: '100%', height:'1200px!important',background: 'linear-gradient(45deg, #30809e, transparent)'}}>
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
                                {item.name}
                            </Typography>
                            <Typography variant="h5" style={{color: 'white',fontWeight:'bold'}}>
                                {item.title}
                            </Typography>
                            <Typography variant="body1" sx={{ mt: 1, color: 'white', fontFamily: 'var(--PT_font)' }}>
                                {item.description}
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
                            src={item.img}
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

export default Item;