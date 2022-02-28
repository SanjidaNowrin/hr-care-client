import React, { useEffect, useState } from "react";
import { Box, Button, Container, FormControl as FormGroup, MenuItem, TextField, Typography, useTheme } from "@mui/material";
import useAuth from "../../../hooks/useAuth";
import { useForm } from "react-hook-form";
import axios from "axios";
import Swal from "sweetalert2";
import { makeStyles } from "@mui/styles";

const MyInfo = () => {
    const { user } = useAuth();
    const { register, handleSubmit, reset } = useForm();
    const [employee, setEmployee] = useState([]);


    useEffect(() => {
        fetch(`https://ancient-thicket-61342.herokuapp.com/employees/${user.email}`)
            .then((res) => res.json())
            .then((data) => setEmployee(data.result));
    }, [user.email]);
    // console.log(employee[0]);
    // console.log(employee[0]?.father);


    const onSubmit = (data) => {
        axios.post("https://ancient-thicket-61342.herokuapp.com/employees", data);
        reset();
        Swal.fire({
            position: "middle",
            icon: "success",
            title: "Employee Information Sent Successfully",
            showConfirmButton: false,
            timer: 2000,
        });
    };
    const departments = [
        {
            value: "Human Resource",
            label: "Human Resource",
        },
        {
            value: "Information Technology",
            label: "Information Technology",
        },
        {
            value: "Marketing",
            label: "Marketing",
        },
        {
            value: "Accounting",
            label: "Accounting",
        },
    ];

    const [department, setDepartment] = useState();

    const handleChange = (event) => {
        setDepartment(event.target.value);
    };

    // useStyle

    const theme = useTheme();
    const useStyle = makeStyles({
        dFlex: {
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "10px",
            [theme.breakpoints.down("sx")]: {
                display: "block !important",
            },
        },
        middleField: {
            marginLeft: "10px !important",
            marginRight: "10px !important",
        },
    });
    const { dFlex, middleField } = useStyle();

    return (
        <Container>
            <Typography
                style={{
                    textAlign: "center",
                    fontWeight: "500",
                    marginTop: "2rem",
                    marginBottom: "2rem",
                }}
                variant="h4"
            >
                Fill Your <span style={{ color: " #01578A" }}>Information</span>
            </Typography>
            <Box>
                {/* useForm */}
                <FormGroup sx={{ width: "100%" }} onSubmit={handleSubmit(onSubmit)}>
                    <Box className={dFlex}>
                        <TextField
                            {...register("name")}
                            sx={{ width: "100% !important" }}
                            id="outlined-basic"
                            label="Name"
                            type="text"
                            variant="outlined"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            value={employee[0]?.name}
                            required
                        />
                        <TextField
                            className={middleField}
                            sx={{ width: "100%" }}
                            {...register("father")}
                            id="outlined-basic"
                            label="Father's Name"
                            type="text"
                            variant="outlined"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            value={employee[0]?.father}
                            onInput
                            required
                        />
                        <TextField
                            sx={{ width: "100%" }}
                            {...register("mother")}
                            id="outlined-basic"
                            label="Mother's Name"
                            type="text"
                            variant="outlined"
                            required
                        />
                    </Box>

                    <Box className={dFlex}>
                        <TextField
                            sx={{ width: "100%" }}
                            {...register("email")}
                            id="outlined-basic"
                            label="Email"
                            type="email"
                            variant="outlined"
                            value={user?.email}
                            required
                        />
                        <TextField
                            className={middleField}
                            sx={{ width: "100%" }}
                            {...register("phone")}
                            id="outlined-basic"
                            label="Cell Number"
                            type="number"
                            variant="outlined"
                            required
                        />
                        <TextField
                            sx={{ width: "100%" }}
                            {...register("nid")}
                            id="outlined-basic"
                            label="NID"
                            type="number"
                            variant="outlined"
                            required
                        />
                    </Box>

                    <Box className={dFlex}>
                        <TextField
                            sx={{ width: "100%" }}
                            {...register("birth")}
                            id="date"
                            label="Dath of Birth"
                            type="date"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            required
                        />
                        <TextField
                            className={middleField}
                            sx={{ width: "100%" }}
                            {...register("department")}
                            id="outlined-select-currency"
                            select
                            label="Department"
                            value={department}
                            onChange={handleChange}
                            required
                        >
                            {departments.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>

                        <TextField
                            sx={{ width: "100%" }}
                            {...register("designation")}
                            id="outlined-basic"
                            label="Designation"
                            type="text"
                            variant="outlined"
                            required
                        />
                    </Box>

                    {/* Experience Information */}
                    <Typography sx={{ m: 2 }} variant="h5">
                        Exprience
                    </Typography>

                    <Box className={dFlex}>
                        <TextField
                            sx={{ width: "100%" }}
                            {...register("lastCompany")}
                            id="outlined-basic"
                            label="Company"
                            type="text"
                            variant="outlined"
                        />
                        <TextField
                            className={middleField}
                            sx={{ width: "100%" }}
                            {...register("lastDepartment")}
                            id="outlined-basic"
                            label="Department"
                            type="text"
                            variant="outlined"
                        />
                        <TextField
                            sx={{ width: "100%" }}
                            {...register("lastDesignation")}
                            id="outlined-basic"
                            label="Designation"
                            type="text"
                            variant="outlined"
                        />
                    </Box>

                    {/* Education Information */}
                    <Typography sx={{ m: 2 }} variant="h5">
                        Education information
                    </Typography>

                    <Box className={dFlex}>
                        <TextField
                            sx={{ width: "100%" }}
                            {...register("lastDegree")}
                            id="outlined-basic"
                            label="Degree"
                            type="text"
                            variant="outlined"
                        />
                        <TextField
                            sx={{ width: "100%", marginLeft: "10px" }}
                            {...register("lastSubject")}
                            id="outlined-basic"
                            label="Subject"
                            type="text"
                            variant="outlined"
                        />
                    </Box>

                    <Box className={dFlex}>
                        <TextField
                            sx={{ width: "100%" }}
                            {...register("lastInstitute")}
                            id="outlined-basic"
                            label="Institute"
                            type="text"
                            variant="outlined"
                        />
                        <TextField
                            sx={{ width: "100%", marginLeft: "10px" }}
                            {...register("lastGrade")}
                            id="outlined-basic"
                            label="Grade"
                            type="text"
                            variant="outlined"
                        />
                    </Box>
                    <Button
                        variant="outlined"
                        style={{
                            backgroundColor: "#01578A",
                            color: "white",
                            marginTop: "1rem ",
                            marginBottom: "2rem ",
                            padding: "12px 0px",
                        }}
                        type="submit"
                    >
                        Submit
                    </Button>
                </FormGroup>
            </Box>
        </Container>
    );
};

export default MyInfo;
