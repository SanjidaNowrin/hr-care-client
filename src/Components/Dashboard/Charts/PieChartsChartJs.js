import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(
    Tooltip, Legend,
    ArcElement
)


const PieChartsChartJs = ({ attendance, dateString, holiday, leave }) => {

    const w = attendance
    const h = holiday.length
    const l = leave.length;
    const p = (w - (h + l))

    const data = {

        datasets: [{
            label: '# of Votes',
            data: [p, l, h],
            backgroundColor: [
                'rgba(255, 205, 86, .5)',
                'rgba(255, 99, 132, .5)',
                'rgba(75, 192, 192, .5)',







            ],
            borderColor: [
                'rgba(255, 205, 86, .7)',
                'rgba(255, 99, 132, .7)',
                'rgba(75, 192, 192, .7)',






            ],
            borderWidth: 1
        }],
        labels: ['Present', 'Absent', 'Holiday'],
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
                fontSize: '10px'
            }
        }
    }
    return (

        <Pie
            data={data}
            height='250px'
            options={options}
        >

        </Pie>

    );
};

export default PieChartsChartJs;