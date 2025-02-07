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

          const matchPromises = teamsResponse.data.map(async (team) => {
            return getMatch(auth.accessToken, team.id); 
          });

          const matchResponses = await Promise.all(matchPromises);
          const allMatches = matchResponses.map((response) => response.data);
          setMatches(allMatches); 
        } catch (error) {
          console.error("Error fetching league or match data:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchLeagueData();
    }
  }, [selectedLeague, auth.accessToken]);

  return (
    <div className="schedule-container">
      <h1 className="schedule-title">League Schedule</h1>

      <div className="schedule-header">
        <select
          className="schedule-league-dropdown"
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

        <button className="schedule-export-button">⚙ EXPORT</button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="schedule-table">
          <thead>
            <tr>
              <th className="schedule-header-team-logo">Logo</th>
              <th className="schedule-header-team-name">Team A</th>
              <th className="schedule-header-result">Result</th>
              <th className="schedule-header-team-logo">Logo</th>
              <th className="schedule-header-team-name">Team B</th>
              <th className="schedule-header-match-time">Match Time</th>
              <th className="schedule-header-actions">Actions</th>
            </tr>
          </thead>
          <tbody>
            {matches.length > 0 ? (
              matches.map((match, index) => (
                <tr key={index} className="schedule-row">
                  <td className="schedule-team-logo">{match.logo1}</td>
                  <td className="schedule-team-name">{match.team1}</td>
                  <td className="schedule-match-result">{match.result}</td>
                  <td className="schedule-team-logo">{match.logo2}</td>
                  <td className="schedule-team-name">{match.team2}</td>
                  <td className="schedule-match-time">{match.matchTime}</td> 
                  <td className="schedule-actions">
                    <button className="schedule-update-button">Update Match</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7">No matches available for this league.</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default LeagueSchedule;
