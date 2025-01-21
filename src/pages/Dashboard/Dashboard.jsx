import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,ComposedChart,Scatter,Line} from 'recharts';

import "../../styles/dashboard.css";

function Dashboard() {
    const data = [
        {
          name: 'Goals',
          Elio: 3,
          Alice: 4,
          Bob: 2,
          Carol: 6,
          Dave: 1,
          Eve: 7
        },
        {
          name: 'Assists',
          Elio: 2,
          Alice: 3,
          Bob: 1,
          Carol: 4,
          Dave: 2,
          Eve: 5
        },
        {
          name: 'Yellow Cards',
          Elio: 0,
          Alice: 1,
          Bob: 2,
          Carol: 3,
          Dave: 0,
          Eve: 2
        },
        {
          name: 'Red Cards',
          Elio: 2,
          Alice: 0,
          Bob: 1,
          Carol: 0,
          Dave: 2,
          Eve: 1
        }
      ];
      const data2 = [
        { game: 1, Eve: 3, Carol: 2, Alice: 4 },
        { game: 2, Eve: 5, Carol: 7, Alice: 6 },
        { game: 3, Eve: 9, Carol: 7, Alice: 8 },
        { game: 4, Eve: 9, Carol: 10, Alice: 9 },
        { game: 5, Eve: 9, Carol: 10, Alice: 11 },
    ];
    

  return (
    <div className="dashboard-wrapper">
        <div className="main-stats">
          <div>
            <h2>Main Statistics</h2>
      <ResponsiveContainer width="100%" height="80%">
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="Elio" stackId="a" fill="#8884d8" />
          <Bar dataKey="Alice" stackId="a" fill="#ffc658" />
          <Bar dataKey="Bob" stackId="a" fill="#d0ed57" />
          <Bar dataKey="Carol" stackId="a" fill="#a4de6c" />
          <Bar dataKey="Dave" stackId="a" fill="#8dd1e1" />
          <Bar dataKey="Eve" stackId="a" fill="#ff7300" />
        </BarChart>
      </ResponsiveContainer>
      </div>
      <div>
        <h2>Top 3 Goal Scorers Throughout the season</h2>
        <ResponsiveContainer width="100%" height="80%">
              <ComposedChart
                width={600}
                height={400}
                data={data2}
                margin={{
                  top: 20,
                  right: 80,
                  bottom: 20,
                  left: 20,
                }}
              >
                <CartesianGrid stroke="#f5f5f5" />
                <Tooltip />
                <Legend />

                <XAxis dataKey="game" label={{ value: 'Game', position: 'insideBottomRight', offset: 0 }} />
                <YAxis unit="goals" type="number" label={{ value: 'Goals', angle: -90, position: 'insideLeft' }} />

                <Line type="monotone" dataKey="Eve" stroke="#8884d8" />
                <Line type="monotone" dataKey="Carol" stroke="#82ca9d" />
                <Line type="monotone" dataKey="Alice" stroke="#ffc658" />
              </ComposedChart>
            </ResponsiveContainer>
      </div>
    </div>
    </div>
  );
}

export default Dashboard;
