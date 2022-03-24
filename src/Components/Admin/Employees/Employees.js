import { Box, Breadcrumbs, Container, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import HomeIcon from "@mui/icons-material/Home";
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
import { Link } from "react-router-dom";
import Employee from "./Employee/Employee";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: "#A3D2ED !important",
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
            .then((data) => setEmployees(data.result.reverse()));
    }, [employees]);
    console.log(employees);
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

            <Grid sx={{ mb: 4 }} container spacing={{ xs: 1, sm: 0, md: 0 }}>
                <Grid item xs={12} md={12}>
                    <TableContainer sx={{ maxWidth: { xs: '340px', sm: '100%', md: '100%' }, margin: 'auto' }} component={Paper} >
                        <Table sx={{ width: '100%', overflowX: 'scroll', whiteSpace: 'nowrap' }} aria-label="customized table">
                            <TableHead sx={{ background: 'var(--t_color) !important' }}>
                                <TableRow>
                                    <StyledTableCell
                                        sx={{ background: 'var(--t_color) !important' }}
                                    >
                                        Employee
                                    </StyledTableCell>


                                    <StyledTableCell
                                        sx={{ background: 'var(--t_color) !important' }}
                                        align="center"
                                    >
                                        Department
                                    </StyledTableCell>

                                    <StyledTableCell
                                        sx={{ background: 'var(--t_color) !important' }}
                                        align="center"
                                    >
                                        Designation
                                    </StyledTableCell>

                                    <StyledTableCell
                                        sx={{ background: 'var(--t_color) !important' }}
                                        align="center"
                                    >
                                        Status
                                    </StyledTableCell>

                                    <StyledTableCell
                                        sx={{ background: 'var(--t_color) !important' }}
                                        align="right"
                                    >
                                        Action
                                    </StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {employees?.map((item) => (
                                    <Employee key={item._id} item={item}></Employee>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Employees;
