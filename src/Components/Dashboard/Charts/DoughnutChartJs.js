import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(
    Tooltip, Legend,
    ArcElement
)


const DoughnutChartJs = ({ attendance, dateString }) => {
    const holiday = 30 - 3 - (attendance.length);

    console.log(attendance, holiday)
    const data = {
        labels: ['Present', 'Absent', 'Holiday'],
        datasets: [{
            label: 'Your Attendance',
            data: [attendance.length, 3, holiday],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',

                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',


            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',

                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',


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
            <Doughnut
                data={data}
                height={250}
                options={options}
            >

            </Doughnut>
        </div>
    );
};

export default DoughnutChartJs;