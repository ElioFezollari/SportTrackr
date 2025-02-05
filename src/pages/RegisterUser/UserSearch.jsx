import { useState } from "react";
import "../../styles/registeruser.css";

// eslint-disable-next-line react/prop-types
function UserSearch({ onSearchChange, onLeagueChange, onTeamChange, selectedLeague, selectedTeam }) {
    const [searchTerm, setSearchTerm] = useState("");

    const handleInputChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        onSearchChange(value);
    };

    const leagues = ["Premier League", "La Liga", "Bundesliga", "Ligue 1", "MLS"];
    const teams = ["Augsburg", "Borussia Mönchengladbach", "Bayern München", "Hoffenheim"];

    return (
        <div className="user-search-wrapper">
            <input
                type="text"
                placeholder="Search player..."
                value={searchTerm}
                onChange={handleInputChange}
                className="search-input"
            />

            <select
                value={selectedLeague}
                onChange={(e) => onLeagueChange(e.target.value)}
                className="dropdown"
            >
                <option value="">Pick a league</option>
                {leagues.map((league) => (
                    <option key={league} value={league}>
                        {league}
                    </option>
                ))}
            </select>

            <select
                value={selectedTeam}
                onChange={(e) => onTeamChange(e.target.value)}
                className="dropdown"
            >
                <option value="">Pick a team</option>
                {teams.map((team) => (
                    <option key={team} value={team}>
                        {team}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default UserSearch;
