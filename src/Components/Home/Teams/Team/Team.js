import { Button, Card, CardContent, CardMedia, Grid, Paper, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/system";
import React from "react";

const Team = ({ team }) => {
    const { name, developer, image, portfolio } = team;
    const useStyle = makeStyles({
        cardContainer: {
            padding: '15px',
            borderRadius: '5px',
            border: '1px solid #845EC2',
            transition: 'all .3s ease-in-out !important',
            '&:hover': {
                '& $cardBox': {
                    background: '#009EFA !important',
                    transform: 'translateY(-30px)'
                }, '& $cardTitle': {
                    color: '#fff'
                }
            }
        },
        cardImg: {
            height: '200px',
            width: '200px',
            borderRadius: '50%',
            margin: '40px auto 20px'
        },
        cardBox: {
            boxShadow: '0px 8px 15px rgba(248, 80, 80, .5) !important;',
            background: 'transparent !important',
            position: 'relative',
            transition: 'all .3s ease-in-out !important'
        },
        cardContent: {
            textAlign: 'center'
        },
        cardTitle: {
            fontWeight: '700',
            color: '#009EFA',
            transition: 'all .3s ease-in-out !important'
        }
    })

    const { cardContainer, cardImg, cardBox, cardContent, cardTitle } = useStyle();
    return (
        <Grid item xs={12} sm={6} md={4}>
            <Box className={cardContainer}>
                <Card className={cardBox}>
                    <CardMedia className={cardImg} image={image} />

                    <CardContent className={cardContent}>
                        <Typography variant="h5" className={cardTitle}>
                            {name}
                        </Typography>

                        <Typography variant="body1" sx={{ fontWeight: '600' }} color="text.secondary">
                            {developer}
                        </Typography>

                        <a target="_blank" rel="noreferrer" href={portfolio}>
                            <Button sx={{ mt: 2, width: '100%', border: '1px solid #fff' }} className="btn_regular ">
                                Read More
                            </Button>
                        </a>
                    </CardContent>
                </Card>
            </Box>
        </Grid>
    );
};

export default Team;
