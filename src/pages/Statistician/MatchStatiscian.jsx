import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "../../styles/matchStatiscian.css";
import Bayern from "../../assets/temp/teamLogos/Bayern.png";
import Skenderbeu from "../../assets/temp/teamLogos/mls.webp"; // Ensure this path is correct

const MatchCard = () => {
  const navigate = useNavigate(); // Hook for navigation

  // Function to navigate to match upload
  const handleUploadStats = () => {
    navigate("/app/match-upload"); // Navigate to Match Upload
  };

  // Function to navigate to highlight upload
  const handleUploadHigh = () => {
    navigate("/app/hightlight-upload"); // Navigate to Highlight Upload
  };

  return (
    <div className="match-statiscian-container">
      <h2 className="match-statiscian-title">
        Match <span className="match-statiscian-number">#50</span> - 
        <img src={Bayern} alt="Bayern Munich" className="match-statiscian-team-logo" /> Bayern Munchen vs 
        <img src={Skenderbeu} alt="Skenderbeu" className="match-statiscian-team-logo" /> Skenderbeu
      </h2>

      <div className="match-statiscian-box">
        {/* Bayern Team Section */}
        <div className="match-statiscian-team">
          <img src={Bayern} alt="Bayern Munich" className="match-statiscian-team-icon" />
          <button className="match-statiscian-upload-btn" onClick={handleUploadStats}>
            Upload Stats
          </button>
          <button className="match-statiscian-forfeit-btn">FORFEIT</button>
        </div>

        <div className="match-statiscian-vs">vs.</div>

        {/* Skenderbeu Team Section */}
        <div className="match-statiscian-team">
          <img src={Skenderbeu} alt="Skenderbeu" className="match-statiscian-team-icon" />
          <button className="match-statiscian-upload-btn" onClick={handleUploadStats}>
            Upload Stats
          </button>
          <button className="match-statiscian-forfeit-btn">FORFEIT</button>
        </div>
      </div>

      {/* Fixed the onClick for Upload Highlights button */}
      <button className="match-statiscian-upload-highlights" onClick={handleUploadHigh}>
        Upload Highlights
      </button>
    </div>
  );
};

export default MatchCard;
