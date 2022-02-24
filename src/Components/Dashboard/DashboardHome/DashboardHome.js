import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import CoPresentIcon from '@mui/icons-material/CoPresent';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import LineAxisIcon from '@mui/icons-material/LineAxis';
import GroupRemoveIcon from '@mui/icons-material/GroupRemove';
import Typography from '@mui/material/Typography';
//Employee table detail
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Mohammad Arif', 'Present', '00:00', '00:00', '00:00','00:00'),
  createData('Md:Rakibul','Present','00:00', '00:00', '00:00','00:00'),
  createData('Israt Jahan','Absent', '00:00', '00:00','00:00','00:00'),
  createData('Md:Ataur Rahman', 'Present', '00:00','00:00', '00:00','00:00'),
  createData('Md:Umar Riaz', 'Present', '00:00', '00:00', '00:00','00:00'),
];


const DashboardHome = () => {
    const pathname = window.location.pathname;
    return (
        <>
            <div className="top-content" style={{ borderBottom: '3px solid rgb(1 87 138)', margin: '30px' }}>
                <h2 style={{fontSize: '2rem'}}>Dashboard</h2>
            </div>
            <Box style={{ padding: '40px' }}>
                <Grid container spacing={4}>
                    <Grid sx={{ border: '2px solid #000' }} item xs={12} sm={3} style={{background: '#3E497A',color: 'white'}}>
                        <Box>
                            <Grid container spacing={2}>
                                <Grid item sm={8}>
                                    <Typography variant="h3" gutterBottom component="div">
                                        5
                                    </Typography>
                                </Grid>
                                <Grid item sm={4}>
                                    <PeopleAltIcon style={{ fontSize: '4rem' }}></PeopleAltIcon>
                                </Grid>
                                <Typography variant="h6" gutterBottom component="div" sx={{ marginTop: '1.9rem' }}>
                                    Total Employee
                                </Typography>
                            </Grid>
                        </Box>
                    </Grid>
                    <Grid sx={{ border: '2px solid #000' }} item xs={12} sm={3} style={{background: '#139487',color: 'white'}}>
                        <Box>
                            <Grid container spacing={2}>
                                <Grid item sm={8}>
                                    <Typography variant="h3" gutterBottom component="div">
                                        4
                                    </Typography>
                                </Grid>
                                <Grid item sm={4}>
                                    <CoPresentIcon style={{ fontSize: '4rem' }}></CoPresentIcon>
                                </Grid>
                                <Typography variant="h6" gutterBottom component="div" sx={{ marginTop: '1.9rem' }}>
                                    Present Today
                                </Typography>
                            </Grid>
                        </Box>
                    </Grid>
                    <Grid sx={{ border: '2px solid #000' }} item xs={12} sm={3} style={{background: '#9B0000',color: 'white'}}>
                        <Box>
                            <Grid container spacing={2}>
                                <Grid item sm={8}>
                                    <Typography variant="h3" gutterBottom component="div">
                                        1
                                    </Typography>
                                </Grid>
                                <Grid item sm={4}>
                                    <LineAxisIcon style={{ fontSize: '4rem' }}></LineAxisIcon>
                                </Grid>
                                <Typography variant="h6" gutterBottom component="div" sx={{ marginTop: '1.9rem' }}>
                                    Total Absent
                                </Typography>
                            </Grid>
                        </Box>
                    </Grid>
                    <Grid sx={{ border: '2px solid #000' }} item xs={12} sm={3} style={{background: 'rgb(1 87 138)',color: 'white'}}>
                        <Box>
                            <Grid container spacing={2}>
                                <Grid item sm={8}>
                                    <Typography variant="h3" gutterBottom component="div">
                                        0
                                    </Typography>
                                </Grid>
                                <Grid item sm={4}>
                                    <GroupRemoveIcon style={{ fontSize: '4rem' }}></GroupRemoveIcon>
                                </Grid>
                                <Typography variant="h6" gutterBottom component="div" sx={{ marginTop: '1.9rem' }}>
                                    On Leave Today
                                </Typography>
                            </Grid>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
            {/* Total attendance chart area */}
            <div className="total-attendance" style={{padding: '8px'}}>
                <div className="total-attend-head" style={{padding: '5px', background: 'rgb(1 87 138)',color:'white',marginTop:'30px'}}>
                    <h4>Today Attendance - 16-Feb-2022</h4>
                </div>
                {/* Table on employee details */}
                <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Employee</TableCell>
            <TableCell align="right">Status</TableCell>
            <TableCell align="right">Late</TableCell>
            <TableCell align="right">Early Leaving</TableCell>
            <TableCell align="right">Overtime</TableCell>
            <TableCell align="right">Total Work</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.calories}</TableCell>
              <TableCell align="right">{row.fat}</TableCell>
              <TableCell align="right">{row.carbs}</TableCell>
              <TableCell align="right">{row.protein}</TableCell>
              <TableCell align="right">{row.protein}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
            </div>
            
        </>
    );
};

export default DashboardHome;