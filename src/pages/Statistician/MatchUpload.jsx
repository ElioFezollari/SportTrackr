import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getMatchDetails } from "../../services/match";
import { updateMatch } from "../../services/match";

import "../../styles/statistician.css";
import useAuth from "../../hooks/useAuth";

const MatchUpload = () => {
  const { matchId, team } = useParams();
  const navigate = useNavigate();
  const { auth } = useAuth();

  const [match, setMatch] = useState(null);
  const [players, setPlayers] = useState([]);
  const [activePlayer, setActivePlayer] = useState(null);
  const [updatedTeams, setUpdatedTeams] = useState({ home: false, away: false });
  const [homeTeam, setHomeTeam] = useState({ id: null, players: [] });
  const [awayTeam, setAwayTeam] = useState({ id: null, players: [] });
  
  useEffect(() => {
    const fetchMatch = async () => {
      try {
        console.log("Fetching match data for matchId:", matchId);
        const response = await getMatchDetails(auth.accessToken, matchId);
        setMatch(response.data);
        console.log("Match data:", response.data);

        // Set players based on the selected team
        if (team === "home") {
          setPlayers(response.data.homeTeam.players || []);
        } else {
          setPlayers(response.data.awayTeam.players || []);
        }

        setUpdatedTeams((prev) => ({
          ...prev,
          [team === "home" ? "away" : "home"]: true,
        }));      } 
        catch (error) {
        console.error("Error fetching match:", error);
      }
    };

    fetchMatch();
  }, [matchId, team, auth.accessToken]);

  const togglePlayer = (id) => {
    setActivePlayer(activePlayer === id ? null : id);
  };

  const updateStat = (playerId, stat, delta) => {
    setPlayers((prev) =>
      prev.map((player) =>
        player.user_id === playerId
          ? { ...player, [stat]: Math.max(0, (player[stat] || 0) + delta) }
          : player
      )
    );
  };

  const updateCard = (playerId, cardType, delta) => {
    setPlayers((prev) =>
      prev.map((player) =>
        player.user_id === playerId
          ? {
              ...player,
              [cardType]: Math.max(0, (player[cardType] || 0) + delta),
            }
          : player
      )
    );
  };

  const handleNextTeam = () => {
    setUpdatedTeams((prev) => ({ ...prev, [team]: true }));
  
    // Toggle between home and away
    const nextTeam = team === "home" ? "away" : "home";
    if (team === "home") {
      // Save current team stats (home)
      setHomeTeam({ id: match.homeTeam.id, players: match.homeTeam.players });
  
      // Save the other team stats (away)
      setAwayTeam({ id: match.awayTeam.id, players: match.awayTeam.players });
    } else {
      // Save current team stats (away)
      setAwayTeam({ id: match.awayTeam.id, players: match.awayTeam.players });
  
      // Save the other team stats (home)
      setHomeTeam({ id: match.homeTeam.id, players: match.homeTeam.players });
    }
  
  
    navigate(`/app/match-upload/${matchId}/${nextTeam}`);
  };
  
  const handleUpload = async () => {
    try {
      // Log both home and away team stats for uploading
      console.log("Uploading final stats:", { homeTeam, awayTeam });
  
  
      // Call the API to upload the match stats for both teams
      const response = await updateMatch(auth.accessToken, matchId, homeTeam, awayTeam);  // Sending the access token and the statsData
  
      if (response) {
        console.log('Match stats uploaded successfully!');
        navigate(`/app/match-statiscian/${matchId}`); // Redirect to a match summary page or another appropriate page after upload
      } else {
        console.error('Error uploading match stats');
      }
    } catch (error) {
      console.error('Error uploading match stats:', error);
    }
  };
  
  if (!match) return <p>Loading match data...</p>;

  return (
    <div className="stats-container">
      <header className="match-upload-header">
        <h1>
          Match #{matchId} Player Stats Upload -{" "}
          <img src={match?.homeTeam?.logo} alt={match?.homeTeam?.name} className="team-logo-match" /> {match?.homeTeam?.name} vs{" "}
          <img src={match?.awayTeam?.logo} alt={match?.awayTeam?.name} className="team-logo-match" /> {match?.awayTeam?.name}
        </h1>
      </header>

      <div className="matchUpload-team-container">
        <h1>{team === "home" ? match?.homeTeam?.name : match?.awayTeam?.name}</h1>

        <table className="stats-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Position</th>
              <th>Number</th>
              <th>More info</th>
            </tr>
          </thead>
          <tbody>
            {players.map((player) => (
              <React.Fragment key={player.user_id}>
                <tr className="player-row" onClick={() => togglePlayer(player.user_id)}>
                  <td>{player.user_name}</td>
                  <td>{player.position_played}</td>
                  <td>{player.number}</td>
                  <td className="more-info">
                    <span className={`arrow ${activePlayer === player.user_id ? "rotated" : ""}`}>&gt;</span>
                  </td>
                </tr>
                {activePlayer === player.user_id && (
                  <tr className="player-details">
                    <td colSpan="4">
                      <div className="stats">
                        {["goals", "shots", "assists", "saves", "interceptions"].map((stat) => (
                          <div key={stat} className="stat-box">
                            <label>{stat.charAt(0).toUpperCase() + stat.slice(1)}</label>
                            <div className="counter">
                              <button onClick={() => updateStat(player.user_id, stat, -1)}>-</button>
                              <span>{player[stat] || 0}</span>
                              <button onClick={() => updateStat(player.user_id, stat, 1)}>+</button>
                            </div>
                          </div>
                        ))}

                        {/* Yellow Cards */}
                        <div className="stat-box">
                          <label>Yellow Cards</label>
                          <div className="counter">
                            <button onClick={() => updateCard(player.user_id, "yellow_cards", -1)}>-</button>
                            <span>{player.yellow_cards || 0}</span>
                            <button onClick={() => updateCard(player.user_id, "yellow_cards", 1)}>+</button>
                          </div>
                        </div>

                        {/* Red Cards */}
                        <div className="stat-box">
                          <label>Red Cards</label>
                          <div className="counter">
                            <button onClick={() => updateCard(player.user_id, "red_cards", -1)}>-</button>
                            <span>{player.red_cards || 0}</span>
                            <button onClick={() => updateCard(player.user_id, "red_cards", 1)}>+</button>
                          </div>
                        </div>

                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>

        {/* Show the Next Button only once for the first team */}
        {(!updatedTeams.home && team === "home") || (!updatedTeams.away && team === "away" && updatedTeams.home) ? (
          <button className="upload-button" onClick={handleNextTeam}>
            Next Team ({team === "home" ? match?.awayTeam?.name : match?.homeTeam?.name})
          </button>
        ) : updatedTeams.home && updatedTeams.away ? (
          <button className="upload-button" onClick={handleUpload}>
            Upload Stats
          </button>
        ) : null}

      </div>
    </div>
  );
};

export default MatchUpload;
