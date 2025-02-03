import React, {useState} from 'react'
import Bayern from "../../assets/temp/teamLogos/Bayern.png";
import mls from "../../assets/temp/teamLogos/mls.webp";
import "../../styles/statistician.css";

function HighlightUpload() {
  const [files, setFiles] = useState([
    { id: 1, name: "Highlight 1", type: "Goal", img: "goal-thumbnail.jpg" },
    { id: 2, name: "Highlight 2", type: "Save", img: "save-thumbnail.jpg" },
    { id: 3, name: "Highlight 3", type: "Dribble", img: "dribble-thumbnail.jpg" },
  ]);
  return (
      
    <div className='stats-container'>
      <header className="match-title">
        <h1>
          Match #50 -{" "}
          <img src={Bayern} alt="Bayern Munchen" className="team-logo"/> Bayern Munchen vs{" "}
          <img src={mls} alt="Skenderbeu" className="team-logo"/> Skenderbeu
        </h1>
      </header>


      <div className="upload-box">
        <select className="highlight-type">
          <option>Highlight Type</option>
          <option>Goal</option>
          <option>Save</option>
          <option>Dribble</option>
        </select>

        <div className="upload-area">
          <div className="upload-icon">📤</div>
        </div>

        <button className="submit-btn">Submit</button>
      </div>

      <div className="uploaded-files">
        <h3>Files Uploaded</h3>
        <div className="files-list">
          {files.map((file) => (
            <div key={file.id} className="file-item">
              <img src={file.img} alt={file.name} className="file-thumbnail" />
              <p>{file.name}</p>
              <span>{file.type}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default HighlightUpload