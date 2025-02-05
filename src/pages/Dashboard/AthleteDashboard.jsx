import React, { useContext, useEffect, useState } from "react";

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
  Cell,
} from "recharts";

import "../../styles/dashboard.css";
import { getColor } from "../../utils/utilities";
import { getMatch } from "../../services/match";
import AuthContext from "../../context/AuthProvider";
function AthleteDashboard() {
    const {auth} = useContext(AuthContext)
    const [mainData, setMainData] = useState([]);
    console.log(mainData)
        useEffect(() => {
          const fetchData = async () => {
            try {
              const matchData = await getMatch(auth.accessToken); 
              
              setMainData(matchData.data.stats); 
            } catch (error) {
              console.error("Error fetching match data:", error);
            }
          };
      
          fetchData();
        }, [auth.accessToken])
    
  let players = []
  if(mainData.mainStats){
    players = Object.keys(mainData.mainStats[0]).filter((key) => key !== "name");
  }
  if (mainData.topGoalScorers){ return (
    <div className="dashboard-wrapper">
      <div className="main-stats">
        <div>
          <h2>Main Statistics</h2>
          <ResponsiveContainer width="100%" height="90%">
            <BarChart
              width={500}
              height={300}
              data={mainData.mainStats}
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
          <ResponsiveContainer width="100%" height="90%">
            <ComposedChart
              width={600}
              height={400}
              data={mainData.topGoalScorers}
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
              {Object.keys(mainData.topGoalScorers[0]).map((key, index) =>
                key !== "game" ? (
                  <Line
                    key={key}
                    type="monotone"
                    dataKey={key}
                    stroke={getColor(index, Object.keys(mainData.topGoalScorers[0]).length - 1)}
                  />
                ) : null
              )}
            </ComposedChart>
          </ResponsiveContainer>
        </div>
        <div>
          <h2>Top 5 Shot Takers</h2>
          <ResponsiveContainer width="100%" height="90%">
            <PieChart width={400} height={400}>
              <Pie
                dataKey="value"
                isAnimationActive={false}
                data={mainData.shotsResult}
                cx="50%"
                cy="50%"
                outerRadius={160}
                fill="#8884d8"
                label
                paddingAngle={5}
              >
                {mainData.shotsResult.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={getColor(index, mainData.shotsResult.length)}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div>
          <h2>Top 3 Interceptors</h2>
          <ResponsiveContainer width="100%" height="90%">
            <AreaChart
              width={500}
              height={400}
              data={mainData.topInterceptors}
              margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="game"
                label={{ value: "Game", position: "insideRight" }}
              />
              <YAxis
                label={{
                  value: "Interceptions",
                  angle: -90,
                  position: "insideLeft",
                }}
              />
              <Tooltip />
              {Object.keys(mainData.topInterceptors[0]).map((key, index) => {
                if (key !== "game") {
                  return (
                    <Area
                      key={key}
                      type="monotone"
                      dataKey={key}
                      stackId="1"
                      stroke={getColor(index, Object.keys(mainData.topInterceptors[0]).length - 1)}
                      fill={getColor(index, Object.keys(mainData.topInterceptors[0]).length - 1)}
                    />
                  );
                }
                return null;
              })}
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );}
}

export default AthleteDashboard;
