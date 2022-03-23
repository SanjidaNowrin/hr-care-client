import { Button, Container, Grid, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import emailjs from "emailjs-com";
import React from "react";
import Swal from "sweetalert2";

const Contact = () => {
    const sendEmail = (e) => {
        e.preventDefault();

        emailjs.sendForm("service_bjnh5xq", "template_ay3s1pr", e.target, "user_vS4dymrTlg495yr9cCTHL").then(
            (result) => {
                console.log(result.text);
            },
            (error) => {
                console.log(error.text);
            }
        );
        e.target.reset();
        Swal.fire({
            position: "middle",
            icon: "success",
            title: "Mail Sent Successfully",
            showConfirmButton: false,
            timer: 2000,
        });
    };
    return (
        <Container>
            <Box sx={{ pt: 8, pb: 4, textAlign: "center" }}>
                <Typography className="section_title" variant="h4">
                    Contact Us
                </Typography>

                <Typography sx={{ mt: 2 }} variant="body1">
                    Fill up the form and our team will get back to you within 24 hours.
                </Typography>
            </Box>
            <Grid container spacing={3}>
                <Grid item md={6}>
                    <Box
                        sx={{
                            border: "1px solid #00000021",
                            p: 5,
                            boxShadow: "10px 10px 30px 0px rgb(0 0 0 / 15%)",
                        }}
                    >
                        <Box
                            sx={{
                                mb: 4,
                                textTransform: "uppercase",
                                color: "#555",
                                textAlign: "center",
                            }}
                        >
                            <Typography variant="h4">Get In Touch</Typography>
                        </Box>
                        <form onSubmit={sendEmail}>
                            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
                                <TextField
                                    sx={{ width: "100%", mr: 1 }}
                                    id="outlined-basic"
                                    label="Enter first name"
                                    name="firstName"
                                    variant="outlined"
                                />

                                <TextField
                                    sx={{ width: "100%", ml: 1 }}
                                    id="outlined-basic"
                                    label="Enter last name"
                                    variant="outlined"
                                    name="lastName"
                                />
                            </Box>

                            <Box>
                                <TextField
                                    sx={{ width: "100%" }}
                                    id="outlined-basic"
                                    label="Enter your email"
                                    variant="outlined"
                                    name="email"
                                />

                                <TextField
                                    sx={{ width: "100%", my: 2 }}
                                    id="outlined-basic"
                                    label="Phone number"
                                    variant="outlined"
                                    name="phone"
                                />

                                <TextField
                                    sx={{ width: "100%" }}
                                    rows={4}
                                    multiline
                                    id="outlined-basic"
                                    label="Write a massage"
                                    variant="outlined"
                                    name="message"
                                />
                            </Box>
                            <Box sx={{ mt: 2, textAlign: "center" }}>
                                <Button sx={{ width: "50%" }} className="btn_regular" type="submit">
                                    Submit
                                </Button>
                            </Box>
                        </form>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3652.2637669988117!2d90.4073473142542!3d23.737971695169474!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b8f4c4ce997f%3A0x94d6ee997ccd5010!2sHR%20Bhaban%2C%2026%2F1%2C%20Kakrail%20Road%2C%20Dhaka-1000%2C%20Bangladesh%2C%20Bir%20Uttam%20Samsul%20Alam%20Rd%2C%20Dhaka%201000!5e0!3m2!1sen!2sbd!4v1648026234637!5m2!1sen!2sbd"
                        width="100%"
                        height="99%"
                        style={{ borderBottom: "2px solid gray", borderRight: "2px solid gray" }}
                        allowfullscreen=""
                    ></iframe>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Contact;
