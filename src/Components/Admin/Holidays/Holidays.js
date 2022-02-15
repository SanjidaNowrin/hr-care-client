import { Box, Button, Container, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Holiday from './Holiday/Holiday';

import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import Modal from '@mui/material/Modal';
import { useForm } from 'react-hook-form';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: 'cyan',
        color: theme.palette.common.white,
        fontSize: 24,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 18,
    },
}));

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 460,
    bgcolor: 'background.paper',
    border: '1px solid #00D2FC',
    boxShadow: 24,
    px: 5,
    py: 3
};

const Holidays = () => {
    const [holidays, setHolidays] = useState([]);
    useEffect(() => {
        fetch('/holidays.json')
            .then(res => res.json())
            .then(data => setHolidays(data))
    }, [])

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = data => console.log(data);

    return (
        <Container>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', my: 5 }}>
                <Typography variant="h4" sx={{ fontWeight: '700', color: '#00D2FC' }}>Holidays - <span style={{ color: '#000' }}>2022</span></Typography>
                <Button
                    onClick={handleOpen}
                    className='btn_regular'
                    sx={{ background: '#00D2FC !important', color: '#fff !important' }}
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
                            <StyledTableCell align="left">Date</StyledTableCell>
                            <StyledTableCell align="left">Day</StyledTableCell>
                            <StyledTableCell align="right">Action</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            holidays.map(item => <Holiday
                                key={item.id}
                                item={item}
                            ></Holiday>)
                        }
                    </TableBody>
                </Table>
            </TableContainer>
            {/* modal */}
            <Modal
                keepMounted
                open={open}
                onClose={handleClose}
                aria-labelledby="keep-mounted-modal-title"
                aria-describedby="keep-mounted-modal-description"
            >
                <Box sx={style}>
                    <Typography variant="h4" sx={{ color: '#00D2FC', textAlign: 'center', mb: 3 }}>
                        New Holiday
                    </Typography>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Box sx={{ mb: 2 }}>
                            <label style={{ display: 'block' }} htmlFor="title">Holiday Title <span style={{ color: 'red' }}>*</span></label>
                            <TextField
                                sx={{ width: '100%' }}
                                variant="outlined"
                                id="title"
                                type="text"
                                {...register("name", { required: true })}
                            />
                        </Box>
                        <Box>
                            <label style={{ display: 'block' }} htmlFor="date">Date <span style={{ color: 'red' }} >*</span></label>
                            <TextField
                                sx={{ width: '100%' }}
                                variant="outlined"
                                id="date"
                                type="date"
                                {...register("date", { required: true })}
                            />
                        </Box>
                        <Box sx={{ textAlign: 'center', mt: 3 }}>
                            <Button sx={{ background: '#00D2FC !important', color: '#fff !important', width: '100%' }} className="btn_regular" type="submit">
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