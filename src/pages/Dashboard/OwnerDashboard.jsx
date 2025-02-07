import React, { useContext, useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";
import AuthContext from "../../context/AuthProvider";
import { getDashboardStats } from "../../services/employees";
import { getColor } from "../../utils/utilities"; 

const DashboardCharts = () => {
  const { auth } = useContext(AuthContext);
  const [mainData, setMainData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const statsData = await getDashboardStats(auth.accessToken);
        const parsedData = statsData.data.stats.map((league) => ({
          leagueName: league.leaguename,
          totalTeams: Number(league.totalteams), 
          totalRevenue: Number(league.totalrevenue), 
          totalEmployees: Number(league.totalemployees),
        }));
        setMainData(parsedData); 
      } catch (error) {
        console.error("Error fetching dashboard stats:", error);
      }
    };

    fetchData();
  }, [auth.accessToken]);



  return (
    <div className="dashboard-wrapper">
      <div className="main-stats">
        <div>
          <h2>Total Revenue Per League</h2>
          <ResponsiveContainer width="100%" height="90%">
            <BarChart data={mainData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="leagueName" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="totalRevenue" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div>
          <h2>Total Teams Per League</h2>
          <ResponsiveContainer width="100%" height="90%">
          <PieChart >
              <Pie
                data={mainData}
                dataKey="totalTeams"
                nameKey="leagueName"
                outerRadius={160}
                fill="#82ca9d"
                label
                paddingAngle={5}
              >
                {mainData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={getColor(index, mainData.length)} 
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div>
          <h2>Total Employees Per League</h2>
          <ResponsiveContainer width="90%" height='90%'>
            <BarChart data={mainData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="leagueName" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="totalEmployees" fill="#ff7300" />
            </BarChart>
          </ResponsiveContainer>
      </div>
        </div>  

    </div>
  );
};

export default DashboardCharts;
