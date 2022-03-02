import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { useForm } from "react-hook-form";
import axios from "axios";
import Swal from "sweetalert2";
import {
    Box,
    Button,
    FormControl as FormGroup,
    MenuItem,
    TextField,
    Typography,
} from "@mui/material";
import { width } from '@mui/system';

const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        width: '85%',
        height: '95vh',
        overflow: "scroll"
    },
}));

const EmployeeModal = ({ item }) => {
    const { id, name, father, mother, email, phone, nid, birth, department, designation } = item
    console.log(item);
    const { register, handleSubmit, reset } = useForm();
    const onSubmit = (data) => {
        console.log(data)
        axios.put(`https://ancient-thicket-61342.herokuapp.com/employees/${id}`, data);
        reset();
        Swal.fire({
            position: "middle",
            icon: "success",
            title: "Employee Information Update Successfully",
            showConfirmButton: false,
            timer: 2000,
        });
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
        <div>
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
                    <div className={classes.paper}>
                        <Typography
                            style={{
                                textAlign: "center",
                                fontWeight: "500",
                                marginTop: "2rem",
                                marginBottom: "2rem",
                            }}
                            variant="h4"
                        >
                            Employee <span style={{ color: " #01578A" }}>Information</span>
                        </Typography>
                        <FormGroup onSubmit={handleSubmit(onSubmit)}>
                            <Box
                                component="form"
                                sx={{
                                    "& > :not(style)": { m: 1, width: "200px" },
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
                                    required
                                />
                                <TextField
                                    {...register("DOJ")}
                                    id="outlined-basic"
                                    label="Date of Join"
                                    type="text"
                                    variant="outlined"
                                    required
                                />
                                <TextField
                                    {...register("Gross")}
                                    id="outlined-basic"
                                    label="Gross Salary"
                                    type="text"
                                    variant="outlined"
                                    required
                                />
                                <TextField
                                    {...register("Account")}
                                    id="outlined-basic"
                                    label="Bank Account Number"
                                    type="number"
                                    variant="outlined"
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
                                    value={name}
                                    required
                                />
                                <TextField
                                    {...register("father")}
                                    id="outlined-basic"
                                    label="Father's Name"
                                    type="text"
                                    variant="outlined"
                                    value={father}
                                    required
                                />
                                <TextField
                                    {...register("mother")}
                                    id="outlined-basic"
                                    label="Mother's Name"
                                    type="text"
                                    variant="outlined"
                                    value={mother}
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
                                    value={phone}
                                    required
                                />
                                <TextField
                                    {...register("nid")}
                                    id="outlined-basic"
                                    label="NID"
                                    type="number"
                                    variant="outlined"
                                    value={nid}
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
                                    value={birth}
                                    required
                                />
                                <TextField
                                    {...register("department")}
                                    id="outlined-basic"

                                    label="Department"
                                    value={department}

                                    helperText=" Department"
                                    required
                                >

                                </TextField>
                                <TextField
                                    {...register("designation")}
                                    id="outlined-basic"
                                    label="Designation"
                                    value={designation}
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
                                    Education
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
                                <Button
                                    variant="outlined"
                                    style={{
                                        backgroundColor: "#01578A",
                                        color: "white",
                                        marginTop: "1rem",
                                    }}
                                    type="submit"
                                >
                                    Submit
                                </Button>
                            </Box>
                        </FormGroup>
                    </div>
                </Fade>
            </Modal>
        </div>
    );
};

export default EmployeeModal;