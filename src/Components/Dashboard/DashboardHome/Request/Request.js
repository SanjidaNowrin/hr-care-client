import React from 'react';
import Grid from '@mui/material/Grid';
import AddTaskIcon from '@mui/icons-material/AddTask';
import CameraswitchIcon from '@mui/icons-material/Cameraswitch';

const Request = () => {
    return (
        <div style={{padding: "10px",boxShadow: "1px 4px 8px 0px",marginTop:'10px',background: "#c3e4f7"}}>
            <h3 style={{textAlign:"center"}}>Request</h3>
            <div className="paper-request">
                <Grid container spacing={2}>
                    <Grid item xs={2}>
                        <div className="icon">
                            <h4><CameraswitchIcon></CameraswitchIcon></h4>
                            <h4><AddTaskIcon></AddTaskIcon></h4>
                        </div>
                    </Grid>
                    <Grid item xs={8}>
                        <div className="item">
                            <h4>Employee Work in Progress</h4>
                            <h4>Employee Work Done</h4>
                        </div>
                    </Grid>
                    <Grid item xs={2}>
                        <div className="count">
                            <h4>80%</h4>
                            <h4>20%</h4>
                        </div>
                    </Grid>
                </Grid>
            </div>
        </div>
    );
};

export default Request;