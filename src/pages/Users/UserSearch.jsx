import { useState } from "react";
import PropTypes from "prop-types";
import CustomDropdown from "./CustomDropdown"; // Import the custom dropdown
import "../../styles/users.css";

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
            <CustomDropdown
                options={leagues}
                selectedValue={selectedLeague}
                onChange={onLeagueChange}
                placeholder="Pick a league"
            />
            <CustomDropdown
                options={teams}
                selectedValue={selectedTeam}
                onChange={onTeamChange}
                placeholder="Pick a team"
            />
        </div>
    );
}

UserSearch.propTypes = {
    onSearchChange: PropTypes.func.isRequired,
    onLeagueChange: PropTypes.func.isRequired,
    onTeamChange: PropTypes.func.isRequired,
    selectedLeague: PropTypes.string.isRequired,
    selectedTeam: PropTypes.string.isRequired,
};

export default UserSearch;