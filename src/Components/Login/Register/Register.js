import { Box, Button, TextField, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "./../../../hooks/useAuth";
const Register = () => {
    const { registerUser } = useAuth();
    const [regData, setRegData] = useState("");
    const handleOnBlur = (e) => {
        const field = e.target.name;
        const value = e.target.value;
        const newRegData = { ...regData };
        newRegData[field] = value;
        setRegData(newRegData);
    };
    const location = useLocation();
    const navigate = useNavigate();
    const handleOnSubmit = (e) => {
        if (regData.password !== regData.password2) {
            alert("Password did not Match");
            return;
        }
        e.preventDefault();
        registerUser(regData.email, regData.name, regData.password, regData.photo, location, navigate);
        console.log(regData);
    };

    const useStyle = makeStyles({
        registerContiner: {
            height: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#f1f1f1",
        },
        registerBox: {
            background: "#fff",
            padding: "20px 40px",
            width: "320px",
        },
        inputField: {
            width: "100%",
            marginBottom: "20px",
        },
    });

    const { registerContiner, registerBox, inputField } = useStyle();

    return (
        <Box className={registerContiner}>
            <Box className={registerBox}>
                <Box className="input_title">
                    <h1>Register</h1>
                </Box>
                <form onSubmit={handleOnSubmit}>
                    <Box>
                        <TextField
                            className={inputField}
                            label="Your Full Name"
                            variant="standard"
                            name="name"
                            type="text"
                            onBlur={handleOnBlur}
                        />
                    </Box>
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
                    <Typography variant="body2">Passwords must be at least 6 characters.</Typography>
                    <Box>
                        <TextField
                            className={inputField}
                            label="Confirm Password"
                            variant="standard"
                            name="password2"
                            type="password"
                            onBlur={handleOnBlur}
                        />
                    </Box>
                    <Box>
                        <TextField
                            className={inputField}
                            label="Photo Link"
                            variant="standard"
                            name="photo"
                            type="photo"
                            onBlur={handleOnBlur}
                        />
                    </Box>
                    <Button sx={{ width: "100%", mt: 2 }} className="btn_regular" type="submit">
                        Create Your Account
                    </Button>
                </form>
                <Box className="login_bottom">
                    <Typography sx={{ textAlign: "center", mt: 3, mb: 1 }} variant="body1">
                        Already have an account?
                    </Typography>
                    <Link to="/login">
                        <Button className="btn_regular">Sign In</Button>
                    </Link>
                </Box>
            </Box>
        </Box>
    );
};

export default Register;
