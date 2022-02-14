import React, { useState } from 'react';
import { Box, Input, MenuItem, TextField, Typography } from '@mui/material';



const MyInfo = () => {
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
                <TextField id="outlined-basic" label="Name" type="text" variant="outlined" />
                <TextField id="outlined-basic" label="Father's Name" type="text" variant="outlined" />
                <TextField id="outlined-basic" label="Mother's Name" type="text" variant="outlined" />
                <TextField id="outlined-basic" label="NID" type="number" variant="outlined" />
                <TextField
                    id="date"
                    label="Dath of Birth"
                    type="date"
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <TextField
                    id="outlined-select-currency"
                    select
                    label="Department"
                    value={department}
                    onChange={handleChange}
                    helperText="Please select your Department"
                >
                    {departments.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>

                <TextField id="outlined-basic" label="Designation" type="text" variant="outlined" />


                <label htmlFor="icon-button-file">
                    <Input accept="image/*" id="icon-button-file" type="file" />
                </label>

            </Box>
        </>
    );
};

export default MyInfo;