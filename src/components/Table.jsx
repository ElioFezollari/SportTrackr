import React, { useEffect, useState } from "react";
import "../styles/components/table.css";
import useAuth from "../hooks/useAuth";
import { getTeamsByLeagueId } from "../services/team";

function Table({ headers, optionPicked }) {
  const { auth } = useAuth();
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const teamsData = await getTeamsByLeagueId(auth.accessToken, optionPicked);

        setTeams(teamsData.data.teams)

      } catch (error) {
        console.error("Error fetching teams:", error);
      }
    };

    if (auth.accessToken && optionPicked) {
      fetchTeams();
    
    }
  }, [optionPicked, auth.accessToken]);
  return (
    <div className="table-container">
    <table className="table">
      <thead>
        <tr>
          {headers.map((header, index) => (
            <th key={index}>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {teams.length > 0 ? (
          teams.map((team, index) => (
            <tr key={index}>
              <td>
                <img src={team.signedUrl} alt={team.name}  />
              </td>
              <td>{team.name}</td>
              <td>{team.leagueName}</td>
              <td>{team.ownerName || "N/A"}</td>
              <td>{team.matchesPlayed || 0}</td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={headers.length}>No teams available</td>
          </tr>
        )}
      </tbody>
    </table>
    </div>
  );
}

export default Table;