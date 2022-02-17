import React from "react";
import { Box } from "@mui/material";
import { useForm } from "react-hook-form";
import { Grid } from "@mui/material";
import { Typography, Button, Container, TextField } from "@mui/material";
import Swal from 'sweetalert2'
const MakeAdmin = () => {
  const { register, handleSubmit,reset } = useForm();
  const onSubmit = (data) => {
    fetch("https://murmuring-falls-58867.herokuapp.com/makeAdmin", {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((result) => console.log(result));
    Swal.fire({
        title: 'WOW!',
        text: 'Added as an admin',
        imageUrl: 'https://i.ibb.co/c1Lnz5P/undraw-real-time-collaboration-c62i.png',
        imageWidth: 300,
        imageHeight: 200,
        imageAlt: 'Custom image',
      })
      reset();
  };
  return (
    <Box sx={{ py: 10 }}>
      <Container>
        <Grid container spacing={8}>
          <Grid item xs={12} md={6}>
            <img
              src="https://i.ibb.co/d78Sb8X/undraw-Add-user-re-5oib.png"
              alt="banner"
              border="0"
              style={{ width: "100%" }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
          <Typography  variant="h4" sx={{ fontWeight: '500', color: '#01578A',textAlign:"center" ,marginBottom:"18px"}}>Make <span style={{ color: "#000" }}>Admin</span></Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Box sx={{ mb: 2 }}>
                <label style={{ display: "block" }} htmlFor="title">
                  Enter Email <span style={{ color: "red"}}>*</span>
                </label>
                <TextField
                  sx={{ width: "100%" }}
                  variant="outlined"
                  name="email"
                  placeholder="Email"
                  type="email"
                  {...register("email", { required: true })}
                />
              </Box>
              <Box sx={{ textAlign: "center", mt: 3 }}>
                <Button
                  sx={{
                    background: "#01578A !important",
                    color: "#fff !important",
                  }}
                  className="btn_regular"
                  type="submit"
                >
                  Submit
                </Button>
              </Box>
            </form>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default MakeAdmin;
