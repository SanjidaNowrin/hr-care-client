import React, { useState, useRef } from "react";
import {
    Box,
    Button,
    FormControl as FormGroup,
    MenuItem,
    TextField,
    Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import SignaturePad from "react-signature-pad-wrapper";
const MyInfoUpdate = ({ oneEmployee }) => {
    const {
        _id,
        name,
        father,
        mother,
        email,
        phone,
        nid,
        birth,
        department,
        designation,
        lastCompany,
        lastDepartment,
        lastDesignation,
        lastDegree,
        lastSubject,
        lastInstitute,
        lastGrade,
    } = oneEmployee;

    const { register, handleSubmit, reset } = useForm();
    const [image, setImage] = useState(null);
    //signature
    let sigPad = useRef({});
    let signature = "";
    function clear() {
        sigPad.current.clear();
    }
    function save() {
        setImage(sigPad.current.toDataURL());
    }
    console.log(image);
    function show() {
        sigPad.current.fromDataURL(signature);
    }
    const onUpdate = (data) => {
        data.image = image;
        console.log(data);
        fetch(`http://localhost:5000/employees/${_id}`, {
            method: "PUT",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(data),
        })
            .then((response) => response.json())
            .then((result) => {
                console.log("success", result);
            })
            .catch((error) => {
                console.error("error", error);
            });
        reset();
        Swal.fire({
            position: "middle",
            icon: "success",
            title: "Employee Information Update Successfully",
            showConfirmButton: false,
            timer: 2000,
        });
    };

    const [onedepartment, setDepartment] = useState();

    const handleChange = (event) => {
        setDepartment(event.target.value);
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

    return (
        <>
            <FormGroup sx={{ width: "100%" }} onSubmit={handleSubmit(onUpdate)}>
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
                        defaultValue={name}
                        required
                    />
                    <TextField
                        {...register("father")}
                        id="outlined-basic"
                        label="Father's Name"
                        type="text"
                        variant="outlined"
                        defaultValue={father}
                        required
                    />
                    <TextField
                        {...register("mother")}
                        id="outlined-basic"
                        label="Mother's Name"
                        type="text"
                        variant="outlined"
                        defaultValue={mother}
                        required
                    />
                    <TextField
                        {...register("email")}
                        id="outlined-basic"
                        label="Email"
                        type="email"
                        variant="outlined"
                        value={email}
                        required
                    />
                    <TextField
                        {...register("phone")}
                        id="outlined-basic"
                        label="Cell Number"
                        type="String"
                        variant="outlined"
                        defaultValue={phone}
                        required
                    />
                    <TextField
                        {...register("nid")}
                        id="outlined-basic"
                        label="NID"
                        type="number"
                        variant="outlined"
                        defaultValue={nid}
                        required
                    />
                    <TextField
                        {...register("birth")}
                        id="date"
                        label="Dath of Birth"
                        type="date"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        defaultValue={birth}
                        required
                    />
                    <TextField
                        {...register("department")}
                        id="outlined-select-currency"
                        select
                        label="Department"
                        defaultValue={department ? department : onedepartment}
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
                        defaultValue={designation}
                        required
                    />

                    <Typography sx={{ m: 2 }} variant="h5">
                        Experience
                    </Typography>

                    <TextField
                        {...register("lastCompany")}
                        id="outlined-basic"
                        label="Company"
                        type="text"
                        variant="outlined"
                        defaultValue={lastCompany}
                    />
                    <TextField
                        {...register("lastDepartment")}
                        id="outlined-basic"
                        label="Department"
                        type="text"
                        variant="outlined"
                        defaultValue={lastDepartment}
                    />
                    <TextField
                        {...register("lastDesignation")}
                        id="outlined-basic"
                        label="Designation"
                        type="text"
                        variant="outlined"
                        defaultValue={lastDesignation}
                    />

                    <Typography sx={{ m: 2 }} variant="h5">
                        Education information
                    </Typography>

                    <TextField
                        {...register("lastDegree")}
                        id="outlined-basic"
                        label="Degree"
                        type="text"
                        variant="outlined"
                        defaultValue={lastDegree}
                    />
                    <TextField
                        {...register("lastSubject")}
                        id="outlined-basic"
                        label="Subject"
                        type="text"
                        variant="outlined"
                        defaultValue={lastSubject}
                    />
                    <TextField
                        {...register("lastInstitute")}
                        id="outlined-basic"
                        label="Institute"
                        type="text"
                        variant="outlined"
                        defaultValue={lastInstitute}
                    />
                    <TextField
                        {...register("lastGrade")}
                        id="outlined-basic"
                        label="Grade"
                        type="text"
                        variant="outlined"
                        defaultValue={lastGrade}
                    />
                    <Box sx={{ border: "1px solid black" }}>
                        <Button onClick={clear}>Clear</Button>
                        <Button onClick={save}>Save</Button>
                        <Button onClick={show}>Show</Button>
                        <SignaturePad
                            {...register("image")}
                            ref={sigPad}
                            penColor="green"
                        />
                        <small sx={{ textAlign: "center" }}>After providing your signature, it must be saved</small>
                    </Box>
                    <Button
                        className="btn_regular"
                        variant="outlined"
                        style={{
                            marginTop: "1rem",
                        }}
                        type="submit"
                    >
                        Update
                    </Button>
                </Box>
            </FormGroup>
        </>
    );
};

export default MyInfoUpdate;