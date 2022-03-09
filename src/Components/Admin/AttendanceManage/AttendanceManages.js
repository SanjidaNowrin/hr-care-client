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
} from "@mui/material";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import { emphasize, styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AttendanceManage from "./AttendanceManage";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: "#00D2FC",
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
    const [filterData, setFilterData] = useState([]);

    useEffect(() => {
        fetch("https://ancient-thicket-61342.herokuapp.com/attendance")
            .then((res) => res.json())
            .then((data) => setAttendances(data.data));
    }, []);

    const handleOnBlur = (e) => {
        const number = e.target.value;
        setInputValue(number);
    };

    // filter employees ID
    useEffect(() => {
        const filterID = attendances.filter((data) => data.ID === inputValue);
        if (filterID.length > 0 || inputValue > 0) {
            setFilterData(filterID);
        } else {
            setFilterData(attendances);
        }
    }, [inputValue, attendances]);

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
            <Box
                sx={{
                    textAlign: "center",
                    width: { xs: "80%", sm: "90%", md: "50%" },
                    margin: "0 auto",
                    position: "relative",
                    mb: 6,
                }}
                className="id_search"
            >
                <TextField
                    placeholder="Search ID Card According to ID Number"
                    variant="outlined"
                    onChange={handleOnBlur}
                    sx={{ width: "100%" }}
                />

                <Button
                    sx={{
                        position: "absolute",
                        top: "50%",
                        right: "-45px",
                        transform: "translate(-50%, -50%)",
                    }}
                    className="btn_regular"
                >
                    Search
                </Button>
            </Box>

            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>ID</StyledTableCell>
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
        </Container>
    );
};

export default AttendanceManages;
