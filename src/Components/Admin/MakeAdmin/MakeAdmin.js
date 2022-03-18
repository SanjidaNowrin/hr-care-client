import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { MenuItem } from "@mui/material";
import useAuth from "./../../../hooks/useAuth";
const MakeAdmin = () => {
  const { register, handleSubmit, reset } = useForm();
  const { token } = useAuth();
  const onSubmit = (data) => {
    fetch("http://localhost:5000/user", {
      method: "PUT",
      headers: {
        authorization: `Bearer ${token}`,
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((result) => console.log(result));
    Swal.fire({
      title: "WOW!",
      text: "Added as an Admin",
      imageUrl:
        "https://i.ibb.co/c1Lnz5P/undraw-real-time-collaboration-c62i.png",
      imageWidth: 300,
      imageHeight: 200,
      imageAlt: "Custom image",
    });
    reset();
  };
  const [users, setUsers] = useState([]);
  const [userEmail, setUserEmail] = useState([]);
  const handleData = (event) => {
    setUserEmail(event.target.value);
  };
  useEffect(() => {
    fetch("http://localhost:5000/user")
      .then((res) => res.json())
      .then((data) => setUsers(data.data));
  }, []);
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
            <Typography
              variant="h4"
              sx={{
                fontWeight: "500",
                color: "#01578A",
                textAlign: "center",
                marginBottom: "18px",
              }}
            >
              Make <span style={{ color: "#000" }}>Admin</span>
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Box sx={{ mb: 2 }}>
                <label style={{ display: "block" }} htmlFor="title">
                  Enter Email <span style={{ color: "red" }}>*</span>
                </label>
                <TextField
                  style={{ width: "100%" }}
                  {...register("email", { required: true })}
                  id="outlined"
                  select
                  value={userEmail}
                  onChange={handleData}
                  required
                >
                  {users.map((option) => (
                    <MenuItem key={option.email} value={option.email}>
                      {option.email}
                    </MenuItem>
                  ))}
                </TextField>
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
