import { useState, useEffect } from "react";
import { getLeagues } from "../../services/leagues";
import { getMatchesByLeagueId } from "../../services/match";
import useAuth from "../../hooks/useAuth";
import "../../styles/leagueSchedule.css";
import { useNavigate } from "react-router-dom"; 

const LeagueSchedule = () => {
  const { auth } = useAuth();
  const [selectedLeague, setSelectedLeague] = useState("");
  const [leagues, setLeagues] = useState([]);
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); 

  const handleUpdateMatch = (matchId) => {
    navigate(`../match-statiscian/${matchId}`);
  };

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
    if (!selectedLeague) return;

    const fetchMatches = async () => {
      setLoading(true);
      try {
        const response = await getMatchesByLeagueId(auth.accessToken, selectedLeague);
        setMatches(response.data.matches);
        console.log(response.data.matches)
      } catch (error) {
        console.error("Error fetching matches:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMatches();
  }, [selectedLeague, auth.accessToken]);

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
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="league-schedule-table">
          <thead>
            <tr>
              <th>Home Teame</th>
              <th>Home Team Name</th>
              <th>Result</th>
              <th>Away Team </th>
              <th>Away Team Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {matches.map((match, index) => (
              <tr key={index}>
                <td className="league-schedule-team-logo">
                  <img src={match.logo1} alt={match.team1} width="50" />
                </td>
                <td className="league-schedule-team-name">{match.team1}</td>
                <td className="league-schedule-match-result">{match.result}</td>
                <td className="league-schedule-team-logo">
                  <img src={match.logo2} alt={match.team2} width="50" />
                </td>
                <td className="league-schedule-team-name">{match.team2}</td>
                <td>
                 <button
                    className="league-schedule-update-button"
                    onClick={() => handleUpdateMatch(match.matchId)} 
                  >
                    Update Match
                  </button>
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
