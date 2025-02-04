import React, { useState } from "react";
import Bayern from "../../assets/temp/teamLogos/Bayern.png";
import Skenderbeu from "../../assets/temp/teamLogos/mls.webp"; 
import "../../styles/highlightUpload.css";
import uploadLogo from "../../assets/images/statistician/uploadLogo.png"; 

function HighlightUpload() {
  const [highlights, setHighlights] = useState([]);

  const [players, setPlayers] = useState([
    {
      id: 1,
      name: "Manuel Neuer (C)",
      position: "Goalkeeper",
      number: 8,
      stats: { goals: 0, attempts: 0, assists: 0, saves: 0, interceptions: 0 },
      cards: "none",
    },
    {
      id: 2,
      name: "Dayot Upamecano",
      position: "Defender",
      number: 11,
      stats: { goals: 0, attempts: 0, assists: 0, saves: 0, interceptions: 0 },
      cards: "none",
    },
    {
      id: 3,
      name: "Eric Dier",
      position: "Defender",
      number: 69,
      stats: { goals: 0, attempts: 0, assists: 0, saves: 0, interceptions: 0 },
      cards: "none",
    },
    {
      id: 4,
      name: "Alphonso Davies",
      position: "Defender",
      number: 7,
      stats: { goals: 0, attempts: 0, assists: 0, saves: 0, interceptions: 0 },
      cards: "none",
    },
    {
      id: 5,
      name: "Aleksandar Pavlović",
      position: "Midfielder",
      number: 19,
      stats: { goals: 0, attempts: 0, assists: 0, saves: 0, interceptions: 0 },
      cards: "none",
    }
  ]);

  const [highlightType, setHighlightType] = useState("");
  const [error, setError] = useState("");

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (!file) return;

    if (highlights.length >= 3) {
      setError("You can only upload a maximum of 3 videos.");
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

        const newHighlight = {
          id: highlights.length + 1,
          name: `Highlight ${highlights.length + 1}`,
          type: highlightType || "Custom",
          thumbnail: thumbnail,
        };

        setHighlights([...highlights, newHighlight]);
        setError("");
      });

      videoElement.currentTime = 0.5;
    });
  };

  return (
    <>
      <header className="highlight-upload-header">
        <h1>
          Match #50 -{" "}
          <img src={Bayern} alt="Bayern Munchen" className="team-logo" /> Bayern Munchen vs{" "}
          <img src={Skenderbeu} alt="Skenderbeu" className="team-logo" /> Skenderbeu
        </h1>
      </header>

      <div className="highlight-upload-container">
        <div className="upload-box">
          <div className="highlight-upload-box">
            <select className="highlight-type" onChange={(e) => setHighlightType(e.target.value)}>
              <option value="">Highlight Type</option>
              <option value="Goal">Goal</option>
              <option value="Save">Save</option>
              <option value="Dribble">Dribble</option>
            </select>

            <div className="upload-area">
              <input type="file" id="file-upload" className="file-input" accept="video/*" onChange={handleFileChange} />
              <label htmlFor="file-upload" className="upload-label">
                <div className="upload-icon">
                  <img src={uploadLogo} alt="uploadedLogo" className="upload-logo" />
                </div>
              </label>
            </div>

            {error && <p className="error-message">{error}</p>}

            <button className="submit-btn" disabled={highlights.length >= 3}>Submit</button>
          </div>

          <div className="uploaded-files">
            <h3>Videos Uploaded</h3>
            <div className="files-list">
              {highlights.map((highlight) => (
                <div key={highlight.id} className="file-item">
                  <img src={highlight.thumbnail} alt={highlight.name} className="file-thumbnail" />
                  <p>{highlight.name}</p>
                  <span className="highlight-label">{highlight.type}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default HighlightUpload;
