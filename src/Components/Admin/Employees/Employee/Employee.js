import React from "react";
import { styled, alpha } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import MenuItem from "@mui/material/MenuItem";
import EditIcon from "@mui/icons-material/Edit";
import Menu from "@mui/material/Menu";
import EmployeeModal from "../EmployeeModal/EmployeeModal";
import { Avatar, CardHeader } from "@mui/material";

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

// export {StyledTableCell};
const Employee = ({ item }) => {
    const { photo, name, email, department, designation, status } = item;

    return (
        <>
            <StyledTableRow>
                <TableCell component="th" scope="row">
                    <CardHeader
                        sx={{ padding: "0 !important" }}
                        avatar={
                            <Avatar sx={{ background: "var(--p_color) !important" }} aria-label="recipe">
                                {
                                    name.slice(0, 1)
                                }
                            </Avatar>
                        }
                        title={name}
                        subheader={email}
                    />
                </TableCell>
                <StyledTableCell align="center">{department}</StyledTableCell>
                <StyledTableCell align="center">{designation}</StyledTableCell>
                <StyledTableCell align="center">{status}</StyledTableCell>
                <StyledTableCell align="right">
                    <EmployeeModal item={item} />
                </StyledTableCell>
            </StyledTableRow>
        </>
    );
};

export default Employee;
