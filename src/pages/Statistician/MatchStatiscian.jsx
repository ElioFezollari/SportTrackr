import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; 
import "../../styles/matchStatiscian.css";
import { getMatchById, updateForfeited } from "../../services/match"; 
import useAuth from "../../hooks/useAuth";
import defaultTeamLogo from '../../assets/images/defaultLogo/deafult_team_logo.svg';

const MatchStatiscian = () => {
  const { matchId } = useParams();
  const navigate = useNavigate(); 
  const { auth } = useAuth();
  const [match, setMatch] = useState(null);
  const [loading, setLoading] = useState(true);
  const [forfeitLoading, setForfeitLoading] = useState(false); 
  const [modal, setModal] = useState({ open: false, team: null });

  useEffect(() => {
    if (!matchId) return;

    const fetchMatch = async () => {
      setLoading(true);
      try {
        const response = await getMatchById(auth.accessToken, matchId);
        setMatch(response.data);
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

  const handleUploadHigh = () => navigate(`/app/highlight-upload/${matchId}`);

  const openForfeitModal = (team) => {
    setModal({ open: true, team });
  };

  const closeForfeitModal = () => {
    setModal({ open: false, team: null });
  };

  const handleForfeitConfirm = async () => {
    if (!modal.team || !auth.accessToken) return;
    
    const forfeitedBy = modal.team === "home" ? 1 : 2; 
    setForfeitLoading(true);

    try {
      const updatedMatch = await updateForfeited(auth.accessToken, matchId, forfeitedBy);
      setMatch(updatedMatch.match); 
      closeForfeitModal();
    } catch (error) {
      console.error("Error forfeiting match:", error);
      alert("Failed to forfeit match.");
    } finally {
      setForfeitLoading(false);
    }
  };

  return (
    <div className="match-statiscian-container">
      <h2 className="match-statiscian-title">
        Match <span className="match-statiscian-number">#{match.id}</span> - 
        <img src={match.home_team_logo ? match.home_team_logo : defaultTeamLogo} alt={match.home_team_name} className="match-statiscian-team-logo" /> {match.home_team_name} vs 
        <img src={match.away_team_logo ? match.away_team_logo : defaultTeamLogo} alt={match.away_team_name} className="match-statiscian-team-logo" /> {match.away_team_name}
      </h2>

      <div className="match-statiscian-box">
        {/* Home Team Section */}
        <div className="match-statiscian-team">
          <img src={match.home_team_logo ? match.home_team_logo : defaultTeamLogo} alt={match.home_team_name} className="match-statiscian-team-icon" />
          <button className="match-statiscian-upload-btn" onClick={() => handleUploadStats("home")}>
            Upload Stats
          </button>
          <button 
            className="match-statiscian-forfeit-btn"
            onClick={() => openForfeitModal("home")}
            disabled={forfeitLoading} 
          >
            FORFEIT
          </button>
        </div>

        <div className="match-statiscian-vs">vs.</div>

        {/* Away Team Section */}
        <div className="match-statiscian-team">
          <img src={match.away_team_logo ? match.away_team_logo : defaultTeamLogo} alt={match.away_team_name} className="match-statiscian-team-icon" />
          <button className="match-statiscian-upload-btn" onClick={() => handleUploadStats("away")}>
            Upload Stats
          </button>
          <button 
            className="match-statiscian-forfeit-btn"
            onClick={() => openForfeitModal("away")}
            disabled={forfeitLoading} 
          >
            FORFEIT
          </button>
        </div>
      </div>

      <button className="match-statiscian-upload-highlights" onClick={handleUploadHigh}>
        Upload Highlights
      </button>

      {/* Custom Forfeit Modal */}
      {modal.open && (
        <div className="statiscian-modal-overlay">
          <div className="statiscian-modal-content">
            <h3>Confirm Forfeit</h3>
            <p>Are you sure you want to forfeit for the {modal.team} team?</p>
            <div className="statiscian-modal-actions">
              <button className="statiscian-cancel-btn" onClick={closeForfeitModal}>Cancel</button>
              <button className="statiscian-confirm-btn" onClick={handleForfeitConfirm} disabled={forfeitLoading}>
                {forfeitLoading ? "Forfeiting..." : "Confirm"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MatchStatiscian;
