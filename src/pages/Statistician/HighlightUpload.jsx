import React, { useState, useEffect } from "react";
import "../../styles/highlightUpload.css";
import uploadLogo from "../../assets/images/statistician/uploadLogo.png";
import { getMatchDetails } from "../../services/match";
import { useParams, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { uploadHighlights } from "../../services/match"; 

function HighlightUpload() {
  const { auth } = useAuth();
  const { matchId } = useParams();
  const [highlights, setHighlights] = useState([]);
  const [highlightType, setHighlightType] = useState("");
  const [selectedPlayerId, setSelectedPlayerId] = useState("");
  const [error, setError] = useState("");
  const [players, setPlayers] = useState([]);
  const [matchDetails, setMatchDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Fetch match details dynamically
  useEffect(() => {
    const fetchMatchDetails = async () => {
      setIsLoading(true);
      try {
        if (!matchId) return;
        const matchData = await getMatchDetails(auth.accessToken, matchId);

        if (matchData) {
          setMatchDetails(matchData.data); 
          const allPlayers = [
            ...(matchData.data.homeTeam?.players || []),
            ...(matchData.data.awayTeam?.players || []),
          ];

          setPlayers(allPlayers);
        }
      } catch (error) {
        console.error("Error fetching match details:", error);
        setError("Failed to load match details.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchMatchDetails();
  }, [matchId, auth.accessToken]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;
  
    if (highlights.length >= 3) {
      setError("You can only upload a maximum of 3 videos.");
      return;
    }
  
    if (!highlightType || !selectedPlayerId) {
      setError("Please select a highlight type and a player.");
      return;
    }
  
    const videoURL = URL.createObjectURL(file);
    const videoElement = document.createElement("video");
    videoElement.src = videoURL;
    videoElement.crossOrigin = "anonymous";
    videoElement.muted = true;
    videoElement.playsInline = true;
  
    videoElement.addEventListener("loadeddata", () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
  
      canvas.width = videoElement.videoWidth;
      canvas.height = videoElement.videoHeight;
      videoElement.currentTime = 0.5;
  
      videoElement.addEventListener("seeked", () => {
        ctx.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
        const thumbnail = canvas.toDataURL("image/png");
  
        setHighlights((prevHighlights) => [
          ...prevHighlights,
          {
            id: prevHighlights.length + 1,
            name: `Highlight ${prevHighlights.length + 1}`,
            type: highlightType,
            playerId: selectedPlayerId,
            thumbnail: thumbnail,
            file: file, // Add the file to the state
          },
        ]);
        setError("");  // Reset error after successful upload
      });
  
      videoElement.currentTime = 0.5;
    });
  };
  
  const handleSubmit = async (event) => {
    event.preventDefault();
  
    // Validate highlights length
    if (highlights.length === 0 || highlights.length > 3) {
      setError("Please upload between 1 and 3 highlights.");
      return;
    }
  
    const formData = new FormData();
  
    highlights.forEach((highlight, index) => {
      formData.append(`highlights[${index}][video]`, highlight.file);
      formData.append(`highlights[${index}][playerId]`, highlight.playerId);
      formData.append(`highlights[${index}][matchId]`, matchId);
      formData.append(`highlights[${index}][type]`, highlight.type);
    });
  
    for (let pair of formData.entries()) {
      console.log(pair[0] + ": " + pair[1]);
    }
  
    try {
      const response = await uploadHighlights(auth.accessToken, formData);
      console.log(response);
      
      if (response) {
        navigate(`/app/match-statiscian/${matchId}`);
      }
    } catch (error) {
      console.error("Error uploading highlights:", error);
      setError("Failed to upload highlights. Please try again.");
    }
  };

  if (isLoading) {
    return <p>Loading match details...</p>;
  }

  if (!matchDetails) {
    return <p>No match details found.</p>;
  }

  return (
    <div className="highlight-upload-container">
      <header className="highlight-upload-header">
        <h1>
          Match #{matchDetails.matchId} -{" "}
          <img
            src={matchDetails.homeTeam.logo}
            alt={matchDetails.homeTeam.name}
            className="team-logo-highlight-up"
          />{" "}
          {matchDetails.homeTeam.name} vs{" "}
          <img
            src={matchDetails.awayTeam.logo}
            alt={matchDetails.awayTeam.name}
            className="team-logo-highlight-up"
          />{" "}
          {matchDetails.awayTeam.name}
        </h1>
      </header>

      <div className="upload-box">
        <div className="highlight-upload-box">
          <select
            className="highlight-type"
            onChange={(e) => setHighlightType(e.target.value)}
          >
            <option value="">Select Highlight Type</option>
            <option value="Goal">Goal</option>
            <option value="Save">Save</option>
            <option value="Dribble">Dribble</option>
          </select>

          <select
            className="highlight-type"
            onChange={(e) => setSelectedPlayerId(e.target.value)}
          >
            <option value="">Select Player</option>
            {players.map((player) => (
              <option key={player.id} value={player.user_id}>
                {player.user_name} ({player.position_played || "Unknown position"})
              </option>
            ))}
          </select>

          <div className="upload-area">
            <input
              type="file"
              id="file-upload"
              className="file-input"
              accept="video/*"
              onChange={handleFileChange}
            />
            <label htmlFor="file-upload" className="upload-label">
              <div className="upload-icon">
                <img src={uploadLogo} alt="Upload Logo" className="upload-logo" />
              </div>
            </label>
          </div>

          {error && <p className="error-message">{error}</p>}

          <button
            className="submit-btn"
            onClick={handleSubmit}
            disabled={highlights.length === 0 || highlights.length > 3}
          >
            Submit
          </button>
        </div>

        <div className="uploaded-files">
          <h3>Videos Uploaded</h3>
          <div className="files-list">
            {highlights.map((highlight) => (
              <div key={highlight.id} className="file-item">
                <img
                  src={highlight.thumbnail}
                  alt={highlight.name}
                  className="file-thumbnail"
                />
                <p>{highlight.name}</p>
                <span className="highlight-label">{highlight.type}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HighlightUpload;
