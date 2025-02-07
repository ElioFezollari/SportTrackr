import React, { useState, useEffect } from "react";
import { getLeagues } from "../../services/leagues";
import { getTeamsByLeagueId } from "../../services/team";
import { getMatch } from "../../services/match";
import useAuth from "../../hooks/useAuth";
import "../../styles/leagueSchedule.css";

const LeagueSchedule = () => {
  const { auth } = useAuth();
  const [selectedLeague, setSelectedLeague] = useState("");
  const [leagues, setLeagues] = useState([]);
  const [teams, setTeams] = useState([]);
  const [matches, setMatches] = useState([]); 
  const [loading, setLoading] = useState(false);

  // Dummy match data (kept as requested)
  const dummyMatches = [
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

  useEffect(() => {
    const fetchLeagues = async () => {
      setLoading(true);
      try {
        const response = await getLeagues(auth.accessToken);
        setLeagues(response.data.leagues);
      } catch (error) {
        console.error("Error fetching leagues:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLeagues();
  }, [auth.accessToken]);

  useEffect(() => {
    if (selectedLeague) {
      const fetchLeagueData = async () => {
        setLoading(true);
        try {
          const teamsResponse = await getTeamsByLeagueId(auth.accessToken, selectedLeague);
          setTeams(teamsResponse.data.teams);

          const matchPromises = teamsResponse.data.teams.map(async (team) =>
            getMatch(auth.accessToken, team.id)
          );

          const matchResponses = await Promise.all(matchPromises);
          const allMatches = matchResponses.map((response) => response.data);

          setMatches(allMatches.flat()); 
        } catch (error) {
          console.error("Error fetching league or match data:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchLeagueData();
    }
  }, [selectedLeague, auth.accessToken]);

  const handleExport = () => {
    console.log("Exporting schedule...");
    // Implement export logic
  };

  return (
    <div className="league-schedule-container">
      <h1 className="league-schedule-title">League Schedule</h1>

      <div className="league-schedule-header">
        <select
          className="league-schedule-league-dropdown"
          value={selectedLeague}
          onChange={(e) => setSelectedLeague(e.target.value)}
        >
          <option value="">Pick a league</option>
          {leagues.length > 0 ? (
            leagues.map((league) => (
              <option key={league.id} value={league.id}>
                {league.leagueName}
              </option>
            ))
          ) : (
            <option value="">No leagues available</option>
          )}
        </select>

        <button className="league-schedule-export-button" onClick={handleExport}>⚙ EXPORT</button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="league-schedule-table">
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
            {/* Rendering dummy matches */}
            {dummyMatches.map((match, index) => (
              <tr key={index}>
                <td className="league-schedule-team-logo">{match.logo1}</td>
                <td className="league-schedule-team-name">{match.team1}</td>
                <td className="league-schedule-match-result">{match.result}</td>
                <td className="league-schedule-team-logo">{match.logo2}</td>
                <td className="league-schedule-team-name">{match.team2}</td>
                <td>
                  <button className="league-schedule-update-button">Update Match</button>
                </td>
              </tr>
            ))}

            {/* Rendering API-fetched matches (once integrated) */}
            {matches.map((match, index) => (
              <tr key={index + dummyMatches.length}>
                <td className="league-schedule-team-logo">{match.logo1 || "🏳"}</td>
                <td className="league-schedule-team-name">{match.team1}</td>
                <td className="league-schedule-match-result">{match.result || "TBD"}</td>
                <td className="league-schedule-team-logo">{match.logo2 || "🏳"}</td>
                <td className="league-schedule-team-name">{match.team2}</td>
                <td>
                  <button className="league-schedule-update-button">Update Match</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default LeagueSchedule;
