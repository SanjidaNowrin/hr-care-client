import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import PerformanceChart from './PerformanceChart';

function createData(name, calories, fat, carbs, protein, total) {
    return { name, calories, fat, carbs, protein, total };
}
const SalaryInfo = () => {
    const rows = [
        createData('January', 159, 6.0, 24, 4.0, 20000),
        createData('Febrauary', 237, 9.0, 37, 4.3, 30000),
        createData('March', 262, 16.0, 24, 6.0, 30000),
        createData('April', 305, 3.7, 67, 4.3, 30000),
        createData('May', 356, 16.0, 49, 3.9, 30000),
    ];

    return (
        <>
            <h3>Weekly performance chart</h3>
            <PerformanceChart />
            <h3>Salary Information by month</h3>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Month</TableCell>
                            <TableCell align="right">Basic</TableCell>
                            <TableCell align="right">House Rent</TableCell>
                            <TableCell align="right">Transport</TableCell>
                            <TableCell align="right">Medical</TableCell>
                            <TableCell align="right">Total</TableCell>
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
                                <TableCell align="right">{row.total}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );


}
export default SalaryInfo;
