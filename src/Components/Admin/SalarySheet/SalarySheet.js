import React, { useEffect, useState } from "react";
import { Box, Breadcrumbs, Button, Container, Typography } from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable";
import SalaryData from "./SalaryData/SalaryData";
import Tooltip from "@mui/material/Tooltip";
import ArticleRoundedIcon from "@mui/icons-material/ArticleRounded";
import PictureAsPdfRoundedIcon from "@mui/icons-material/PictureAsPdfRounded";
import DownloadForOfflineRoundedIcon from "@mui/icons-material/DownloadForOfflineRounded";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";

// Breadcrumbs
import Chip from '@mui/material/Chip';
import { emphasize } from '@mui/material/styles';
import HomeIcon from '@mui/icons-material/Home';
import { Link } from "react-router-dom";

// style
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
const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    color:
      theme.palette.mode === "light"
        ? "rgb(55, 65, 81)"
        : theme.palette.grey[300],
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}));
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  marginRight: theme.spacing(2),
  marginLeft: 0,
  boxShadow: "0 3px 6px rgba(0, 0, 0, 0.2)",
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));
const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));
const SalarySheet = () => {
  const [employees, setEmployees] = useState([]);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  useEffect(() => {
    fetch("/employeesData.json")
      .then((res) => res.json())
      .then((data) => setEmployees(data));
  }, []);
  //download data in excel format
  const downloadExcel = () => {
    const newData = employees.map((row) => {
      delete row.tableData;
      return row;
    });
    const workSheet = XLSX.utils.json_to_sheet(newData);
    const workBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workBook, workSheet, "employees");
    //Buffer
    let buf = XLSX.write(workBook, { bookType: "xlsx", type: "buffer" });
    //Binary string
    XLSX.write(workBook, { bookType: "xlsx", type: "binary" });
    //Download
    XLSX.writeFile(workBook, "EmployeesData.xlsx");
  };

  //download data in pdf format
  const columns = [
    { title: "Name", field: "name" },
    { title: "Email", field: "email" },
    { title: "Acc", field: "bankAcc" },
    { title: "Year", field: "year", type: "numeric" },
    { title: "Fee", field: "fee", type: "currency" },
  ];
  const downloadPdf = () => {
    const doc = new jsPDF();
    doc.text("Employee Salary Details", 20, 10);
    doc.autoTable({
      theme: "striped",
      columns: columns.map((col) => ({ ...col, dataKey: col.field })),
      body: employees,
    });
    doc.save("Employee Salary.pdf");
  };

  // Breadcrumbs
  const StyledBreadcrumb = styled(Chip)(({ theme }) => {
    const backgroundColor =
      theme.palette.mode === 'light'
        ? theme.palette.grey[100]
        : theme.palette.grey[800];
    return {
      backgroundColor,
      height: theme.spacing(3),
      color: theme.palette.text.primary,
      fontWeight: theme.typography.fontWeightRegular,
      '&:hover, &:focus': {
        backgroundColor: emphasize(backgroundColor, 0.06),
      },
      '&:active': {
        boxShadow: theme.shadows[1],
        backgroundColor: emphasize(backgroundColor, 0.12),
      },
    };
  });

  return (
    <Container>
      {/* Breadcrumbs */}
      <Box sx={{ mb: 4 }}>
        <Typography
          sx={{ mt: 2, color: 'var(--p_color)' }} variant="h4">
          Employees Salary Sheet
        </Typography>
        <Breadcrumbs aria-label="breadcrumb">
          <Link to="/dashboard">
            <StyledBreadcrumb
              to="/dashboard"
              label="Dashboard"
              icon={<HomeIcon fontSize="small" />}
            />
          </Link>
          <Link to="/dashboard/salary_sheet"><StyledBreadcrumb component="a" href="#" label="Salary Sheet" /></Link>
        </Breadcrumbs>
      </Box>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          my: 5,
        }}
      >

        {/* searchbar */}
        <Box>
          <Search>
            <SearchIconWrapper>
              <SearchIcon sx={{ color: "#01578A" }} />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
            />
          </Search>
        </Box>
        {/*dropdown */}
        <Button
          style={{ marginLeft: "10px" }}
          className="btn_regular"
          onClick={handleClick}
        >
          <DownloadForOfflineRoundedIcon
            id="demo-customized-button"
            aria-controls={open ? "demo-customized-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            variant="contained"
            disableElevation
            sx={{ cursor: "pointer", marginRight: "5px" }}
          />
          Download
        </Button>
        <StyledMenu
          id="demo-customized-menu"
          MenuListProps={{
            "aria-labelledby": "demo-customized-button",
          }}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose} disableRipple>
            <Tooltip title="Download in excel format">
              <Button sx={{ color: "black" }} onClick={() => downloadExcel()}>
                <ArticleRoundedIcon sx={{ cursor: "pointer" }} />
                Excel
              </Button>
            </Tooltip>
          </MenuItem>
          <MenuItem onClick={handleClose} disableRipple>
            <Tooltip title="Download in pdf format">
              <Button sx={{ color: "black" }} onClick={() => downloadPdf()}>
                <PictureAsPdfRoundedIcon sx={{ cursor: "pointer" }} />
                PDF
              </Button>
            </Tooltip>
          </MenuItem>
        </StyledMenu>
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow style={{ backgroundColor: "#01578A !important" }}>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell align="left">Email</StyledTableCell>
              <StyledTableCell align="left">Year</StyledTableCell>
              <StyledTableCell align="right">Salary</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employees.map((employee) => (
              <SalaryData key={employee.id} employee={employee}></SalaryData>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default SalarySheet;
