import React, { useState } from 'react';
import { Box, Button, MenuItem, TextField, Typography } from '@mui/material';
import useAuth from '../../../hooks/useAuth';
// import { useForm } from 'react-hook-form';
// import axios from "axios";



const MyInfo = () => {
    const { user } = useAuth();
    // const [register, habdleSubmit, reset] = useForm();
    // const onSubmit = data => {
    //     axios.post()
    //     alert('Application Submit')
    // }
    const departments = [
        {
            value: 'Human Resource',
            label: 'Human Resource',
        },
        {
            value: 'Information Technology',
            label: 'Information Technology',
        },
        {
            value: 'Marketing',
            label: 'Marketing',
        },
        {
            value: 'Accounting',
            label: 'Accounting',
        },
    ];

    const [department, setDepartment] = useState();

    const handleChange = (event) => {
        setDepartment(event.target.value);
    };

    return (
        <>
            <Typography sx={{ m: 2 }} variant="h4">Fill in your information</Typography>
            <Box
                component="form"
                sx={{
                    '& > :not(style)': { m: 1, width: '33ch' },
                }}
                noValidate
                autoComplete="off"
            >
                <TextField id="outlined-basic" label="Name" type="text" variant="outlined" value={user.displayName} required />
                <TextField id="outlined-basic" label="Father's Name" type="text" variant="outlined" required />
                <TextField id="outlined-basic" label="Mother's Name" type="text" variant="outlined" required />
                <TextField id="outlined-basic" label="Email" type="email" variant="outlined" value={user?.email} required />
                <TextField id="outlined-basic" label="Cell Number" type="number" variant="outlined" required />
                <TextField id="outlined-basic" label="NID" type="number" variant="outlined" required />
                <TextField
                    id="date"
                    label="Dath of Birth"
                    type="date"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    required
                />
                <TextField
                    id="outlined-select-currency"
                    select
                    label="Department"
                    value={department}
                    onChange={handleChange}
                    helperText="Please select your Department"
                    required
                >
                    {departments.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>
                <TextField id="outlined-basic" label="Designation" type="text" variant="outlined" required />

                <Typography sx={{ m: 2 }} variant="h5">Exprience</Typography>

                <TextField id="outlined-basic" label="Company" type="text" variant="outlined" />
                <TextField id="outlined-basic" label="Department" type="text" variant="outlined" />
                <TextField id="outlined-basic" label="Designation" type="text" variant="outlined" />

                <Typography sx={{ m: 2 }} variant="h5">Education information</Typography>

                <TextField id="outlined-basic" label="Degree" type="text" variant="outlined" />
                <TextField id="outlined-basic" label="Institute" type="text" variant="outlined" />
                <TextField id="outlined-basic" label="Grade" type="text" variant="outlined" />
                <Button variant="outlined">Submit</Button>
            </Box>
        </>
    );
};

export default MyInfo;