import { Box, Button, Container, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import Modal from "@mui/material/Modal";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

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

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 460,
  bgcolor: "background.paper",
  border: "1px solid #01578A",
  boxShadow: 24,
  px: 5,
  py: 3,
};
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));
const Holidays = () => {
  const [holidays, setHolidays] = useState([]);
  // const [reload, setReload] = useState(true);

  //current date
  const d = new Date();
  let year = d.getFullYear();
  //modal
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    fetch("http://localhost:5000/holidays")
      .then((res) => res.json())
      .then((data) => setHolidays(data.data));
  }, [holidays]);

  const onSubmit = (data, e) => {
    fetch("http://localhost:5000/holidays", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          // setReload(!reload);
        }
      });

    // Swal.fire("data added successfully");
    e.target.reset();
  };
  const handleDelete = (id) => {
    const confirmation = window.confirm("are you sure to delete?");
    if (confirmation) {
      fetch(`http://localhost:5000/holidays/${id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.deletedCount === 1) {
            // setReload(!reload);
          }
        });
    }
    // console.log(id);
  };
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
        <Typography variant="h4" sx={{ fontWeight: "700", color: "#01578A" }}>
          Holidays - <span style={{ color: "#000" }}>{year}</span>
        </Typography>
        <Button
          onClick={handleOpen}
          className="btn_regular"
          sx={{ background: "#01578A !important", color: "#fff !important" }}
        >
          <AddCircleOutlineOutlinedIcon sx={{ mr: 1 }} />
          Add Holidays
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Holidays</StyledTableCell>
              <StyledTableCell align="center">Start Date</StyledTableCell>
              <StyledTableCell align="center">End Date</StyledTableCell>
              <StyledTableCell align="right">Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {holidays.map((item) => (
              <StyledTableRow>
                <StyledTableCell component="th" scope="row">
                  {item.title}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {item.start}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {item.end}
                </StyledTableCell>
                <StyledTableCell align="right">
                  <DeleteOutlineOutlinedIcon
                    onClick={() => handleDelete(item._id)}
                  />
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* modal start */}
      <Modal
        keepMounted
        open={open}
        onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box sx={style}>
          <Typography
            variant="h4"
            sx={{ color: "#01578A", textAlign: "center", mb: 3 }}
          >
            New Holiday
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box sx={{ mb: 2 }}>
              <label style={{ display: "block" }} htmlFor="title">
                Holiday Title <span style={{ color: "red" }}>*</span>
              </label>
              <TextField
                sx={{ width: "100%" }}
                variant="outlined"
                id="title"
                type="text"
                {...register("title", { required: true })}
              />
            </Box>
            <Box sx={{ mb: 2 }}>
              <label style={{ display: "block" }} htmlFor="date">
               Start Date <span style={{ color: "red" }}>*</span>
              </label>
              <TextField
                sx={{ width: "100%" }}
                variant="outlined"
                id="date"
                type="date"
                {...register("start", { required: true })}
              />
            </Box>
            <Box>
              <label style={{ display: "block" }} htmlFor="date">
               End Date <span style={{ color: "red" }}>*</span>
              </label>
              <TextField
                sx={{ width: "100%" }}
                variant="outlined"
                id="date"
                type="date"
                {...register("end", { required: true })}
              />
            </Box>
            <Box sx={{ textAlign: "center", mt: 3 }}>
              <Button
                sx={{
                  background: "#01578A !important",
                  color: "#fff !important",
                  width: "100%",
                }}
                className="btn_regular"
                type="submit"
              >
                Add Holiday
              </Button>
            </Box>
          </form>
        </Box>
      </Modal>
    </Container>
  );
};

export default Holidays;
