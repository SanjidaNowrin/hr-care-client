import React from 'react';
import Grid from '@mui/material/Grid';

const Request = () => {
    return (
        <div>
            <h1>This is test</h1>
            <Grid container spacing={2}>
                <Grid item xs={2}>
                    <h5>icon</h5>
                </Grid>
                <Grid item xs={8}>
                    <h5>Details</h5>
                </Grid>
                <Grid item xs={2}>
                    <h5>count</h5>
                </Grid>
            </Grid>
        </div>
    );
};

export default Request;