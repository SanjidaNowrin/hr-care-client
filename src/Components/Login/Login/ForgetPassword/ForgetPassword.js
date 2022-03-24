import { Box, Button, Container, Grid, TextField } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../../../hooks/useAuth";
import Footer from "../../../Share/Footer/Footer";
import Navbar from "../../../Share/Navbar/Navbar";

const ForgetPassword = () => {
    const { passwordLoginUser, resetPassword } = useAuth();
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
        if (loginData.password !== loginData.password2) {
            alert("Password did not Match");
            return;
        }
        e.preventDefault();
        passwordLoginUser(loginData.email, loginData.password, location, navigate);
    };
    const forgetPassword = () => {
        resetPassword(loginData.email);
        alert("code send to your email");
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

        loginImg: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            margin: "auto",
        },
    });

    const { loginImg, loginContiner, loginBox, inputField, formAction } = useStyle();

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
                                    src="https://png.pngtree.com/png-vector/20191113/ourmid/pngtree-lock-password-password-lock-secure-password-blue-icon-on-abst-png-image_1985473.jpg"
                                    alt=""
                                />
                            </Box>
                        </Grid>

                        <Grid item xs={12} sm={12} md={5}>
                            <Box sx={{ mt: 5 }} className={loginContiner} data-testid="loginComponent">
                                <Box className={loginBox}>
                                    <Box>
                                        <h1>Reset Password</h1>
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

                                        <Box className={formAction}>
                                            <Link to="/login">
                                                <Button className="btn_regular" onClick={forgetPassword}>
                                                    Submit
                                                </Button>
                                            </Link>
                                        </Box>
                                    </form>
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

export default ForgetPassword;
