import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(
    Tooltip, Legend,
    ArcElement
)


const PieChartsChartJs = ({ attendance, dateString, holiday }) => {

    const w = attendance.length
    const h = holiday.length;
    let p = w - h
    // p = w - (ab + h)git 
    const data = {
        labels: ['Present', 'Absent', 'Holiday'],
        datasets: [{
            label: '# of Votes',
            data: [p, h, h],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',

                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',

                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',

                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',

                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    }
    const options = {
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: true,
                grid: {
                    display: false
                }
            },
            x: {

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
        <div>
            <Pie
                data={data}
                height={250}
                options={options}
            >

            </Pie>
        </div>
    );
};

export default PieChartsChartJs;