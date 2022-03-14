import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import {
  Box,
  Button,
  Container,
  FormControl as FormGroup,
  TextField,
  Typography,
} from "@mui/material";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    width: "80%",
    height: "95vh",
    overflow: "scroll",
  },
}));

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
    console.log(data);
  };
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Container>
      <button type="button" onClick={handleOpen}>
        EDIT
      </button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box className={classes.paper}>
            <Typography
              style={{
                textAlign: "center",
                fontWeight: "500",
                marginTop: "2rem",
                marginBottom: "2rem",
              }}
              variant="h4"
            >
              Employee <span style={{ color: "var(--p_color)" }}>Information</span>
            </Typography>
            <FormGroup sx={{ width: "100%" }} onSubmit={handleSubmit(onSubmit)}>
              <Box
                component="form"
                sx={{
                  "& > :not(style)": { m: 1, width: "45%" },
                }}
              >
                <Typography sx={{ m: 2 }} variant="h5">
                  Admin Fill Up
                </Typography>

                <TextField
                  {...register("ID")}
                  id="outlined-basic"
                  label="Company Unique ID"
                  type="text"
                  variant="outlined"
                  value={ID}
                  required
                />
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
                />
                <TextField
                  {...register("Gross")}
                  id="outlined-basic"
                  label="Gross Salary"
                  type="number"
                  variant="outlined"
                  defaultValue={Gross}
                  required
                />
                <TextField
                  {...register("Account")}
                  id="outlined-basic"
                  label="Bank Account Number"
                  type="number"
                  variant="outlined"
                  defaultValue={Account}
                  required
                />

                <Typography sx={{ m: 2 }} variant="h5">
                  Primary
                </Typography>

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
                  type="number"
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
                  id="outlined-basic"
                  label="Department"
                  defaultValue={department}
                  helperText=" Department"
                  required
                ></TextField>
                <TextField
                  {...register("designation")}
                  id="outlined-basic"
                  label="Designation"
                  defaultValue={designation}
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
          </Box>
        </Fade>
      </Modal>
    </Container>
  );
};

export default EmployeeModal;
