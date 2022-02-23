import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
  ResponsiveContainer,
} from 'recharts';

const PerformanceChart = () => {
  const data = [
    {
      name: 'Week 1',
      January: 40,
      February: 24,
      amt: 24,
    },
    {
      name: 'Week 2',
      January: 30,
      February: 13,
      amt: 22,
    },
    {
      name: 'Week 3',
      January: 20,
      February: 98,
      amt: 22,
    },
    {
      name: 'Week 4',
      January: 27,
      February: 39,
      amt: 20,
    },
    {
      name: 'Week 5',
      January: 18,
      February: 48,
      amt: 21,
    },
    {
      name: 'Week7',
      January: 23,
      February: 38,
      amt: 25,
    },
    {
      name: 'Week8',
      January: 34,
      February: 43,
      amt: 21,
    },
  ];

  return (
    <ResponsiveContainer width="50%" height="50%">
      <LineChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 20,
          right: 50,
          left: 20,
          bottom: 5,
        }}
      >

        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />


        <Line type="monotone" dataKey="February" stroke="#8884d8" />
        <Line type="monotone" dataKey="January" stroke="#82ca9d" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default PerformanceChart;