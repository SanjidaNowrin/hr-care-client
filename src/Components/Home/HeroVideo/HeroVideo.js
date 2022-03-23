import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import { Box, Container, Grid } from "@mui/material";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import * as React from "react";
import videoSrc from "../../../assets/video/hrcare.mp4";

const Accordion = styled((props) => <MuiAccordion disableGutters elevation={0} square {...props} />)(({ theme }) => ({
    border: `1px solid ${theme.palette.divider}`,
    "&:not(:last-child)": {
        borderBottom: 0,
    },
    "&:before": {
        display: "none",
    },
}));

const AccordionSummary = styled((props) => (
    <MuiAccordionSummary expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem", color: "white" }} />} {...props} />
))(({ theme }) => ({
    backgroundColor: theme.palette.mode === "#1C5BA0" ? "#1C5BA0" : "#1C5BA0",
    flexDirection: "row-reverse",
    "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
        transform: "rotate(90deg)",
    },
    "& .MuiAccordionSummary-content": {
        marginLeft: theme.spacing(1),
    },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: theme.spacing(2),
    borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

export default function CustomizedAccordions() {
    const [expanded, setExpanded] = React.useState("panel1");

    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };

    return (
        <Box>
            <Container>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={12} md={7}>
                        <Box className="video">
                            <video src={videoSrc} width="100%" autoPlay muted loop />
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={12} md={5}>
                        <Accordion expanded={expanded === "panel1"} onChange={handleChange("panel1")}>
                            <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                                <Typography sx={{ color: "white" }}>What is HRM?</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography sx={{ color: "black" }}>
                                    Human resource management (HRM) is the practice of recruiting, hiring, deploying and managing an
                                    organization's employees. HRM is often referred to simply as human resources (HR). A company or
                                    organization's HR department is usually responsible for creating, policies workers and the relationship
                                    of the organization with its employees.
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion expanded={expanded === "panel2"} onChange={handleChange("panel2")}>
                            <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
                                <Typography sx={{ color: "white" }}>Where HRM is used?</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography sx={{ color: "black" }}>
                                    HRM is employee management with an emphasis on those employees as assets of the business. In this
                                    context, employees are sometimes referred to as human capital. As with other business assets, the goal
                                    is to make effective use of employees, reducing risk and maximizing return on investment (ROI).
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion expanded={expanded === "panel3"} onChange={handleChange("panel3")}>
                            <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
                                <Typography sx={{ color: "white" }}>Who uses HRM?</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography sx={{ color: "black" }}>
                                    HRM approach is needed to bring proper understanding among workers and management. The workers are
                                    trained and developed to meet their individual and organisational objectives. The workers are made to
                                    understand that various managerial actions will assist them in achieving their aspirations and
                                    organisation's goal.
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion expanded={expanded === "panel4"} onChange={handleChange("panel4")}>
                            <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
                                <Typography sx={{ color: "white" }}>What are the benefits of using HRM?</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography sx={{ color: "black" }}>
                                    It’s important not to underestimate the impact of HR on your business. While you might think that you
                                    can handle things internally, outsourcing your HR offers a multitude of benefits. Partnering with an HRM
                                    expert can help you secure top talent, create a stronger onboarding process, improve employee retention.
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
}
