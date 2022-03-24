import HomeIcon from "@mui/icons-material/Home";
import {
    Breadcrumbs,
    Button,
    Container,
    Table,
    TableBody,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Typography,
    Grid,
} from "@mui/material";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import { emphasize, styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import dateFormat from "../../Share/DateFormat/dateFormat";
import AttendanceManage from "./AttendanceManage";

import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: "#C0C0C0",
        color: theme.palette.common.black,
        fontSize: 24,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 18,
    },
}));

const AttendanceManages = () => {
    const [attendances, setAttendances] = useState([]);
    const [inputValue, setInputValue] = useState("");
    const { register, handleSubmit } = useForm();
    const [filterDates, setFilterDates] = useState([]);
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();
    const [filterData, setFilterData] = useState([]);

    //pagination
    const dataPerPage = 10;
    const [page, setPage] = React.useState(0);
    const [count, setCount] = useState(0)
    const handleChange = (event, value) => {
        setPage(value - 1);
    }
    console.log(page, count, attendances)

    // const attendanceLength = attendances.count;
    // console.log(attendanceLength);
    const buttonNumber = Math.ceil(count / 10);
    console.log(buttonNumber)

    //pagination end

    useEffect(() => {
        fetch(`https://ancient-thicket-61342.herokuapp.com/attendance?page=${page}&&size=${dataPerPage}`)
            .then((res) => res.json())
            .then((data) => {
                setCount(data.count)
                setAttendances(data.data)
            });
    }, [page]);

    useEffect(() => {
        const newFilterDate = attendances.filter((date) => date?.date >= startDate && date?.date <= endDate);
        setFilterDates(newFilterDate);
    }, [attendances, startDate, endDate]);

    const onSubmit = (data, e) => {
        const newStartDate = dateFormat(new Date(data.startDate), "yyyy-MM-dd");
        setStartDate(newStartDate);
        const newEndDate = dateFormat(new Date(data.endDate), "yyyy-MM-dd");
        setEndDate(newEndDate);

        toast.success("Filtering Attendance", {
            position: toast.POSITION.BOTTOM_CENTER,
            autoClose: 4000,
        });
    };
    const handleOnBlur = (e) => {
        const number = e.target.value;
        setInputValue(number);
    };

    // filter employees ID
    useEffect(() => {
        if (filterDates.length > 0) {
            const filterID = filterDates.filter((data) => data.ID === inputValue);
            if (filterID.length > 0 || inputValue > 0) {
                setFilterData(filterID);
            } else {
                setFilterData(filterDates);
            }
        } else {
            const filterID = attendances.filter((data) => data.ID === inputValue);
            if (filterID.length > 0 || inputValue > 0) {
                setFilterData(filterID);
            } else {
                setFilterData(attendances);
            }
        }
    }, [inputValue, attendances, filterDates]);

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
        <Container>
            {/* Breadcrumbs */}
            <Box sx={{ mb: 4 }}>
                <Typography sx={{ mt: 2, color: "var(--p_color)" }} variant="h4">
                    Attendance Manages
                </Typography>
                <Breadcrumbs aria-label="breadcrumb">
                    <Link to="/dashboard">
                        <StyledBreadcrumb to="/dashboard" label="Dashboard" icon={<HomeIcon fontSize="small" />} />
                    </Link>
                    <Link to="/dashboard/manage_attendance">
                        <StyledBreadcrumb component="a" href="#" label="Attendance Manages" />
                    </Link>
                </Breadcrumbs>
            </Box>

            {/* search box */}
            <Grid container spacing={2} sx={{ mb: 3, mt: 6 }}>
                <Grid item xs={12} md={5}>
                    <Box>
                        <TextField
                            placeholder="Search ID Card According to ID Number"
                            variant="outlined"
                            label="Search ID Card According to ID Number"
                            focused
                            onChange={handleOnBlur}
                            sx={{ width: "100%" }}
                        />
                    </Box>
                </Grid>

                <Grid item xs={12} md={7}>
                    <Box>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} md={4}>
                                    <TextField
                                        sx={{ width: "100%" }}
                                        {...register("startDate")}
                                        id="outlined-basic"
                                        type="date"
                                        variant="outlined"
                                        label="Start Date"
                                        focused
                                    />
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <TextField
                                        sx={{ width: "100%" }}
                                        {...register("endDate")}
                                        id="outlined-basic"
                                        type="date"
                                        variant="outlined"
                                        label="End Date"
                                        focused
                                    />
                                </Grid>
                                <Grid item xs={12} md={4} sx={{ display: 'flex', alignItems: 'center' }}>
                                    <Button
                                        sx={{
                                            background: "var(--p_color) !important",
                                            color: "#fff !important",
                                            width: "100%",
                                        }}
                                        className="btn_regular"
                                        type="Search"
                                    >
                                        Search
                                    </Button>
                                </Grid>
                            </Grid>
                        </form>
                    </Box>
                </Grid>
            </Grid>

            <TableContainer sx={{ maxWidth: { xs: '340px', sm: '100%', md: '100%' }, margin: 'auto', mb: 4 }} component={Paper}>
                <Table sx={{ width: '100%', overflowX: 'scroll', whiteSpace: 'nowrap' }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>ID</StyledTableCell>
                            <StyledTableCell align="left">Name</StyledTableCell>
                            <StyledTableCell align="left">Date</StyledTableCell>
                            <StyledTableCell align="center">Entry</StyledTableCell>
                            <StyledTableCell align="center">Leave</StyledTableCell>
                            <StyledTableCell align="right">Vacation</StyledTableCell>
                            <StyledTableCell align="right">Holiday</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filterData.map((attendance) => (
                            <AttendanceManage key={attendance._id} attendance={attendance}></AttendanceManage>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <div style={{ width: '40%', margin: '0 auto' }}>
                <Stack spacing={2}>
                    <Pagination onChange={handleChange} count={buttonNumber} color="primary" />
                </Stack>
            </div>
        </Container>
    );
};

export default AttendanceManages;
