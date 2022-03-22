import React, { useEffect, useState } from 'react';
import SystemUpdateAltOutlinedIcon from '@mui/icons-material/SystemUpdateAltOutlined';
import OpenInFullOutlinedIcon from '@mui/icons-material/OpenInFullOutlined';
import { Box, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Link } from 'react-router-dom';

const Request = ({ employees }) => {
    const [leave, setLeave] = useState([]);
    useEffect(() => {
        fetch(`https://ancient-thicket-61342.herokuapp.com/leave`)
            .then(res => res.json())
            .then(data => setLeave(data.data))
    }, []);

    const [employeePending, setEmployeePending] = useState([]);
    const [leavePending, setLeavePending] = useState([]);
    useEffect(() => {
        const filterData = employees.filter(data => data.status === "pending");
        setEmployeePending(filterData)
    }, [employees])

    useEffect(() => {
        const filterData = leave.filter(data => data.status === "pending");
        setLeavePending(filterData)
    }, [leave])


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
            border: '1px solid #448aff'
        },
        reqText: {
            display: 'flex',
            justifyContent: 'space-between',
            padding: '12px 20px',
            background: '#fff',
            color: '#448aff',
        },
        reqAction: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: '#448aff',
            padding: '10px',
            color: '#fff'
        }
    })
    const { reqContainer, reqBox, reqText, reqAction } = useStyle();

    return (
        <Box className={reqContainer}>
            <Typography variant="h5" sx={{ my: 1, textAlign: 'center' }}>
                Pending Status
            </Typography>
            <Box className={reqBox}>
                <Box className={reqText}>
                    <Box>
                        <Typography variant='h4'>
                            {leftPad(employeePending.length)}
                        </Typography>
                        <Typography variant='h5'>
                            Pending Employees
                        </Typography>
                    </Box>
                    <SystemUpdateAltOutlinedIcon fontSize='large' />
                </Box>
                <Link to="/dashboard/all_employees">
                    <Box className={reqAction}>
                        <Typography variant='h6'>
                            Check Now
                        </Typography>
                        <OpenInFullOutlinedIcon />
                    </Box>
                </Link>
            </Box>

            <Box sx={{ mt: 2, border: '1px solid #11c15b' }} className={reqBox}>
                <Box sx={{ color: '#11c15b' }} className={reqText}>
                    <Box>
                        <Typography variant='h4'>
                            {leftPad(leavePending.length)}
                        </Typography>
                        <Typography variant='h5'>
                            Pending Leave
                        </Typography>
                    </Box>
                    <SystemUpdateAltOutlinedIcon fontSize='large' />
                </Box>
                <Link to="/dashboard/LeaveRequests">
                    <Box sx={{ background: '#11c15b' }} className={reqAction}>
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