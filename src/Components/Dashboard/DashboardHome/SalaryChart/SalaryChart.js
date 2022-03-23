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
                'rgba(251, 62, 106, .7)',
                'rgba(24, 2, 91, 0.7)',
                'rgba(0, 210, 252, 0.7)',
            ],
            borderColor: [
                'rgba(251, 62, 106, 1)',
                'rgba(24, 2, 91, 1)',
                'rgba(0, 210, 252, 1)',
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