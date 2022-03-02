import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import "./IdCard.css";
import SingleId from "../SingleId/SingleId";
import { Breadcrumbs, Container, TextField, Typography } from "@mui/material";

// Breadcrumbs
import Chip from '@mui/material/Chip';
import { emphasize, styled } from '@mui/material/styles';
import HomeIcon from '@mui/icons-material/Home';
import { Box } from "@mui/system";
import { Link } from "react-router-dom";

const IdCard = () => {
    const [employeesId, setemployeeId] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [filterData, setFilterData] = useState([]);
    // console.log(displayIdCards);

    useEffect(() => {
        fetch("https://ancient-thicket-61342.herokuapp.com/employees")
            .then((res) => res.json())
            .then((data) => setemployeeId(data.data));
    }, []);

    const handleOnChange = (e) => {
        setInputValue(e.target.value)
        console.log(e.target.value)
    }

    // filter employees id
    useEffect(() => {
        const filterID = employeesId.filter(data => data.ID == inputValue);
        if (filterID.length > 0 || inputValue !== "") {
            setFilterData(filterID)
        } else {
            setFilterData(employeesId)
        }
    }, [inputValue])

    // click to search
    const handleOnSearch = (e) => {
        const filterID = employeesId.filter(data => data.ID == inputValue);
        if (filterID.length > 0 || inputValue !== "") {
            setFilterData(filterID)
        } else {
            setFilterData(employeesId)
        }
    }

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
                    <Link to="/dashboard/id_card"><StyledBreadcrumb component="a" href="#" label="ID Card" /></Link>
                </Breadcrumbs>
            </Box>

            {/* search box */}
            <Box sx={{ textAlign: 'center', width: { xs: '80%', sm: '90%', md: '50%' }, margin: '0 auto', position: 'relative', mb: 6 }}
                className="id_search"
            >
                <TextField
                    placeholder="Search ID Card"
                    variant="outlined"
                    onChange={handleOnChange}
                    sx={{ width: '100%' }}
                />

                <Button
                    sx={{ position: 'absolute', top: '50%', right: '-45px', transform: 'translate(-50%, -50%)' }}
                    className="btn_regular"
                    onClick={handleOnSearch}
                >
                    Search
                </Button>
            </Box>

            {/* card box */}
            <Grid container spacing={4} sx={{ mb: 4 }}>
                {filterData.slice(0, 3).map((employeeId) => (
                    <SingleId key={employeeId._id} employeeId={employeeId}></SingleId>
                ))}
            </Grid>
        </Container>
    );
};

export default IdCard;

/*


<div className="employee-id">
                    <div className="employee-id-details">
                        <div className="top-content-id">
                            <h3>Hr <span style={{color: 'salmon'}}>Care</span></h3>
                            <p>Human Resourse</p>
                        </div>
                        <div className="middle-content-id">
                            <Grid container spacing={2}>
                                <Grid item xs={4}>
                                    <div className="img-id">
                                    <img src="https://i.ibb.co/DGPYn0C/person.jpg" alt="" />
                                    </div>
                                </Grid>
                                <Grid item xs={8}>
                                    <h3>Mohammad Forid</h3>
                                    <p>Creative Manager</p>
                                </Grid>
                            </Grid>
                        </div>
                        <div className="bottom-content-id">
                            <Grid container spacing={2}>
                                <Grid item xs={3}>
                                    <h3>ID NO</h3>
                                    <p>S-15012</p>
                                    <h3>D.O.B</h3>
                                    <p>22/4/2021</p>
                                </Grid>
                                <Grid item xs={3}>
                                    <h3>Joined Date</h3>
                                    <p>22/06/2021</p>
                                    <h3>Expire Date</h3>
                                    <p>22/3/2025</p>
                                </Grid>
                                <Grid item xs={3}>
                                    <h3>Phone</h3>
                                    <p>01855555</p>
                                    <h3>B Group</h3>
                                    <p>B+</p>
                                </Grid>
                                <Grid item xs={3}>
                                    <h3 className="qr">QR Code</h3>
                                    <img src="https://i.ibb.co/fxLKH5h/qr-code-g151cf237e-1280.png" alt="" />
                                </Grid>
                            </Grid>
                        </div>
                    </div>
                </div>


                <div className="form-button">
                    <Button variant="contained">Download PDF</Button>
                    </div>
*/
