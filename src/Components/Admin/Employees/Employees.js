import { Box, Container, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
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
    fetch('https://ancient-thicket-61342.herokuapp.com/employees')
      .then(res => res.json())
      .then(data => setEmployees(data.data))
  }, [])

  return (
    <Container>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          my: 5,
        }}
      >
        <Typography variant="h4" sx={{ margin: "0 auto", fontWeight: "700", color: "#01578A" }}>
          All Employee
        </Typography>
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell align="left">Phone</StyledTableCell>
              <StyledTableCell align="left">Department</StyledTableCell>
              <StyledTableCell align="left">Designation</StyledTableCell>
              <StyledTableCell align="right">Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employees.map((item) => (
              <Employee key={item.id} item={item}></Employee>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default Employees;
