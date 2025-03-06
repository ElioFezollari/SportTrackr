import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; 
import "../../styles/matchStatiscian.css";
import { getMatchById } from "../../services/match";
import useAuth from "../../hooks/useAuth";

const MatchStatiscian = () => {
  const { matchId } = useParams();
  const navigate = useNavigate(); 
  const { auth } = useAuth();
  const [match, setMatch] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!matchId) return;

    const fetchMatch = async () => {
      setLoading(true);
      try {
        const response = await getMatchById(auth.accessToken, matchId);
        setMatch(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching match:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMatch();
  }, [matchId, auth.accessToken]);

  if (loading) return <p>Loading match details...</p>;
  if (!match) return <p>Match not found!</p>;

  const handleUploadStats = (team) => {
    navigate(`/app/match-upload/${match.id}/${team}`);
  };
    const handleUploadHigh = () => navigate(`/app/highlight-upload`);

  return (
    <div className="match-statiscian-container">
      <h2 className="match-statiscian-title">
        Match <span className="match-statiscian-number">#{match.id}</span> - 
        <img src={match.home_team_logo} alt={match.home_team_name} className="match-statiscian-team-logo" /> {match.home_team_name} vs 
        <img src={match.away_team_logo} alt={match.away_team_name} className="match-statiscian-team-logo" /> {match.away_team_name}
      </h2>

      <div className="match-statiscian-box">
        {/* Home Team Section */}
        <div className="match-statiscian-team">
          <img src={match.home_team_logo} alt={match.home_team_name} className="match-statiscian-team-icon" />
          <button className="match-statiscian-upload-btn" onClick={() => handleUploadStats('home')}>
            Upload Stats
          </button>
          <button className="match-statiscian-forfeit-btn">FORFEIT</button>
        </div>

        <div className="match-statiscian-vs">vs.</div>

        {/* Away Team Section */}
        <div className="match-statiscian-team">
          <img src={match.away_team_logo} alt={match.away_team_name} className="match-statiscian-team-icon" />
          <button className="match-statiscian-upload-btn" onClick={() => handleUploadStats('away')}>
            Upload Stats
          </button>
          <button className="match-statiscian-forfeit-btn">FORFEIT</button>
        </div>
      </div>

      <button className="match-statiscian-upload-highlights" onClick={handleUploadHigh}>
        Upload Highlights
      </button>
    </div>
  );
};

export default MatchStatiscian;
