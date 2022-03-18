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
  const { ID, name, designation, department, gross, bank, account } = props.employee;

  const basic = ((gross - 1850) / 1.5).toFixed(0);
  const payment = ((gross / 30) * props.date.length).toFixed(0);

  const dates = props.date;
  console.log(dates);
  const Present = dates.filter((date) => date?.status === "Present");
  const holidays = dates.filter((date) => date?.status === "Holiday");
  const Leaves = dates.filter((date) => date?.status === "Leave");

  return (
    <>

      <StyledTableRow>

        <StyledTableCell component="th" scope="row">
          {name} <br /> {ID}
        </StyledTableCell>

        <StyledTableCell component="th" scope="row">
          {designation} <br />{department}
        </StyledTableCell>

        <StyledTableCell component="th" scope="row">
          {basic} <br />{gross}
        </StyledTableCell>

        <StyledTableCell component="th" scope="row">
          <span style={{ textAlign: "center !important" }}>{dates?.length}</span> <br />{Present?.length} / {holidays?.length} / {Leaves?.length}
        </StyledTableCell>

        <StyledTableCell component="th" scope="row">
          {bank} <br />{account}
        </StyledTableCell>

        <StyledTableCell align="right" component="th" scope="row">
          {payment}
        </StyledTableCell>

      </StyledTableRow>

    </>
  );
};

export default SalaryData;
