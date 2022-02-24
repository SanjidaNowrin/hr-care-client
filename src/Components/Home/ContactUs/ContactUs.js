import React from "react";
import emailjs from "emailjs-com";
import Box from "@mui/material/Box";
import Swal from "sweetalert2";
import { makeStyles } from "@mui/styles";
import {
  Grid,
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
  Container,
} from "@material-ui/core";
const ContactUs = () => {
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

  const useStyle = makeStyles({
    formTitle: {
      textAlign: 'center',
      fontWeight: '700',
      textTransform: 'uppercase'
    },
    formPText: {
      textAlign: 'center',
      color: '#01578A',
      marginBottom: '1.5rem'
    },
    inputField: {
      background: '#fff !important'
    }
  })

  const { formTitle, formPText, inputField } = useStyle();

  return (
    <Box sx={{ py: 10 }}>
      <Container>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <img
              src="https://i.ibb.co/JQZKyYx/undraw-Personal-email-re-4lx7.png"
              alt="banner"
              border="0"
              style={{ width: "100%" }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Card
              style={{ maxWidth: 550, padding: "30px 30px", margin: "0 auto" }}
            >
              <CardContent>
                <Typography className={formTitle} variant="h4">
                  <span style={{ color: " #01578A" }}>Contact</span> Us
                </Typography>
                <Typography
                  className={formPText}
                  variant="body2"
                  component="p"
                  gutterBottom
                >
                  Fill up the form and our team will get back to you within 24
                  hours.
                </Typography>
                <form onSubmit={sendEmail}>
                  <Grid container spacing={1}>
                    <Grid xs={12} sm={6} item>
                      <TextField
                        className={inputField}
                        placeholder="Enter first name"
                        name="firstName"
                        label="First Name"
                        variant="outlined"
                        fullWidth
                        required
                      />
                    </Grid>
                    <Grid xs={12} sm={6} item>
                      <TextField
                        className={inputField}
                        placeholder="Enter last name"
                        label="Last Name"
                        variant="outlined"
                        name="lastName"
                        fullWidth
                        required
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        className={inputField}
                        type="email"
                        name="email"
                        placeholder="Enter email"
                        label="Email"
                        variant="outlined"
                        fullWidth
                        required
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        className={inputField}
                        type="number"
                        placeholder="Enter phone number"
                        label="Phone"
                        name="phone"
                        variant="outlined"
                        fullWidth
                        required
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        className={inputField}
                        label="Message"
                        name="message"
                        multiline
                        rows={4}
                        placeholder="Type your message here"
                        variant="outlined"
                        fullWidth
                        required
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Box sx={{ mt: 2 }}>
                        <Button
                          className="btn_regular"
                          type="submit"
                          variant="contained"
                          fullWidth
                        >
                          Submit
                        </Button>
                      </Box>
                    </Grid>
                    {/* <Box className="row">{result ? <Result /> : null}</Box> */}
                  </Grid>
                </form>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default ContactUs;
