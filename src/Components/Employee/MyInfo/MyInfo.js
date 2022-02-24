import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl as FormGroup,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import useAuth from "../../../hooks/useAuth";
import { useForm } from "react-hook-form";
import axios from "axios";
import Swal from "sweetalert2";

const MyInfo = () => {
  const { user } = useAuth();
  const { register, handleSubmit, reset } = useForm();
  const onSubmit = (data) => {
    axios.post("http://localhost:5000/employees", data);
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

  return (
    <>
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
          <TextField
            {...register("nid")}
            id="outlined-basic"
            label="NID"
            type="number"
            variant="outlined"
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

          <TextField
            {...register("lastCompany")}
            id="outlined-basic"
            label="Company"
            type="text"
            variant="outlined"
          />
          <TextField
            {...register("lastDepartment")}
            id="outlined-basic"
            label="Department"
            type="text"
            variant="outlined"
          />
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

          <TextField
            {...register("lastDegree")}
            id="outlined-basic"
            label="Degree"
            type="text"
            variant="outlined"
          />
          <TextField
            {...register("lastSubject")}
            id="outlined-basic"
            label="Subject"
            type="text"
            variant="outlined"
          />
          <TextField
            {...register("lastInstitute")}
            id="outlined-basic"
            label="Institute"
            type="text"
            variant="outlined"
          />
          <TextField
            {...register("lastGrade")}
            id="outlined-basic"
            label="Grade"
            type="text"
            variant="outlined"
          />
          <Button  className="btn_regular"
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
    </>
  );
};

export default MyInfo;
