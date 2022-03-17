import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import React from "react";

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

const AttendanceManage = ({ attendance }) => {
    const { ID, name, entry, leave, date, vacation, holiday } = attendance;

    return (
        <>
            <StyledTableRow>
                <StyledTableCell component="th" scope="row">
                    {ID}
                </StyledTableCell>
                <StyledTableCell align="left">{name}</StyledTableCell>
                <StyledTableCell align="left">{date}</StyledTableCell>
                <StyledTableCell align="center">{entry}</StyledTableCell>
                <StyledTableCell align="center">{leave}</StyledTableCell>
                <StyledTableCell align="right">{vacation}</StyledTableCell>
                <StyledTableCell align="right">{holiday}</StyledTableCell>
            </StyledTableRow>
        </>
    );
};

export default AttendanceManage;
