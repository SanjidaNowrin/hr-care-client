import React from "react";
import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));


const SalaryData = ({ employee }) => {
  const { name, email, year, fee } = employee;
  return (
    <>
      <StyledTableRow>
        <StyledTableCell component="th" scope="row">
          {name}
        </StyledTableCell>

        <StyledTableCell component="th" scope="row">
          {email}
        </StyledTableCell>

        <StyledTableCell component="th" scope="row">
          {year}
        </StyledTableCell>

        <StyledTableCell align="right" component="th" scope="row">
          {fee}
        </StyledTableCell>

      </StyledTableRow>
    </>
  );
};

export default SalaryData;
