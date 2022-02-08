import React, { useState } from "react";
import { Button, Box, TextField } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Login.css";
import useAuth from "./../../../hooks/useAuth";

const Login = () => {
  const { googleSignIn, passwordLoginUser } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState("");

  const handleOnBlur = (e) => {
    const field = e.target.name;
    const value = e.target.value;
    const newLoginData = { ...loginData };
    newLoginData[field] = value;
    setLoginData(newLoginData);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    passwordLoginUser(loginData.email, loginData.password, location, navigate);
  };
  const handleGoogleSignIn = () => {
    googleSignIn(location, navigate);
  };

  const useStyle = makeStyles({
    loginContiner: {
      height: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "#f1f1f1",
    },
    loginBox: {
      background: "#fff",
      padding: "40px",
      width: "320px",
    },
    inputField: {
      width: "100%",
      marginBottom: "20px",
    },
    formAction: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      marginTop: "10px",
    },
    newEmployer: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
    },
    hrStyle: {
      display: "inline-block",
      background: "#f1f1f1",
      height: "1px",
      width: "100px",
    },
    forgotLink: {
      textDecoration: "underline !important",
    },
  });

  const {
    loginContiner,
    loginBox,
    inputField,
    formAction,
    newEmployer,
    hrStyle,
    forgotLink,
  } = useStyle();

  return (
    <Box className={loginContiner}>
      <Box className={loginBox}>
        <Box className="input_title">
          <h1>Login</h1>
        </Box>
        <form onSubmit={handleOnSubmit}>
          <Box>
            <TextField
              className={inputField}
              label="Enter your email"
              variant="standard"
              name="email"
              type="email"
              onBlur={handleOnBlur}
            />
          </Box>
          <Box>
            <TextField
              className={inputField}
              label="Password"
              variant="standard"
              name="password"
              type="password"
              onBlur={handleOnBlur}
            />
          </Box>
          <Box className={formAction}>
            <a className={forgotLink} href="#">
              Forgot your password?
            </a>
            <Button className="btn_regular" type="submit">
              Sign In
            </Button>
          </Box>
        </form>
        <Box className="login_bottom">
          <Box className={newEmployer}>
            <hr className={hrStyle} />
            <p>New Employer?</p>
            <hr className={hrStyle} />
          </Box>
          <Link to="/register">
            <Button className="btn_regular">Creact An Account</Button>
          </Link>
          <p style={{ color: "#565454", textAlign: "center" }}>Or</p>
          <p style={{ color: "#565454", textAlign: "center" }}>Login with</p>
          <button
            className="btn_regular"
            onClick={handleGoogleSignIn}
            style={{ border: "0", textAlign: "center" }}
          >
            <img src="https://i.ibb.co/5FqH8JM/google.png" width="46px" />
          </button>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
