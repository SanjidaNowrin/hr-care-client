import HomeIcon from "@mui/icons-material/Home";
import { Box, Breadcrumbs, Button, Container, FormControl as FormGroup, MenuItem, TextField, Typography } from "@mui/material";
// Breadcrumbs
import Chip from "@mui/material/Chip";
import { emphasize, styled } from "@mui/material/styles";
import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import SignaturePad from "react-signature-pad-wrapper";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import MyInfoUpdate from "./MyInfoUpdate";

const getUniqueId = (info) => {
    const first =
        info.department === "Human Resource"
            ? "HR"
            : info.department === "Information Technology"
            ? "IT"
            : info.department === "Marketing"
            ? "MK"
            : "AC";
    const randomNumber = Math.floor(Math.random() * 100);
    const birthArray = info.birth.split("-");
    const birth = birthArray.join("");
    const uniqueId = first + "-" + birth + randomNumber;
    return uniqueId;
};
const MyInfo = () => {
    const { user, token } = useAuth();
    console.log(token);
    const { register, handleSubmit, reset } = useForm();
    const [employee, setEmployee] = useState([]);

    useEffect(() => {
        fetch(`https://ancient-thicket-61342.herokuapp.com/employees/${user.email}`)
            .then((res) => res.json())
            .then((data) => setEmployee(data.result));
    }, [user.email]);

    const [image, setImage] = useState(null);
    //signature
    let sigPad = useRef({});
    function clear() {
        sigPad.current.clear();
    }
    function save() {
        setImage(sigPad.current.toDataURL());
    }
    function show() {
        sigPad.current.fromDataURL(image);
    }

    const onSubmit = (data) => {
        data.image = image;
        const ID = getUniqueId(data);
        data.ID = ID;
        fetch("https://ancient-thicket-61342.herokuapp.com/employees", {
            method: "POST",
            headers: {
               
                "content-type": "application/json",
            },
           
            body: JSON.stringify(data),
        })
            .then((response) => response.json())
            .then((result) => {
                reset();
                Swal.fire({
                    position: "middle",
                    icon: "success",
                    title: "Employee Information Sent Successfully",
                    showConfirmButton: false,
                    timer: 2000,
                });
            })
            .catch((error) => {
                console.error("error", error);
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

    // Breadcrumbs
    const StyledBreadcrumb = styled(Chip)(({ theme }) => {
        const backgroundColor = theme.palette.mode === "light" ? theme.palette.grey[100] : theme.palette.grey[800];
        return {
            backgroundColor,
            height: theme.spacing(3),
            color: theme.palette.text.primary,
            fontWeight: theme.typography.fontWeightRegular,
            "&:hover, &:focus": {
                backgroundColor: emphasize(backgroundColor, 0.06),
            },
            "&:active": {
                boxShadow: theme.shadows[1],
                backgroundColor: emphasize(backgroundColor, 0.12),
            },
        };
    });

    return (
        <Container style={{}}>
            {/* Breadcrumbs */}
            <Box sx={{ mb: 4 }}>
                <Typography sx={{ mt: 2, color: "var(--p_color)" }} variant="h4">
                    Fill Your Information
                </Typography>
                <Breadcrumbs aria-label="breadcrumb">
                    <Link to="/dashboard">
                        <StyledBreadcrumb to="/dashboard" label="Dashboard" icon={<HomeIcon fontSize="small" />} />
                    </Link>
                    <Link to="/dashboard/myinfo">
                        <StyledBreadcrumb component="a" href="#" label="My Info" />
                    </Link>
                </Breadcrumbs>
            </Box>

            {employee[0]?.email ? (
                employee.map((oneEmployee) => <MyInfoUpdate key={oneEmployee._id} oneEmployee={oneEmployee}></MyInfoUpdate>)
            ) : (
                <FormGroup onSubmit={handleSubmit(onSubmit)}>
                    <Box
                        component="form"
                        sx={{
                            "& > :not(style)": { m: 1, width: "30%" },
                        }}
                    >
                        <TextField
                            {...register("name")}
                            id="outlined-basic"
                            label="Name"
                            type="text"
                            variant="outlined"
                            value={user?.displayName}
                            required
                        />
                        {/* <TextField
              {...register("photo")}
              id="outlined-basic"
              label="Photo URL"
              type="text"
              variant="outlined"
              value={user?.photoURL}
            /> */}
                        <TextField
                            {...register("father")}
                            id="outlined-basic"
                            label="Father's Name"
                            type="text"
                            variant="outlined"
                            required
                        />
                        <TextField
                            {...register("mother")}
                            id="outlined-basic"
                            label="Mother's Name"
                            type="text"
                            variant="outlined"
                            required
                        />
                        <TextField
                            {...register("email")}
                            id="outlined-basic"
                            label="Email"
                            type="email"
                            variant="outlined"
                            value={user?.email}
                            required
                        />
                        <TextField
                            {...register("phone")}
                            id="outlined-basic"
                            label="Cell Number"
                            type="number"
                            variant="outlined"
                            required
                        />
                        <TextField {...register("nid")} id="outlined-basic" label="NID" type="number" variant="outlined" required />
                        <TextField
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
                            {...register("department")}
                            id="outlined-select-currency"
                            select
                            label="Department"
                            value={department}
                            onChange={handleChange}
                            helperText="Please select your Department"
                            required
                        >
                            {departments.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                        <TextField
                            {...register("designation")}
                            id="outlined-basic"
                            label="Designation"
                            type="text"
                            variant="outlined"
                            required
                        />

                        <Typography sx={{ m: 2 }} variant="h5">
                            Exprience
                        </Typography>

                        <TextField {...register("lastCompany")} id="outlined-basic" label="Company" type="text" variant="outlined" />
                        <TextField {...register("lastDepartment")} id="outlined-basic" label="Department" type="text" variant="outlined" />
                        <TextField
                            {...register("lastDesignation")}
                            id="outlined-basic"
                            label="Designation"
                            type="text"
                            variant="outlined"
                        />

                        <Typography sx={{ m: 2 }} variant="h5">
                            Education information
                        </Typography>

                        <TextField {...register("lastDegree")} id="outlined-basic" label="Degree" type="text" variant="outlined" />
                        <TextField {...register("lastSubject")} id="outlined-basic" label="Subject" type="text" variant="outlined" />
                        <TextField {...register("lastInstitute")} id="outlined-basic" label="Institute" type="text" variant="outlined" />
                        <TextField {...register("lastGrade")} id="outlined-basic" label="Grade" type="text" variant="outlined" />
                        <Typography sx={{ m: 2 }} variant="h5">
                            Signature
                        </Typography>
                        <label style={{ display: "block", fontSize: "0.8rem" }}>
                            <span style={{ color: "red" }}>**</span> After providing your signature, it must be saved
                        </label>
                        <Box sx={{ border: "1px solid #01578A" }}>
                            <Button onClick={clear}>Clear</Button>
                            <Button onClick={save}>Save</Button>
                            <Button onClick={show}>Show</Button>
                            <SignaturePad {...register("image")} ref={sigPad} penColor="green" />
                        </Box>
                        <Button
                            className="btn_regular"
                            variant="outlined"
                            style={{
                                marginTop: "1rem",
                            }}
                            type="submit"
                        >
                            Submit
                        </Button>
                    </Box>
                </FormGroup>
            )}
        </Container>
    );
};

export default MyInfo;
