import React from "react";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement);

const BarChartJs = ({ hrGross, accGross, marketingGross, itGross }) => {
  const dataTwo = [
    {
      name: "Information Technology",
      salary: itGross,
    },
    {
      name: "Marketing",
      salary: marketingGross,
    },
    {
      name: "Human Resource",
      salary: hrGross,
    },
    {
      name: "Accounting",
      salary: accGross,
    },
  ];
  const data = {
    labels: [
      "Information Technology",
      "Marketing",
      "Human Resource",
      "Accounting",
    ],
    datasets: [
      {
        label: "Salary",
        data: dataTwo.map((data) => data.salary),
        backgroundColor: [
          "rgba(251, 62, 106, .7)",
          "rgba(24, 2, 91, 0.7)",
          "rgba(0, 210, 252, 0.7)",
        ],
        borderColor: [
          "rgba(251, 62, 106, 1)",
          "rgba(24, 2, 91, 1)",
          "rgba(0, 210, 252, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
      {
        label: "Medical & Travel",
        data: dataTwo.map((data) =>(((10/100)*data.salary)+(5/100)*data.salary)),
        backgroundColor: [
          "rgba(251, 62, 106, .5)",
          "rgba(24, 2, 91, 0.5)",
          "rgba(0, 210, 252, 0.5)",
        ],
        borderColor: [
          "rgba(251, 62, 106, 1)",
          "rgba(24, 2, 91, 1)",
          "rgba(0, 210, 252, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };
  const options = {
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    length: {
      labels: {
        fontSize: "10px",
      },
    },
  };
  return (
    <div>
      <Bar data={data} height={250} options={options}></Bar>
    </div>
  );
};

export default BarChartJs;
