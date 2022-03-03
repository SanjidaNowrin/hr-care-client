import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import "./IdCard.css";
import SingleId from "../SingleId/SingleId";
import { Breadcrumbs, Container, TextField, Typography } from "@mui/material";

// Breadcrumbs
import Chip from "@mui/material/Chip";
import { emphasize, styled } from "@mui/material/styles";
import HomeIcon from "@mui/icons-material/Home";
import { Box } from "@mui/system";
import { Link } from "react-router-dom";

const IdCard = () => {
  const [employeesId, setemployeeId] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [filterData, setFilterData] = useState([]);
 

  useEffect(() => {
    fetch("http://localhost:5000/employees")
      .then((res) => res.json())
      .then((data) => setemployeeId(data.data));
  }, []);

  const handleOnChange = (e) => {
    const number = parseInt(e.target.value);
    setInputValue(number);
  };

  // filter employees id
  useEffect(() => {
    const filterID = employeesId.filter(
      (data) => parseInt(data.ID) === inputValue
    );
    if (filterID.length > 0 || inputValue > 0) {
      setFilterData(filterID);
    } else {
      setFilterData(employeesId);
    }
  }, [inputValue, employeesId]);

  // click to search
  const handleOnSearch = (e) => {
    const filterID = employeesId.filter(
      (data) => parseInt(data.ID) === inputValue
    );
    if (filterID.length > 0) {
      setFilterData(filterID);
    } else {
      setFilterData(employeesId);
    }
  };

  // Breadcrumbs
  const StyledBreadcrumb = styled(Chip)(({ theme }) => {
    const backgroundColor =
      theme.palette.mode === "light"
        ? theme.palette.grey[100]
        : theme.palette.grey[800];
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
          Employee ID Card
        </Typography>
        <Breadcrumbs aria-label="breadcrumb">
          <Link to="/dashboard">
            <StyledBreadcrumb
              to="/dashboard"
              label="Dashboard"
              icon={<HomeIcon fontSize="small" />}
            />
          </Link>
          <Link to="/dashboard/id_card">
            <StyledBreadcrumb component="a" href="#" label="ID Card" />
          </Link>
        </Breadcrumbs>
      </Box>

      {/* search box */}
      <Box
        sx={{
          textAlign: "center",
          width: { xs: "80%", sm: "90%", md: "50%" },
          margin: "0 auto",
          position: "relative",
          mb: 6,
        }}
        className="id_search"
      >
        <TextField
          placeholder="Search ID Card According to ID Number"
          variant="outlined"
          onChange={handleOnChange}
          sx={{ width: "100%" }}
        />

        <Button
          sx={{
            position: "absolute",
            top: "50%",
            right: "-45px",
            transform: "translate(-50%, -50%)",
          }}
          className="btn_regular"
          onClick={handleOnSearch}
        >
          Search
        </Button>
      </Box>

      {/* card box */}
      <Grid container spacing={4} sx={{ mb: 4 }}>
        {filterData.slice(0, 3).map((employeeId) => (
          <SingleId key={employeeId._id}  employeeId={employeeId}></SingleId>
        ))}
      </Grid>
    </Container>
  );
};

export default IdCard;
