import React, { useState, useRef } from "react";
import {
  Box,
  Button,
  Divider,
  FormControl as FormGroup,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import SignaturePad from "react-signature-pad-wrapper";
import { makeStyles } from "@mui/styles";
import QRCode from "qrcode";
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
    gendar,
    blood,
    department,
    designation,
    bank,
    account,
    status,
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
  function clear() {
    sigPad.current.clear();
  }
  function save() {
    setImage(sigPad.current.toDataURL());
  }

  function show() {
    sigPad.current.fromDataURL(image);
  }
  const onUpdate = (data) => {
    data.image = image;
    fetch(`https://hr-care.onrender.com/employees/${_id}`, {
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

  const [onegendar, setGendar] = useState();

  const gendarChange = (event) => {
    setGendar(event.target.value);
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

  const useStyle = makeStyles({
    inputFiend: {
      width: "100% !important",
    },
  });
  const { inputFiend } = useStyle();

  return (
    <>
      <FormGroup sx={{ width: "100%" }} onSubmit={handleSubmit(onUpdate)}>
        <Box component="form">
          <Typography
            sx={{ mb: 3, fontSize: { xs: "1.6rem", sm: "2rem", md: "2.2rem" } }}
            variant="h4"
          >
            <Divider textAlign="right">Update Your Information</Divider>
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
                defaultValue={name}
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
                defaultValue={father}
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
                defaultValue={mother}
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
                value={email}
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
                defaultValue={phone}
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
                defaultValue={nid}
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
                defaultValue={birth}
                required
                className={inputFiend}
              />
            </Grid>

            {/* gendar */}
            <Grid item xs={2} sm={4} md={4}>
              <TextField
                {...register("gendar")}
                id="outlined-select-currency"
                select
                label="Gendar"
                defaultValue={gendar ? gendar : onegendar}
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
                defaultValue={department ? department : onedepartment}
                onChange={handleChange}
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
                defaultValue={designation}
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
                defaultValue={bank}
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
                defaultValue={account}
                required
                className={inputFiend}
              />
            </Grid>

            <Grid item xs={2} sm={4} md={4}>
              <TextField
                {...register("blood")}
                id="outlined-basic"
                label="Blood Group"
                type="text"
                variant="outlined"
                defaultValue={blood}
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
                value={status}
                required
                className={inputFiend}
              />
            </Grid>
          </Grid>

          {/* Experience */}
          <Typography
            variant="h5"
            sx={{ mt: 3, mb: 1, fontFamily: "var(--PT_font)" }}
          >
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
                defaultValue={lastCompany}
                className={inputFiend}
              />
            </Grid>

            {/* lastDepartment */}
            <Grid item xs={4} sm={8} md={4}>
              <TextField
                {...register("lastDepartment")}
                id="outlined-basic"
                label="Department"
                type="text"
                variant="outlined"
                defaultValue={lastDepartment}
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
                defaultValue={lastDesignation}
                className={inputFiend}
              />
            </Grid>
          </Grid>

          {/* Education information */}
          <Typography
            variant="h5"
            sx={{ mt: 3, mb: 1, fontFamily: "var(--PT_font)" }}
          >
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
                defaultValue={lastInstitute}
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
                defaultValue={lastSubject}
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
                defaultValue={lastDegree}
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
                defaultValue={lastGrade}
                className={inputFiend}
              />
            </Grid>
          </Grid>

          {/* Signature */}
          <Typography variant="h5" sx={{ mt: 3, fontFamily: "var(--PT_font)" }}>
            Signature
          </Typography>
          <Typography variant="body2">
            After providing your signature, it must be saved{" "}
            <span style={{ color: "red" }}>*</span>
          </Typography>
          <Grid container spacing={2} columns={{ xs: 4, sm: 8, md: 12 }}>
            <Grid item xs={4} sm={4} md={4}>
              <Box sx={{ border: "1px solid var(--p_color)" }}>
                <SignaturePad
                  {...register("image")}
                  ref={sigPad}
                  penColor="green"
                />

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

          <Button
            className="btn_regular"
            variant="outlined"
            type="submit"
            sx={{ mt: 2, mb: 4 }}
          >
            Update
          </Button>
        </Box>
      </FormGroup>
    </>
  );
};

export default MyInfoUpdate;
