import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import Divider from '@mui/material/Divider';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import React, { useEffect, useState } from "react";

const BestEmployee = (props) => {
  const { check, finalPoint } = props;

    const [bestEmp, setBestEmp] = useState([]);
    useEffect(() => {
        fetch("https://ancient-thicket-61342.herokuapp.com/taskAssign")
            .then((res) => res.json())
            .then((data) => setBestEmp(data.data));
    }, []);

    function leftPad(number) {
        var output = number + '';
        while (output.length < 2) {
            output = '0' + output;
        }
        return output;
    }

    const useStyle = makeStyles({
        cardContainer: {
            borderRadius: "5px",
            background: '#fff',
            border: '1px solid #b3b0b0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '15px 0'
        },
        cardImg: {
            height: "120px",
            width: "120px",
            borderRadius: "50%",
            position: 'absolute',
            zIndex: '2',
            top: '74px',
            right: '-4px'
        },
        cardBox: {
            height: '350px',
            width: '270px',
            background: 'transparent',
            boxShadow: "1px 10px 30px #b6b7b7 !important",
            position: 'relative',
            '&::after': {
                content: '""',
                position: 'absolute',
                top: '-50px',
                left: '-50px',
                height: '60%',
                width: '350px',
                background: 'var(--p_color)',
                transform: 'rotate(-19deg)',
                zIndex: '1'
            }
        },
        awardBox: {
            position: 'absolute',
            left: '10px',
            zIndex: '3',
            color: '#fff',
            fontFamily: 'var(--PT_font) !important'
        },
        cardContent: {
            position: 'absolute',
            bottom: '75px'
        },
        cardTitle: {
            fontWeight: "600 !important",
            color: "#000",
        },
        awardBottom: {
            position: 'absolute',
            bottom: '0',
            width: '100%',
            color: '#555',
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
            textAlign: 'center',
            borderTop: '1px solid #b3b0b0',
            padding: '5px 0'
        }
    });
    const { cardContainer, cardImg, cardBox, awardBox, cardContent, cardTitle, awardBottom } = useStyle();
    return (
        <>
            {bestEmp?.slice(2, 3).map((data) => (
                <Box className={cardContainer}>
                    <Card className={cardBox}>
                        <Box className={awardBox}>
                            <Typography sx={{ fontFamily: 'var(--PT_font)' }} variant="h5">
                                Best Employee
                            </Typography>
                            <Typography sx={{ fontFamily: 'var(--PT_font)' }} variant="body1">
                                Last month
                            </Typography>

                            <img style={{ width: '65px', top: '112px', position: 'absolute', left: '5px' }} src="https://i.ibb.co/2s8vNYk/medal.png" alt="award" />
                        </Box>
                        {finalPoint[0]?.photo ? (
                            <CardMedia className={cardImg} image={`data:image/jpeg;base64,${finalPoint[0]?.photo}`} />
                        ) : (
                            <CardMedia className={cardImg} image="https://i.ibb.co/gvzdw1g/images.png" />
                        )}

                        <CardContent className={cardContent}>
                            <Typography variant="h5" className={cardTitle}>
                                {finalPoint[0]?.name}
                            </Typography>

                            <Typography variant="body2" sx={{ fontWeight: "400" }} color="text.secondary">
                                {finalPoint[0]?.email}
                            </Typography>
                        </CardContent>

                        <Divider />
                        <Box className={awardBottom}>
                            <Box>
                                <Typography variant="body1" sx={{ fontWeight: "600" }}>
                                    Task Done
                                </Typography>
                                <Typography variant="body1" sx={{ textAlign: 'center' }}>
                                    {leftPad(finalPoint[0]?.totalAssignTask)}
                                </Typography>
                            </Box>
                            <Divider orientation="vertical" flexItem />
                            <Box>
                                <Typography variant="body1" sx={{ fontWeight: "600" }}>
                                    Done Rate
                                </Typography>
                                <Typography variant="body1" sx={{ textAlign: 'center' }}>
                                    {Math.round(check)}%
                                </Typography>
                            </Box>
                        </Box>
                    </Card>
                </Box >
            ))}
        </>
    );
};

export default BestEmployee;
