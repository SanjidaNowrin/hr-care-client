import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import SystemUpdateAltOutlinedIcon from '@mui/icons-material/SystemUpdateAltOutlined';
import OpenInFullOutlinedIcon from '@mui/icons-material/OpenInFullOutlined';
import { Box, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Link } from 'react-router-dom';

const Request = () => {
    const [tasksDone, SetTaskDone] = useState([]);
    // const [workinProgress, setworkinProgress] = useState([])
    useEffect(() => {
        fetch(`https://ancient-thicket-61342.herokuapp.com/taskAssign`)
            .then(res => res.json())
            .then(data => SetTaskDone(data.data))
    }, []);

    function leftPad(number) {
        var output = number + '';
        while (output.length < 2) {
            output = '0' + output;
        }
        return output;
    }

    const useStyle = makeStyles({
        reqContainer: {
            background: 'transparent'
        },
        reqBox: {
            background: '#fff',
            border: '1px solid #00D2FC'
        },
        reqText: {
            display: 'flex',
            justifyContent: 'space-between',
            padding: '12px 20px',
            background: '#fff',
            color: '#00D2FC',
        },
        reqAction: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: '#00D2FC',
            padding: '10px',
            color: '#fff'
        }
    })
    const { reqContainer, reqBox, reqText, reqAction } = useStyle();

    return (
        <Box className={reqContainer}>
            <Box className={reqBox}>
                <Box className={reqText}>
                    <Box>
                        <Typography variant='h4'>
                            {leftPad(4)}
                        </Typography>
                        <Typography variant='h5'>
                            Pending Employees
                        </Typography>
                    </Box>
                    <SystemUpdateAltOutlinedIcon fontSize='large' />
                </Box>
                <Link to="/dashboard/LeaveRequests">
                    <Box className={reqAction}>
                        <Typography variant='h6'>
                            Check Now
                        </Typography>
                        <OpenInFullOutlinedIcon />
                    </Box>
                </Link>
            </Box>

            <Box sx={{ mt: 2, border: '1px solid #00C49F' }} className={reqBox}>
                <Box sx={{ color: '#00C49F' }} className={reqText}>
                    <Box>
                        <Typography variant='h4'>
                            05
                        </Typography>
                        <Typography variant='h5'>
                            Pending Leave
                        </Typography>
                    </Box>
                    <SystemUpdateAltOutlinedIcon fontSize='large' />
                </Box>
                <Link to="/dashboard/LeaveRequests">
                    <Box sx={{ background: '#00C49F' }} className={reqAction}>
                        <Typography variant='h6'>
                            Check Now
                        </Typography>
                        <OpenInFullOutlinedIcon />
                    </Box>
                </Link>
            </Box>
        </Box>
    );
};

export default Request;