import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ComposedChart,
  Scatter,
  Line,
  PieChart,
  Pie,
  AreaChart,
  Area,
} from "recharts";

import "../../styles/dashboard.css";
import { getColor } from "../../utils/utilities";

function Dashboard() {
  const data = [
    {
      name: "Goals",
      Jamal: 1,
      Manuel: 0,
      Aleksandar: 0,
      Dayot: 2,
      Eric: 0,
      Kingsley: 0,
      Leon: 1,
      Joshua: 2,
      Alphonso: 3,
      Leroy: 1,
      Serge: 0,
    },
    {
      name: "Assists",
      Jamal: 0,
      Manuel: 1,
      Aleksandar: 0,
      Dayot: 2,
      Eric: 0,
      Kingsley: 0,
      Leon: 1,
      Joshua: 3,
      Alphonso: 2,
      Leroy: 0,
      Serge: 0,
    },
    {
      name: "Yellow Cards",
      Jamal: 0,
      Manuel: 1,
      Aleksandar: 2,
      Dayot: 1,
      Eric: 0,
      Kingsley: 0,
      Leon: 0,
      Joshua: 1,
      Alphonso: 1,
      Leroy: 1,
      Serge: 0,
    },
    {
      name: "Red Cards",
      Jamal: 0,
      Manuel: 0,
      Aleksandar: 0,
      Dayot: 0,
      Eric: 0,
      Kingsley: 0,
      Leon: 0,
      Joshua: 0,
      Alphonso: 1,
      Leroy: 0,
      Serge: 0,
    },
  ];
  const players = Object.keys(data[0]).filter((key) => key !== "name");

  const data2 = [
    { game: 1, Eve: 3, Carol: 2, Alice: 4 },
    { game: 2, Eve: 5, Carol: 7, Alice: 6 },
    { game: 3, Eve: 9, Carol: 7, Alice: 8 },
    { game: 4, Eve: 9, Carol: 10, Alice: 9 },
    { game: 5, Eve: 9, Carol: 10, Alice: 11 },
  ];
  const data3 = [
    { name: "Group A", value: 400 },
    { name: "Group B", value: 300 },
    { name: "Group C", value: 300 },
    { name: "Group D", value: 200 },
    { name: "Group E", value: 278 },
    { name: "Group F", value: 189 },
  ];
  const data4 = [
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
          <ResponsiveContainer width="100%" height="95%">
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
              {players.map((player, index) => {
                return (
                  <Bar
                    key={player}
                    dataKey={player}
                    stackId="a"
                    fill={getColor(index, players.length)}
                  />
                );
              })}
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div>
          <h2>Top 3 Goal Scorers Throughout the season</h2>
          <ResponsiveContainer width="100%" height="95%">
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
              <XAxis
                dataKey="game"
                label={{
                  value: "Game",
                  position: "insideBottomRight",
                  offset: 0,
                }}
              />
              <YAxis
                unit="goals"
                type="number"
                label={{ value: "Goals", angle: -90, position: "insideLeft" }}
              />
              <Line type="monotone" dataKey="Eve" stroke="#8884d8" />
              <Line type="monotone" dataKey="Carol" stroke="#82ca9d" />
              <Line type="monotone" dataKey="Alice" stroke="#ffc658" />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
        <div>
          <h2>Top 5 Shot Takers</h2>
          <ResponsiveContainer width="100%" height="95%">
            <PieChart width={400} height={400}>
              <Pie
                dataKey="value"
                isAnimationActive={false}
                data={data3}
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                label
              />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div>
          <h2>Top 3 Interception</h2>
          <ResponsiveContainer width="100%" height="95%">
            <AreaChart
              width={500}
              height={400}
              data={data4}
              margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="game" label={{value:"Game", position: "insideRight"}}/>
              <YAxis  label={{value:"Interceptions",angle: -90, position: "insideLeft"}}/>
              <Tooltip />
              <Area
                type="monotone"
                dataKey="Alice"
                stackId="1"
                stroke="#8884d8"
                fill="#8884d8"
              />
              <Area
                type="monotone"
                dataKey="Eve"
                stackId="1"
                stroke="#82ca9d"
                fill="#82ca9d"
              />
              <Area
                type="monotone"
                dataKey="Carol"
                stackId="1"
                stroke="#ffc658"
                fill="#ffc658"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
