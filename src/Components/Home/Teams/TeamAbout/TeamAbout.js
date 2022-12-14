import { Box, Grid, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useEffect } from "react";
import Aos from "aos";
import "aos/dist/aos.css";
const TeamAbout = () => {
    useEffect(() => {
        Aos.init({duration:2000});
      }, []);
    const useStyle = makeStyles({
        sectionTitle: {
            textTransform: "capitalize",
            fontWeight: "600 !important",
            padding: "20px 0",
        },
        pText: {
            textTransform: "capitalize",
            fontWeight: "400 !important",
            fontFamily: "var(--PT_font) !important",
            color: "var(--pt_color)",
        },
    });
    const { sectionTitle, pText } = useStyle();

    return (
        <Box sx={{ pt: 8 }}>
            <Grid container spacing={4}  style={{overflowX:"hidden"}}>
                <Grid item xs={12} md={6} sx={{ display: "flex", alignItems: "center", justifyContent: "conter" }}>
                    <Box data-aos="fade-right">
                        <Typography variant="h4" sx={{ color: "#01578A" }} className={sectionTitle}>
                            About Our Human Resource Management
                        </Typography>
                        <Typography variant="body1" className={pText}>
                            Human resource management (HRM or HR) is the strategic approach to the effective and efficient management of
                            people in a company or organization such that they help their business gain a competitive advantage. It is
                            designed to maximize employee performance in service of an employer's strategic objectives need quotation to
                            verify. Human resource management is primarily concerned with the management of people within organizations,
                            focusing on policies and systems.
                        </Typography>
                    </Box>
                </Grid>

                <Grid item xs={12} md={6} style={{overflowX:"hidden"}}>
                    <img data-aos="fade-left"
                        style={{ width: "100%" }}
                        src="https://t4.ftcdn.net/jpg/02/84/04/63/360_F_284046358_xFSfxtd82cPOQijgflp1jqhjABTVyEol.jpg"
                        alt=""
                    />
                </Grid>
            </Grid>

        </Box>
    );
};

export default TeamAbout;
