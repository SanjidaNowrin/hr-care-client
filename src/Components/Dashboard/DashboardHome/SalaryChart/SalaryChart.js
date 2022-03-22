import React from 'react';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement
)


const BarChartJs = ({hrGross,accGross,marketingGross,itGross}) => {
  const dataTwo = [
    {
      name: "Information Technology",
      uv: 3000,
      pv: 1398,
      salary: itGross,
    },
    {
      name: "Marketing",
      uv: 2000,
      pv: 9800,
      salary: marketingGross,
    },
    {
      name: "Human Resource",
      uv: 2780,
      pv: 3908,
      salary: hrGross,
    },
    {
      name: "Accounting",
      uv: 2780,
      pv: 3908,
      salary: accGross,
    }
  ];
    const data = {
        labels: ['Information Technology', 'Marketing', 'Human Resource', 'Accounting'],
        datasets: [{
            label: 'Salary',
            data: dataTwo.map(data=>data.salary),
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
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
                fontSize: '10px',
            }
        }
    }
    return (
        <div>
            <Bar
                data={data}
                height={250}
                options={options}
            >

            </Bar>
        </div>
    );
};

export default BarChartJs;