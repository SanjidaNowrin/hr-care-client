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
const SalaryData = (props) => {
  const { ID, name, designation, department, Gross } = props.employee;

  const basic = ((Gross - 1850) / 1.5).toFixed(0);
  const payment = ((Gross / 30) * props.date.length).toFixed(0);

  console.log(props.date);

  return (
    <>

      <StyledTableRow>

        <StyledTableCell component="th" scope="row">
          {ID}
        </StyledTableCell>
        <StyledTableCell component="th" scope="row">
          {name}
        </StyledTableCell>

        <StyledTableCell component="th" scope="row">
          {designation}
        </StyledTableCell>
        <StyledTableCell component="th" scope="row">
          {department}
        </StyledTableCell>

        <StyledTableCell component="th" scope="row">
          {basic}
        </StyledTableCell>
        <StyledTableCell component="th" scope="row">
          {Gross}
        </StyledTableCell>

        <StyledTableCell component="th" scope="row">
          {props.date.length}
        </StyledTableCell>

        <StyledTableCell align="right" component="th" scope="row">
          {payment}
        </StyledTableCell>

      </StyledTableRow>

    </>
  );
};

export default SalaryData;
