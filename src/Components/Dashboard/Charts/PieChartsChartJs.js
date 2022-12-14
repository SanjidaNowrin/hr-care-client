import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(
    Tooltip, Legend,
    ArcElement
)

const PieChartsChartJs = ({ sickLeave, casualLeave }) => {
    const s = sickLeave.length
    const c = casualLeave.length
    const rs = 14 - s;
    const rc = 10 - c
    console.log(sickLeave, casualLeave, s, c, rc, rs)
    const data = {
        datasets: [{
            label: '# of Votes',
            data: [rs, rc, s, c],
            backgroundColor: [
                'rgba(255, 205, 86, .5)',
                'rgba(255, 99, 132, .5)',
                'rgba(75, 192, 192, .5)',
                'rgba(255, 159, 64, .5)'
            ],
            borderColor: [
                'rgba(255, 205, 86, .7)',
                'rgba(255, 99, 132, .7)',
                'rgba(75, 192, 192, .7)',
                'rgba(255, 159, 64, .7)'
            ],
            borderWidth: 1
        }],
        labels: ['Remaining Sick', 'Remaining Casual', 'Sick', 'Casual'],
    }
    const options = {
        maintainAspectRatio: false,
        responsive: false,
        scales: {
            y: {
                display: false,
                beginAtZero: true,
                grid: {
                    display: false
                }
            },
            x: {
                display: false,
                grid: {
                    display: false
                }
            }
        },
        length: {
            labels: {
                fontSize: '10px',
            }
        }
    }
    return (
        <Pie data={data} height='250px' style={{ margin: 'auto' }} options={options}></Pie>
    );
};

export default PieChartsChartJs;