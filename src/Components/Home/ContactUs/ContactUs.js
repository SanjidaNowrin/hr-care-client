import React from "react";
import Box from "@mui/material/Box";
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
            <Typography sx={{ textAlign: "center", fontWeight: '700' }} variant="h4">
               <span style={{ color: " #01578A" }}>Contact</span> Us
            </Typography>
              <Typography style={{marginBottom:"1.5rem"}}
                variant="body2"
                color="#01578A"
                component="p"
                gutterBottom
              >
                Fill up the form and our team will get back to you within 24
                hours.
              </Typography>
              <form>
                <Grid container spacing={1}>
                  <Grid xs={12} sm={6} item>
                    <TextField
                      placeholder="Enter first name"
                      label="First Name"
                      variant="outlined"
                      fullWidth
                      required
                    />
                  </Grid>
                  <Grid xs={12} sm={6} item>
                    <TextField
                      placeholder="Enter last name"
                      label="Last Name"
                      variant="outlined"
                      fullWidth
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      type="email"
                      placeholder="Enter email"
                      label="Email"
                      variant="outlined"
                      fullWidth
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      type="number"
                      placeholder="Enter phone number"
                      label="Phone"
                      variant="outlined"
                      fullWidth
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Message"
                      multiline
                      rows={4}
                      placeholder="Type your message here"
                      variant="outlined"
                      fullWidth
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      variant="contained"
                     style={{backgroundColor:"#01578A",color:"white",marginTop:"1rem"}}
                      fullWidth
                    >
                      Submit
                    </Button>
                  </Grid>
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
