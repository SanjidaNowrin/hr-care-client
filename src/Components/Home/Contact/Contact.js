import { Button, Container, Grid, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import emailjs from "emailjs-com";
import Swal from "sweetalert2";


const Contact = () => {
  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_bjnh5xq",
        "template_ay3s1pr",
        e.target,
        "user_vS4dymrTlg495yr9cCTHL"
      )
      .then(
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
      <Box sx={{ pt: 8, pb: 4, textAlign: 'center', }}>
        <Typography className="section_title" variant="h4">
          Contact Us
        </Typography>

        <Typography sx={{ mt: 2 }} variant="body1">
          Fill up the form and our team will get back to you within 24 hours.
        </Typography>
      </Box>
      <Grid container spacing={2}>
        <Grid
          item
          md={6}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div data-aos="fade-right" >
            <Box>
              <img
                style={{ width: "100%" }}
                src="https://i.ibb.co/JQZKyYx/undraw-Personal-email-re-4lx7.png"
                alt=""
              />
            </Box>
          </div>
        </Grid>
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
              <Box
                sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}
              >
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
      </Grid>
    </Container>
  );
};

export default Contact;
