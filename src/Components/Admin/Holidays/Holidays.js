import { Box, Breadcrumbs, Button, Container, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import Modal from "@mui/material/Modal";
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import Tooltip from "@mui/material/Tooltip";
import dateFormat from "../../Share/DateFormat/dateFormat";

// Breadcrumbs
import Chip from '@mui/material/Chip';
import { emphasize, styled } from '@mui/material/styles';
import HomeIcon from '@mui/icons-material/Home';
import { Link } from "react-router-dom";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: "#A3D2ED",
        color: theme.palette.common.black,
        fontSize: 24,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 18,
    },
}));

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 460,
    bgcolor: "background.paper",
    border: "1px solid var(--p_color)",
    boxShadow: 24,
    px: 5,
    py: 3,
};
const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
        border: 0,
    },
}));
toast.configure()

const Holidays = () => {
    const [holidays, setHolidays] = useState([]);
    const [employees, setEmployees] = useState([]);
    const [findDate, setFindDate] = useState([]);


    //current date
    const d = new Date();
    let year = d.getFullYear();
    //modal
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const { register, handleSubmit } = useForm();

    useEffect(() => {
        fetch("https://ancient-thicket-61342.herokuapp.com/holidays")
            .then((res) => res.json())
            .then((data) => setHolidays(data.data));
    }, [holidays]);

    useEffect(() => {
        fetch("https://ancient-thicket-61342.herokuapp.com/employees")
            .then((res) => res.json())
            .then((data) => setEmployees(data.result));
    }, []);

    useEffect(() => {
        findDate.map((onedate) => (
            fetch(`https://ancient-thicket-61342.herokuapp.com/attendance/${onedate._id}`, {
                method: "DELETE",
            })
        ))
    }, [findDate])

    const onSubmit = (data, e) => {
        fetch("https://ancient-thicket-61342.herokuapp.com/holidays", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(data),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.insertedId) {
                    // setReload(!reload);
                }
                setOpen(false)
            });


        const startDate = new Date(data.startDate);
        const endDate = new Date(data.endDate);

        for (let date = startDate; date <= endDate; new Date(date.setDate(date.getDate() + 1))) {

            const currentDate = dateFormat(date.toLocaleString().split(",")[0], 'yyyy-MM-dd');
            console.log(currentDate)

            employees.map((user) => (

                fetch("https://ancient-thicket-61342.herokuapp.com/attendance", {
                    method: "POST",
                    headers: { "content-type": "application/json" },
                    body: JSON.stringify({ ID: user?.ID, name: user?.name, email: user?.email, date: currentDate, holiday: data?.title, status: "Holiday" }),
                })
            ))

        }

        toast.success('Holiday added successfully 👌!', {
            position: toast.POSITION.BOTTOM_CENTER,
            autoClose: 4000
        })
        e.target.reset();
    };


    const handleDelete = (item) => {
        fetch(`https://ancient-thicket-61342.herokuapp.com/holidays/${item._id}`, {
            method: "DELETE",
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.deletedCount === 1) {
                    // setReload(!reload);
                }
            });

        const startDate = new Date(item.startDate);
        const endDate = new Date(item.endDate);

        for (let date = startDate; date <= endDate; new Date(date.setDate(date.getDate() + 1))) {

            const currentDate = dateFormat(date.toLocaleString().split(",")[0], 'yyyy-MM-dd');
            console.log(currentDate)

            fetch(`https://ancient-thicket-61342.herokuapp.com/attendance/date/${currentDate}`)
                .then((res) => res.json())
                .then((data) => setFindDate(data.result));

        }

        toast.success('Holiday deleted successfully 👌!', {
            position: toast.POSITION.BOTTOM_CENTER,
            autoClose: 4000
        })
    };

    // Breadcrumbs
    const StyledBreadcrumb = styled(Chip)(({ theme }) => {
        const backgroundColor =
            theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[800];
        return {
            backgroundColor,
            height: theme.spacing(3),
            color: theme.palette.text.primary,
            fontWeight: theme.typography.fontWeightRegular,
            '&:hover, &:focus': {
                backgroundColor: emphasize(backgroundColor, 0.06),
            },
            '&:active': {
                boxShadow: theme.shadows[1],
                backgroundColor: emphasize(backgroundColor, 0.12),
            },
        };
    });
    return (
        <Container>
            {/* Breadcrumbs */}
            <Box sx={{ mb: 4, display: { md: 'flex' }, alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                    <Typography
                        sx={{ mt: 2, color: 'var(--p_color)' }} variant="h4">
                        Holidays - {year}
                    </Typography>
                    <Breadcrumbs aria-label="breadcrumb">
                        <Link to="/dashboard">
                            <StyledBreadcrumb
                                to="/dashboard"
                                label="Dashboard"
                                icon={<HomeIcon fontSize="small" />}
                            />
                        </Link>
                        <Link to="/dashboard/holiday"><StyledBreadcrumb component="a" href="#" label="Holiday" /></Link>
                    </Breadcrumbs>
                </Box>

                <Button
                    onClick={handleOpen}
                    className="btn_regular"
                    sx={{ background: "var(--p_color) !important", color: "#fff !important", mt: { xs: 4, sm: 4 } }}
                >
                    <AddCircleOutlineOutlinedIcon sx={{ mr: 1 }} />
                    Add Holidays
                </Button>
            </Box>

            <TableContainer sx={{ maxWidth: { xs: '340px', sm: '100%', md: '100%' }, margin: 'auto' }} component={Paper}>
                <Table sx={{ width: '100%', overflowX: 'scroll', whiteSpace: 'nowrap' }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Holidays</StyledTableCell>
                            <StyledTableCell align="center">Start Date</StyledTableCell>
                            <StyledTableCell align="center">End Date</StyledTableCell>
                            <StyledTableCell align="right">Action</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {holidays.map((item) => (
                            <StyledTableRow>
                                <StyledTableCell component="th" scope="row">
                                    {item.title}
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                    {item.startDate}
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                    {item.endDate}
                                </StyledTableCell>
                                <StyledTableCell align="right">
                                    <Tooltip title="Delete">
                                        <DeleteOutlineOutlinedIcon sx={{ cursor: "pointer", color: "red" }}
                                            onClick={() => handleDelete(item)}
                                        />
                                    </Tooltip>
                                </StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {/* modal start */}
            <Modal
                keepMounted
                open={open}
                onClose={handleClose}
                aria-labelledby="keep-mounted-modal-title"
                aria-describedby="keep-mounted-modal-description"
            >
                <Box sx={style}>
                    <Typography
                        variant="h4"
                        sx={{ color: "var(--p_color)", textAlign: "center", mb: 3 }}
                    >
                        New Holiday
                    </Typography>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Box sx={{ mb: 2 }}>
                            <label style={{ display: "block" }} htmlFor="title">
                                Holiday Title <span style={{ color: "red" }}>*</span>
                            </label>
                            <TextField
                                sx={{ width: "100%" }}
                                variant="outlined"
                                id="title"
                                type="text"
                                {...register("title", { required: true })}
                            />
                        </Box>
                        <Box sx={{ mb: 2 }}>
                            <label style={{ display: "block" }} htmlFor="title">
                                Holiday Days <span style={{ color: "red" }}>*</span>
                            </label>
                            <TextField
                                sx={{ width: "100%" }}
                                variant="outlined"
                                id="title"
                                type="number"
                                {...register("days", { required: true })}
                            />
                        </Box>
                        <Box sx={{ mb: 2 }}>
                            <label style={{ display: "block" }} htmlFor="date">
                                Start Date <span style={{ color: "red" }}>*</span>
                            </label>
                            <TextField
                                sx={{ width: "100%" }}
                                variant="outlined"
                                id="date"
                                type="date"
                                {...register("startDate", { required: true })}
                            />
                        </Box>
                        <Box>
                            <label style={{ display: "block" }} htmlFor="date">
                                End Date <span style={{ color: "red" }}>*</span>
                            </label>
                            <TextField
                                sx={{ width: "100%" }}
                                variant="outlined"
                                id="date"
                                type="date"
                                {...register("endDate", { required: true })}
                            />
                        </Box>
                        <Box sx={{ textAlign: "center", mt: 3 }}>
                            <Button
                                sx={{
                                    background: "var(--p_color) !important",
                                    color: "#fff !important",
                                    width: "100%",
                                }}
                                className="btn_regular"
                                type="submit"
                            >
                                Add Holiday
                            </Button>
                        </Box>
                    </form>
                </Box>
            </Modal>
        </Container>
    );
};

export default Holidays;