import React from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { makeStyles } from "@mui/styles";

import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { Divider, FormGroup, Grid } from "@mui/material";
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  height: '90vh',
  width: { xs: '90%', md: '70%' },
  overflowY: 'scroll',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  borderRadius: '10px',
  boxShadow: 24,
  p: { xs: 2, sm: 4, md: 4 },
};

const EmployeeModal = ({ item }) => {
  const {
    _id,
    ID,
    DOJ,
    Gross,
    Account,
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
  } = item;
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    fetch(`https://ancient-thicket-61342.herokuapp.com/employees/${_id}`, {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
    Swal.fire("Employee Information Update Successfully");
    handleClose();
  };

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const useStyle = makeStyles({
    inputFiend: {
      width: '100% !important'
    },
    title: {
      margin: '15px 0 10px !important',
      fontSize: 'var(--PT_font)',
      fontWeight: '400 !important'
    },
    deleteBox: {
      position: 'sticky',
      background: '#fff',
      marginLeft: 'auto',
      top: '0',
      right: '0',
      height: '40px',
      width: '40px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: '50%',
      boxShadow: '1px 10px 30px #b6b7b7 !important',
      cursor: 'pointer',
      zIndex: '99'
    }
  })
  const { inputFiend, title, deleteBox } = useStyle();
  return (
    <>
      <Button onClick={handleOpen}>Edit</Button>
      <Modal
        keepMounted
        open={open}
        onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box sx={style}>
          <Box onClick={handleClose} className={deleteBox}>
            <CloseRoundedIcon sx={{ color: '#fb3e6a' }} />
          </Box>

          <Typography sx={{ mb: 4, color: 'var(--p_color)' }} variant="h4">
            <Divider textAlign="left">Employee Information</Divider>
          </Typography>

          <FormGroup sx={{ width: "100%" }} onSubmit={handleSubmit(onSubmit)}>
            <Box
              component="form"
            >
              <Grid container spacing={2} columns={{ xs: 4, sm: 8, md: 12 }}>
                {/* ID */}
                <Grid item xs={2} sm={4} md={6}>
                  <TextField
                    {...register("ID")}
                    id="outlined-basic"
                    label="Company Unique ID"
                    type="text"
                    variant="outlined"
                    value={ID}
                    required
                    className={inputFiend}
                  />
                </Grid>

                {/* DOJ */}
                <Grid item xs={2} sm={4} md={6}>
                  <TextField
                    {...register("DOJ")}
                    id="outlined-basic"
                    label="Date of Join"
                    type="date"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    variant="outlined"
                    defaultValue={DOJ}
                    required
                    className={inputFiend}
                  />
                </Grid>

                {/* Gross */}
                <Grid item xs={2} sm={4} md={6}>
                  <TextField
                    {...register("Gross")}
                    id="outlined-basic"
                    label="Gross Salary"
                    type="number"
                    variant="outlined"
                    defaultValue={Gross}
                    required
                    className={inputFiend}
                  />
                </Grid>

                {/* Account */}
                <Grid item xs={2} sm={4} md={6}>
                  <TextField
                    {...register("Account")}
                    id="outlined-basic"
                    label="Bank Account Number"
                    type="number"
                    variant="outlined"
                    defaultValue={Account}
                    required
                    className={inputFiend}
                  />
                </Grid>
              </Grid>

              {/* Primary */}
              <Typography className={title} variant="h6">
                Primary
              </Typography>
              <Grid container spacing={2} columns={{ xs: 4, sm: 8, md: 12 }}>
                {/* Employee name */}
                <Grid item xs={2} sm={4} md={6}>
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

                {/* email */}
                <Grid item xs={2} sm={4} md={6}>
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

                {/* father name */}
                <Grid item xs={2} sm={4} md={6}>
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
                <Grid item xs={2} sm={4} md={6}>
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

                {/* phone number */}
                <Grid item xs={2} sm={4} md={6}>
                  <TextField
                    {...register("phone")}
                    id="outlined-basic"
                    label="Cell Number"
                    type="number"
                    variant="outlined"
                    defaultValue={phone}
                    required
                    className={inputFiend}
                  />
                </Grid>

                {/* nid number */}
                <Grid item xs={2} sm={4} md={6}>
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
                <Grid item xs={2} sm={4} md={6}>
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

                {/* designation */}
                <Grid item xs={2} sm={4} md={6}>
                  <TextField
                    {...register("designation")}
                    id="outlined-basic"
                    label="Designation"
                    defaultValue={designation}
                    type="text"
                    variant="outlined"
                    required
                    className={inputFiend}
                  />
                </Grid>

                {/* department */}
                <Grid item xs={4} sm={8} md={12}>
                  <TextField
                    {...register("department")}
                    id="outlined-basic"
                    label="Department"
                    defaultValue={department}
                    required
                    className={inputFiend}
                  />
                </Grid>
              </Grid>

              {/* Exprience */}
              <Typography className={title} variant="h6">
                Exprience
              </Typography>
              <Grid container spacing={2} columns={{ xs: 4, sm: 8, md: 12 }}>
                {/* Company */}
                <Grid item xs={4} sm={8} md={12}>
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

                {/* Department */}
                <Grid item xs={2} sm={4} md={6}>
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

                {/* Designation */}
                <Grid item xs={2} sm={4} md={6}>
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

              {/* Education */}
              <Typography className={title} variant="h6">
                Education
              </Typography>
              <Grid container spacing={2} columns={{ xs: 4, sm: 8, md: 12 }}>

                {/* Institute */}
                <Grid item xs={2} sm={4} md={6}>
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
                <Grid item xs={2} sm={4} md={6}>
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
                <Grid item xs={2} sm={4} md={6}>
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
                <Grid item xs={2} sm={4} md={6}>
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

              <Button
                className="btn_regular"
                variant="outlined"
                type="submit"
                sx={{ width: '100%', mt: 2 }}
              >
                Update
              </Button>
            </Box>
          </FormGroup>
        </Box>
      </Modal>
    </>
  );
};

export default EmployeeModal;
