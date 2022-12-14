import React from 'react';
import { Chart as ChartJS, LineElement, PointElement, CategoryScale, LinearScale } from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
    LineElement,
    PointElement,
    CategoryScale,
    LinearScale

)


const LineChartsChartJs = ({ thisMonthTask }) => {
    console.log(thisMonthTask)


    const data = {
        labels: thisMonthTask?.map(x => x?.date),
        datasets: [{
            label: 'Performance of this month',
            data: thisMonthTask?.map(x => x?.taskDone?.length),
            backgroundColor: 'rgba(255, 99, 132, .6)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1,
            tension: 0.3,
            fill: 1,

        }

        ]
    }
    const options = {
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: true
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
            <Line
                data={data}
                height={250}
                options={options}
            >

            </Line>
        </div>
    );
};

export default LineChartsChartJs;