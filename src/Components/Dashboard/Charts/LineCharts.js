import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  {
    name: 'Week 1',
    January: 40,
    February: 24,
    amt: 100,
  },
  {
    name: 'Week 2',
    January: 30,
    February: 13,
    amt: 100,
  },
  {
    name: 'Week 3',
    January: 20,
    February: 40,
    amt: 100,
  },
  {
    name: 'Week 4',
    January: 27,
    February: 39,
    amt: 100,
  }
  
];
const LineCharts = () => {
    return (
       <ResponsiveContainer width="100%" height="80%">
        <LineChart
          width={150}
          height={200}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          
          <XAxis dataKey="name" />
          <YAxis dataKey="amt"/>
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="January" stroke="#8884d8" activeDot={{ r: 8 }} />
          <Line type="monotone" dataKey="February" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>
    );
};

export default LineCharts;