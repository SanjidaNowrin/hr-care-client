import HomeIcon from "@mui/icons-material/Home";
import {
    Breadcrumbs,
    Button,
    Container,
    Pagination,
    Stack,
    Table,
    TableBody,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Typography,
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

const AttendanceManages = () => {
    const [attendances, setAttendances] = useState([]);
    const [inputValue, setInputValue] = useState("");
    const { register, handleSubmit } = useForm();
    const [filterDates, setFilterDates] = useState([]);
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();
    const [filterData, setFilterData] = useState([]);
    const [finalData, setFinalData] = useState([])

    //pagination
    const dataPerPage = 10;
    const [page, setPage] = React.useState(1);
    const [count, setCount] = useState(0)
    const handleChange = (event, value) => {
        setPage(value);
    }
    console.log(page, count, attendances)

    // const attendanceLength = attendances.count;
    // console.log(attendanceLength);

    //pagination end
    const [search, setSearch] = useState([])
    // useEffect(() => {
    //     fetch(`https://ancient-thicket-61342.herokuapp.com/attendance?page=${page}&&size=${dataPerPage}`)
    //         .then((res) => res.json())
    //         .then((data) => {
    //             setCount(data.count)
    //             setAttendances(data.data)
    //         });
    // }, [page]);
    useEffect(() => {
        fetch(`https://ancient-thicket-61342.herokuapp.com/attendance`)
            .then((res) => res.json())
            .then((data) => {
                setFilterData(data.data)
                setAttendances(data.data)
            });
    }, []);
    // console.log(search)

    useEffect(() => {
        const newFilterDate = attendances.filter((date) => date?.date >= startDate && date?.date <= endDate);
        setFilterDates(newFilterDate);
    }, [attendances, startDate, endDate]);
    console.log(filterDates);

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
    console.log(filterData)
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
    //frontend pagination
    useEffect(() => {
        const indexOfLastPage = page * 10;
        const indexOfFirstPage = indexOfLastPage - 10;
        const currentData = filterData.slice(indexOfFirstPage, indexOfLastPage);
        const dataNumber = filterData.length;
        setCount(dataNumber);
        setFinalData(currentData);
        console.log(currentData);

        // if (page > 0) {

        // } else if (page === 0) {
        //     const currentData = filterData.slice(0, 10);
        //     const dataNumber = filterData.length;
        //     setCount(dataNumber);
        //     setFinalData(currentData)
        //     console.log(currentData)
        // }

        // console.log(indexOfLastPage, indexOfFirstPage, currentData)

    }, [attendances, startDate, endDate, page, inputValue, filterDates]);

    //pagination button number
    const buttonNumber = Math.ceil(count / 10);
    console.log(buttonNumber)


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
            <Box sx={{ display: "flex", width: "100%", justifyContent: "space-between", alignItems: "center", mb: 5 }}>
                <Box
                    sx={{
                        textAlign: "center",
                        width: "40%",
                        position: "relative",
                    }}
                    className="id_search"
                >
                    <label style={{ display: "block" }}>
                        <span style={{ display: "flex", alignItems: "start" }}>Search by Id</span>
                    </label>
                    <TextField
                        placeholder="Search ID Card According to ID Number"
                        variant="outlined"
                        onChange={handleOnBlur}
                        sx={{ width: "100%" }}
                    />
                </Box>
                <Box
                    sx={{
                        textAlign: "center",
                        width: "50%",
                        margin: "0 auto",
                        position: "relative",
                    }}
                    className="id_search"
                >
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Box sx={{ display: "flex", width: "100%", justifyContent: "space-between", alignItems: "center" }}>
                            <Box sx={{ width: "35%" }}>
                                <label style={{ display: "block" }}>
                                    <span style={{ display: "flex", alignItems: "start" }}>Start Date</span>
                                </label>
                                <TextField
                                    sx={{ width: "100%" }}
                                    {...register("startDate")}
                                    id="outlined-basic"
                                    type="date"
                                    variant="outlined"
                                />
                            </Box>
                            <Box sx={{ width: "35%" }}>
                                <label style={{ display: "block" }}>
                                    <span style={{ display: "flex", alignItems: "start" }}>End Date</span>
                                </label>
                                <TextField
                                    sx={{ width: "100%" }}
                                    {...register("endDate")}
                                    id="outlined-basic"
                                    type="date"
                                    variant="outlined"
                                />
                            </Box>
                            <Box sx={{ width: "20%", mt: 3 }}>
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
                            </Box>
                        </Box>
                    </form>
                </Box>
            </Box>

            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
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
                        {finalData.map((attendance) => (
                            <AttendanceManage key={attendance._id} attendance={attendance}></AttendanceManage>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
                <Stack spacing={2}>
                    <Pagination onChange={handleChange} count={buttonNumber} color="primary" />
                </Stack>
            </Box>
        </Container>
    );
};

export default AttendanceManages;