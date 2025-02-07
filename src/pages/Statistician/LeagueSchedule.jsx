import React, { useState } from "react";
import "../../styles/leagueSchedule.css";


const LeagueSchedule = () => {
  const [selectedLeague, setSelectedLeague] = useState("");

  const matches = [
    { team1: "Leverkusen", logo1: "🇩🇪", result: "3-1", team2: "Wolfsburg", logo2: "🇩🇪" },
    { team1: "Stuttgart", logo1: "🇩🇪", result: "2-1", team2: "Skenderbeu", logo2: "🇦🇱" },
    { team1: "Bayern", logo1: "🇩🇪", result: "4-0", team2: "Hoffenheim", logo2: "🇩🇪" },
    { team1: "Leipzig", logo1: "🇩🇪", result: "TBD", team2: "Frankfurt", logo2: "🇩🇪" },
    { team1: "Dortmund", logo1: "🇩🇪", result: "TBD", team2: "Leipzig", logo2: "🇩🇪" },
    { team1: "Frankfurt", logo1: "🇩🇪", result: "TBD", team2: "Dortmund", logo2: "🇩🇪" },
    { team1: "Hoffenheim", logo1: "🇩🇪", result: "TBD", team2: "Stuttgart", logo2: "🇩🇪" },
    { team1: "Skenderbeu", logo1: "🇦🇱", result: "TBD", team2: "Bayern", logo2: "🇩🇪" },
    { team1: "Wolfsburg", logo1: "🇩🇪", result: "TBD", team2: "Leverkusen", logo2: "🇩🇪" },
  ];

  return (
    <div className="league-container">
      <h1 className="league-title">League Schedule</h1>

      <select
        className="league-dropdown"
        value={selectedLeague}
        onChange={(e) => setSelectedLeague(e.target.value)}
      >
        <option value="">Pick a league</option>
        <option value="bundesliga">Bundesliga</option>
        <option value="laliga">La Liga</option>
        <option value="premierleague">Premier League</option>
      </select>

      <button className="export-button">⚙ EXPORT</button>

      <table className="schedule-table">
        <thead>
          <tr>
            <th>Team</th>
            <th>Team's Name</th>
            <th>Result</th>
            <th>Team 2</th>
            <th>Team 2 Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {matches.map((match, index) => (
            <tr key={index}>
              <td className="team-logo">{match.logo1}</td>
              <td className="team-name">{match.team1}</td>
              <td className="match-result">{match.result}</td>
              <td className="team-logo">{match.logo2}</td>
              <td className="team-name">{match.team2}</td>
              <td>
                <button className="update-button">Update Match</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LeagueSchedule;
