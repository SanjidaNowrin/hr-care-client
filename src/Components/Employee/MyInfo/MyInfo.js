import HomeIcon from "@mui/icons-material/Home";
import {
    Box,
    Breadcrumbs,
    Button,
    Container,
    Divider,
    FormControl as FormGroup,
    Grid,
    MenuItem,
    TextField,
    Typography,
} from "@mui/material";
// Breadcrumbs
import Chip from "@mui/material/Chip";
import { emphasize, styled } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import QRCode from "qrcode";
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
    // const birthArray = info.birth.split("-");
    // const birth = birthArray.join("");
    const uniqueId = first + "-" + 1100 + randomNumber;
    return uniqueId;
};
const MyInfo = () => {
    const { user } = useAuth();
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

    //qrcode
    const [text, setText] = useState(user?.email);
    const [qrUrl, setQrUrl] = useState(null);
    const generateQrCode = async () => {
        try {
            const response = await QRCode.toDataURL(text);
            setQrUrl(response);
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    };

    const onSubmit = async (data) => {
        const response = await QRCode.toDataURL(text);
        data.qrUrl = response;
        data.image = image;
        const ID = getUniqueId(data);
        data.ID = ID;
        fetch("https://ancient-thicket-61342.herokuapp.com/employees", {
            method: "POST",
            headers: { "content-type": "application/json" },
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

    const departmentChange = (event) => {
        setDepartment(event.target.value);
    };

    const gendars = [
        {
            value: "Male",
            label: "Male",
        },
        {
            value: "Female",
            label: "Female",
        },
    ];

    const [gendar, setGendar] = useState();

    const gendarChange = (event) => {
        setGendar(event.target.value);
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

    const useStyle = makeStyles({
        inputFiend: {
            width: "100% !important",
        },
    });
    const { inputFiend } = useStyle();

    return (
        <Container style={{}}>
            {/* Breadcrumbs */}
            <Box sx={{ mb: 4 }}>
                <Typography sx={{ mt: 2, color: "var(--p_color)" }} variant="h4">
                    My Information
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
                    <Box component="form">
                        <Typography sx={{ mb: 3 }} variant="h4">
                            <Divider textAlign="right">Fill Your Information</Divider>
                        </Typography>

                        <Grid container spacing={2} columns={{ xs: 4, sm: 8, md: 12 }}>
                            {/* name */}
                            <Grid item xs={2} sm={4} md={4}>
                                <TextField
                                    {...register("name")}
                                    id="outlined-basic"
                                    label="Name"
                                    type="text"
                                    variant="outlined"
                                    defaultValue={user?.displayName}
                                    required
                                    className={inputFiend}
                                />
                            </Grid>

                            {/* father name */}
                            <Grid item xs={2} sm={4} md={4}>
                                <TextField
                                    {...register("father")}
                                    id="outlined-basic"
                                    label="Father's Name"
                                    type="text"
                                    variant="outlined"
                                    required
                                    className={inputFiend}
                                />
                            </Grid>

                            {/* mother name */}
                            <Grid item xs={2} sm={4} md={4}>
                                <TextField
                                    {...register("mother")}
                                    id="outlined-basic"
                                    label="Mother's Name"
                                    type="text"
                                    variant="outlined"
                                    required
                                    className={inputFiend}
                                />
                            </Grid>

                            {/* email address */}
                            <Grid item xs={2} sm={4} md={4}>
                                <TextField
                                    {...register("email")}
                                    id="outlined-basic"
                                    label="Email"
                                    type="email"
                                    variant="outlined"
                                    value={user?.email}
                                    required
                                    className={inputFiend}
                                />
                            </Grid>

                            {/* phone number */}
                            <Grid item xs={2} sm={4} md={4}>
                                <TextField
                                    {...register("phone")}
                                    id="outlined-basic"
                                    label="Cell Number"
                                    type="String"
                                    variant="outlined"
                                    required
                                    className={inputFiend}
                                />
                            </Grid>

                            {/* nid number */}
                            <Grid item xs={2} sm={4} md={4}>
                                <TextField
                                    {...register("nid")}
                                    id="outlined-basic"
                                    label="NID"
                                    type="number"
                                    variant="outlined"
                                    required
                                    className={inputFiend}
                                />
                            </Grid>

                            {/* birthday */}
                            <Grid item xs={2} sm={4} md={4}>
                                <TextField
                                    {...register("birth")}
                                    id="date"
                                    label="Dath of Birth"
                                    type="date"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    required
                                    className={inputFiend}
                                />
                            </Grid>

                            {/* Gendar */}
                            <Grid item xs={2} sm={4} md={4}>
                                <TextField
                                    {...register("gendar")}
                                    id="outlined-select-currency"
                                    select
                                    label="Gendar"
                                    value={gendar}
                                    onChange={gendarChange}
                                    required
                                    className={inputFiend}
                                >
                                    {gendars.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>

                            {/* department */}
                            <Grid item xs={2} sm={4} md={4}>
                                <TextField
                                    {...register("department")}
                                    id="outlined-select-currency"
                                    select
                                    label="Department"
                                    value={department}
                                    onChange={departmentChange}
                                    required
                                    className={inputFiend}
                                >
                                    {departments.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>

                            {/* designation */}
                            <Grid item xs={2} sm={4} md={4}>
                                <TextField
                                    {...register("designation")}
                                    id="outlined-basic"
                                    label="Designation"
                                    type="text"
                                    variant="outlined"
                                    required
                                    className={inputFiend}
                                />
                            </Grid>

                            {/* bank */}
                            <Grid item xs={2} sm={4} md={4}>
                                <TextField
                                    {...register("bank")}
                                    id="outlined-basic"
                                    label="Bank Name"
                                    type="text"
                                    variant="outlined"
                                    required
                                    className={inputFiend}
                                />
                            </Grid>

                            {/* Account */}
                            <Grid item xs={2} sm={4} md={4}>
                                <TextField
                                    {...register("account")}
                                    id="outlined-basic"
                                    label="Bank Account Number"
                                    type="number"
                                    variant="outlined"
                                    required
                                    className={inputFiend}
                                />
                            </Grid>

                            {/* blood */}
                            <Grid item xs={2} sm={4} md={4}>
                                <TextField
                                    {...register("blood")}
                                    id="outlined-basic"
                                    label="Blood Group"
                                    type="text"
                                    variant="outlined"
                                    className={inputFiend}
                                />
                            </Grid>

                            {/* status */}
                            <Grid item xs={2} sm={4} md={4}>
                                <TextField
                                    {...register("status")}
                                    id="outlined-basic"
                                    label="Status"
                                    type="text"
                                    variant="outlined"
                                    value="Pending"
                                    required
                                    className={inputFiend}
                                />
                            </Grid>

                        </Grid>


                        {/* Experience */}
                        <Typography variant="h5" sx={{ mt: 3, mb: 1, fontFamily: "var(--PT_font)" }}>
                            Experience
                        </Typography>
                        <Grid container spacing={2} columns={{ xs: 4, sm: 8, md: 12 }}>
                            {/* lastCompany */}
                            <Grid item xs={4} sm={8} md={4}>
                                <TextField
                                    {...register("lastCompany")}
                                    id="outlined-basic"
                                    label="Company"
                                    type="text"
                                    variant="outlined"
                                    className={inputFiend}
                                />
                            </Grid>

                            {/* lastDepartment */}
                            <Grid item xs={2} sm={4} md={4}>
                                <TextField
                                    {...register("lastDepartment")}
                                    id="outlined-basic"
                                    label="Department"
                                    type="text"
                                    variant="outlined"
                                    className={inputFiend}
                                />
                            </Grid>

                            {/* lastDesignation */}
                            <Grid item xs={2} sm={4} md={4}>
                                <TextField
                                    {...register("lastDesignation")}
                                    id="outlined-basic"
                                    label="Designation"
                                    type="text"
                                    variant="outlined"
                                    className={inputFiend}
                                />
                            </Grid>
                        </Grid>

                        {/* Education information */}
                        <Typography variant="h5" sx={{ mt: 3, mb: 1, fontFamily: "var(--PT_font)" }}>
                            Education
                        </Typography>
                        <Grid container spacing={2} columns={{ xs: 4, sm: 8, md: 12 }}>
                            {/* Institute */}
                            <Grid item xs={4} sm={4} md={12}>
                                <TextField
                                    {...register("lastInstitute")}
                                    id="outlined-basic"
                                    label="Institute"
                                    type="text"
                                    variant="outlined"
                                    className={inputFiend}
                                />
                            </Grid>

                            {/* Subject */}
                            <Grid item xs={4} sm={4} md={4}>
                                <TextField
                                    {...register("lastSubject")}
                                    id="outlined-basic"
                                    label="Subject"
                                    type="text"
                                    variant="outlined"
                                    className={inputFiend}
                                />
                            </Grid>

                            {/* Degree */}
                            <Grid item xs={2} sm={4} md={4}>
                                <TextField
                                    {...register("lastDegree")}
                                    id="outlined-basic"
                                    label="Degree"
                                    type="text"
                                    variant="outlined"
                                    className={inputFiend}
                                />
                            </Grid>

                            {/* Grade */}
                            <Grid item xs={2} sm={4} md={4}>
                                <TextField
                                    {...register("lastGrade")}
                                    id="outlined-basic"
                                    label="Grade"
                                    type="text"
                                    variant="outlined"
                                    className={inputFiend}
                                />
                            </Grid>
                        </Grid>

                        {/* Signature */}
                        <Typography variant="h5" sx={{ mt: 3, fontFamily: "var(--PT_font)" }}>
                            Signature
                        </Typography>
                        <Typography variant="body2">
                            After providing your signature, it must be saved <span style={{ color: "red" }}>*</span>
                        </Typography>
                        <Grid container spacing={2} columns={{ xs: 4, sm: 8, md: 12 }}>
                            <Grid item xs={4} sm={4} md={4}>
                                <Box sx={{ border: "1px solid var(--p_color)" }}>
                                    <SignaturePad {...register("image")} ref={sigPad} penColor="green" />

                                    <Box
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "space-evenly",
                                            marginBottom: "4px",
                                        }}
                                    >
                                        <Button className="btn_regular" onClick={clear}>
                                            Clear
                                        </Button>
                                        <Button className="btn_regular" onClick={save}>
                                            Save
                                        </Button>
                                        <Button className="btn_regular" onClick={show}>
                                            Show
                                        </Button>
                                    </Box>
                                </Box>
                            </Grid>
                        </Grid>

                        <Button className="btn_regular" variant="outlined" type="submit" sx={{ mt: 2, mb: 4 }}>
                            Submit
                        </Button>
                    </Box>
                </FormGroup>
            )}
        </Container>
    );
};

export default MyInfo;
