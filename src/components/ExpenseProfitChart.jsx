import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function ExpenseProfitChart({ data }) {
  // Example data structure:
  // const data = [
  //   { name: 'Jan', profit: 4000, expense: 2400 },
  //   { name: 'Feb', profit: 3000, expense: 1398 },
  //   { name: 'Mar', profit: 2000, expense: 9800 },
  //   { name: 'Apr', profit: 2780, expense: 3908 },
  //   { name: 'May', profit: 1890, expense: 4800 },
  //   { name: 'Jun', profit: 2390, expense: 3800 },
  // ];

  return (
    <ResponsiveContainer width="100%" height={300}> {/* Adjust height as needed */}
      <LineChart
        data={data}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" /> {/* Light grid lines */}
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type="monotone" // Smooth curve
          dataKey="profit"
          stroke="#4CAF50" // Green for profit (adjust to your design)
          activeDot={{ r: 8 }}
          strokeWidth={2}
        />
        <Line
          type="monotone"
          dataKey="expense"
          stroke="#F44336" // Red for expense (adjust to your design)
          strokeWidth={2}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

export default ExpenseProfitChart;