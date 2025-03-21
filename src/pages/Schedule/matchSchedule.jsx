import "../../styles/matchSchedule.css";
import React, { useState, useEffect, useRef } from "react";
import { getDataCreateMatch, createMatch } from "../../services/match"; // Import API calls
import useAuth from "../../hooks/useAuth";
import { useParams } from "react-router-dom";

const MatchSchedule = () => {
  const dateInputRef = useRef(null);
  const [selectedDate, setSelectedDate] = useState(""); 
  const [teams, setTeams] = useState([]);
  const [referees, setReferees] = useState([]);
  const [statisticians, setStatisticians] = useState([]);
  const [league, setLeague] = useState();
  const [loading, setLoading] = useState(true);

  // Form selections
  const [selectedHomeTeam, setSelectedHomeTeam] = useState("");
  const [selectedAwayTeam, setSelectedAwayTeam] = useState("");
  const [selectedReferee, setSelectedReferee] = useState("");
  const [selectedStatistician, setSelectedStatistician] = useState("");

  const { auth } = useAuth();
  const { id } = useParams(); 
  console.log(id)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getDataCreateMatch(auth.accessToken, id);
        
        setTeams(response?.data?.teams || []);
        setReferees(response?.data?.employees || []);
        setStatisticians(response?.data?.employees || []);
        setLeague(response?.data?.league?.[0]?.league_name || "Unknown League");
      } catch (error) {
        console.error("Error fetching match data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id && auth.accessToken) {
      fetchData();
    }
  }, [id, auth.accessToken]);

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const handleDateClick = () => {
    dateInputRef.current.showPicker();
  };

  const handleScheduleMatch = async () => {
    if (!selectedHomeTeam || !selectedAwayTeam || !selectedDate || !selectedReferee || !selectedStatistician) {
      alert("Please fill in all fields.");
      return;
    }
  
    // Prepare the match data once
    const matchData = {
      homeTeamId: selectedHomeTeam,
      awayTeamId: selectedAwayTeam,
      matchTime: selectedDate,
      refereeId: selectedReferee,
      statisticianId: selectedStatistician,
    };
  
    try {
      // Call createMatch and pass matchData along with leagueId
      const response = await createMatch(auth.accessToken, id, matchData);
      console.log("Match scheduled successfully:", response);
    } catch (error) {
      console.error("Error scheduling match:", error);
    }
  };
  
  
  if (loading) {
    return <h3>Loading match data...</h3>;
  }

  return (
    <div className="schedule-container">
      <h2 className="title">SCHEDULE MATCH</h2>
      <h3 className="league-name">League: {league}</h3>

      <div className="team-selection">
        <div className="team">
          <label>TEAM A</label>
          <select value={selectedHomeTeam} onChange={(e) => setSelectedHomeTeam(e.target.value)}>
            <option value="">Pick a team</option>
            {teams.map((team) => (
              <option key={team.id} value={team.id}>
                {team.name}
              </option>
            ))}
          </select>
        </div>
        <span className="vs">VS.</span>
        <div className="team">
          <label>TEAM B</label>
          <select value={selectedAwayTeam} onChange={(e) => setSelectedAwayTeam(e.target.value)}>
            <option value="">Pick a team</option>
            {teams.map((team) => (
              <option key={team.id} value={team.id}>
                {team.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="match-details">
        <select className="match-details-dropdown" value={selectedReferee} onChange={(e) => setSelectedReferee(e.target.value)}>
          <option value="">Assign Referee</option>
          {referees.map((referee) => (
            <option key={referee.emp_id} value={referee.emp_id}>
              {referee.full_name}
            </option>
          ))}
        </select>

        <select className="match-details-dropdown" value={selectedStatistician} onChange={(e) => setSelectedStatistician(e.target.value)}>
          <option value="">Assign Statistician</option>
          {statisticians.map((statistician) => (
            <option key={statistician.emp_id} value={statistician.emp_id}>
              {statistician.full_name}
            </option>
          ))}
        </select>

        <input
          type="datetime-local"
          ref={dateInputRef}
          className="hidden-date-input"
          value={selectedDate}
          onChange={handleDateChange}
        />

        <button className="match-details-date-time-btn" onClick={handleDateClick}>
          {selectedDate ? selectedDate.replace("T", " ") : "Date & Time 📅"}
        </button>
      </div>

      <button className="schedule-btn" onClick={handleScheduleMatch}>Schedule Match</button>
    </div>
  );
};

export default MatchSchedule;
