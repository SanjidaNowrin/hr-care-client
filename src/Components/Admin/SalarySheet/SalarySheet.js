import React, { useEffect, useState } from "react";
import { Box, Breadcrumbs, Button, Container, TextField, Typography } from "@mui/material";
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

// Breadcrumbs
import Chip from '@mui/material/Chip';
import { emphasize } from '@mui/material/styles';
import HomeIcon from '@mui/icons-material/Home';
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import dateFormat from "../../Share/DateFormat/dateFormat";

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

const SalarySheet = () => {

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

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
    { title: "Designation", field: "designation" },
    { title: "Acc", field: "Account" },
    { title: "Gross", field: "Gross", type: "numeric" },
    { title: "Basic", field: "basic", type: "currency" },
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

  const [employees, setEmployees] = useState([]);
  const { register, handleSubmit } = useForm();
  const [Dates, setDates] = useState([]);
  const [filterDates, setFilterDates] = useState([]);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();


  useEffect(() => {
    fetch("https://ancient-thicket-61342.herokuapp.com/employees")
      .then((res) => res.json())
      .then((data) => setEmployees(data.data));
  }, []);
  useEffect(() => {
    fetch(`https://ancient-thicket-61342.herokuapp.com/attendance/`)
      .then((res) => res.json())
      .then((data) => setDates(data.data));
  }, [])
  console.log(Dates)

  useEffect(() => {
    const newFilterDate = Dates.filter(date => date?.date >= startDate && date?.date <= endDate)
    setFilterDates(newFilterDate)
  }, [Dates, startDate, endDate])
  console.log(filterDates)

  const onSubmit = (data, e) => {

    const newStartDate = dateFormat(new Date(data.startDate), 'yyyy-MM-dd');
    setStartDate(newStartDate)
    const newEndDate = dateFormat(new Date(data.endDate), 'yyyy-MM-dd');
    setEndDate(newEndDate)

    toast.success('Salary Process successfully 👌!', {
      position: toast.POSITION.BOTTOM_CENTER,
      autoClose: 4000
    })
  };
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
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box sx={{ display: "flex", width: "100%", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
              <Box sx={{ width: "35%" }}>
                <label>
                  Start Date <span style={{ color: "red" }}>*</span>
                </label>
                <TextField
                  sx={{ width: "100%" }}
                  {...register("startDate")}
                  id="outlined-basic"
                  type="date"
                  variant="outlined"
                />
              </Box>
              <Box sx={{ width: "35%" }}>
                <label>
                  End Day <span style={{ color: "red" }}>*</span>
                </label>
                <TextField
                  sx={{ width: "100%" }}
                  {...register("endDate")}
                  id="outlined-basic"
                  type="date"
                  variant="outlined"
                />
              </Box>
              <Box sx={{ width: "20%" }}>
                <Button
                  sx={{
                    background: "var(--p_color) !important",
                    color: "#fff !important",
                    width: "100%",
                  }}
                  className="btn_regular"
                  type="Search"
                >
                  Search
                </Button>
              </Box>
            </Box>
          </form>
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
            <TableRow style={{ backgroundColor: "var(--p_color) !important" }}>
              <StyledTableCell>Name <hr />ID</StyledTableCell>
              <StyledTableCell align="left">Designation <hr /> Department</StyledTableCell>
              <StyledTableCell align="left">Basic <hr /> Gross</StyledTableCell>
              <StyledTableCell align="left">Pay Day</StyledTableCell>
              <StyledTableCell align="right">Salary</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employees.map((employee) => (
              <SalaryData key={employee._id} employee={employee} date={filterDates.filter(date => date?.email === employee?.email)}></SalaryData>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default SalarySheet;
