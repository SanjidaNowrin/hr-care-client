import { Box, Button, Container, Grid, TextField, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "./../../../hooks/useAuth";
import Navbar from "./../../Share/Navbar/Navbar"
import Footer from "./../../Share/Footer/Footer"
import "./Login.css";

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
            background: "#fff",
            margin: "auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
        },
        loginBox: {
            background: "#fff",
            padding: "30px 40px 40px",
            width: "320px",
            boxShadow: "0px 7px 45px rgb(0, 0,0, .2) !important",
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
        loginImg: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            margin: "auto",
        },
    });

    const { loginImg, loginContiner, loginBox, inputField, formAction, newEmployer, hrStyle, forgotLink } = useStyle();

    return (
        <>
            <Navbar></Navbar>
            <Container>
                <Box sx={{ marginTop: "100px", marginBottom: "70px" }}>
                    <Grid container spacing={2}>

                        <Grid sx={{ display: "flex" }} item xs={12} sm={12} md={6}>
                            <Box className={loginImg} sx={{ display: { xs: "none", sm: "block", md: "block" } }}>
                                <img
                                    style={{ width: "100%" }}
                                    src="https://img.freepik.com/free-vector/account-log-page_41910-263.jpg"
                                    alt=""
                                />
                            </Box>
                        </Grid>

                        <Grid item xs={12} sm={12} md={5}>
                            <Box className={loginContiner} data-testid="loginComponent">
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
                                        <Typography variant="body1" sx={{ textAlign: "center" }}>
                                            Or
                                        </Typography>
                                        <Button className="btn_regular" onClick={handleGoogleSignIn}>
                                            Sign In With Google
                                        </Button>
                                    </Box>
                                </Box>
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={12} md={1}></Grid>
                    </Grid>
                </Box>
            </Container>
            <Footer></Footer>
        </>
    );
};

export default Login;
