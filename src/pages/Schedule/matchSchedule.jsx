import "../../styles/matchSchedule.css";
import React, { useRef } from "react";

const matchSchedule = () => {
  const dateInputRef = useRef(null);

  const handleDateClick = () => {
    dateInputRef.current.showPicker(); // Open the native date picker
  };

  return (
    <div className="schedule-container">
      <h2 className="title">SCHEDULE MATCH</h2>
      <h3 className="league-name">League: BUNDESLIGA</h3>

      <div className="team-selection">
        <div className="team">
          <label>TEAM A</label>
          <select>
            <option>Pick a team</option>
            <option>Team 1</option>
            <option>Team 2</option>
          </select>
        </div>
        <span className="vs">VS.</span>
        <div className="team">
          <label>TEAM B</label>
          <select>
            <option>Pick a team</option>
            <option>Team 3</option>
            <option>Team 4</option>
          </select>
        </div>
      </div>

      <div className="match-details">
        <select className="dropdown">
          <option>Assign Referee</option>
          <option>Referee 1</option>
          <option>Referee 2</option>
        </select>

        <select className="dropdown">
          <option>Assign Statistician</option>
          <option>Statistician 1</option>
          <option>Statistician 2</option>
        </select>

        {/* Hidden date input */}
        <input
          type="datetime-local"
          ref={dateInputRef}
          className="hidden-date-input"
        />

        {/* Button to trigger the date picker */}
        <button className="date-time-btn" onClick={handleDateClick}>
          Date & Time 📅
        </button>

        <select className="dropdown">
          <option>Location</option>
          <option>Stadium A</option>
          <option>Stadium B</option>
        </select>
      </div>

      <button className="schedule-btn">Schedule Match</button>
    </div>
  );
};

export default matchSchedule;
