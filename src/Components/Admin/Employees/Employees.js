import HomeIcon from "@mui/icons-material/Home";
import { Box, Breadcrumbs, Container, Typography } from "@mui/material";
// Breadcrumbs
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import { emphasize, styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Employee from "./Employee/Employee";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: "#a3d2ed",
        color: theme.palette.common.black,
        fontSize: 24,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 18,
    },
}));

const Employees = () => {
    const [employees, setEmployees] = useState([]);
    useEffect(() => {
        fetch("https://ancient-thicket-61342.herokuapp.com/employees")
            .then((res) => res.json())
            .then((data) => setEmployees(data.data));
    }, [employees]);

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
                    All Employees
                </Typography>
                <Breadcrumbs aria-label="breadcrumb">
                    <Link to="/dashboard">
                        <StyledBreadcrumb to="/dashboard" label="Dashboard" icon={<HomeIcon fontSize="small" />} />
                    </Link>
                    <Link to="/dashboard/all_employees">
                        <StyledBreadcrumb component="a" href="#" label="All Employees" />
                    </Link>
                </Breadcrumbs>
            </Box>

            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead sx={{ background: "var(--p_color) !important" }}>
                        <TableRow>
                            <StyledTableCell sx={{ color: "#fff !important", background: "var(--p_color) !important" }}>
                                Employee
                            </StyledTableCell>

                            <StyledTableCell sx={{ color: "#fff !important", background: "var(--p_color) !important" }} align="left">
                                Phone
                            </StyledTableCell>

                            <StyledTableCell sx={{ color: "#fff !important", background: "var(--p_color) !important" }} align="center">
                                Department
                            </StyledTableCell>

                            <StyledTableCell sx={{ color: "#fff !important", background: "var(--p_color) !important" }} align="center">
                                Designation
                            </StyledTableCell>

                            <StyledTableCell sx={{ color: "#fff !important", background: "var(--p_color) !important" }} align="right">
                                Action
                            </StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {employees.map((item) => (
                            <Employee key={item._id} item={item}></Employee>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
};

export default Employees;
