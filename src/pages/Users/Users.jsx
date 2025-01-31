import React, { useState } from "react";
import "../../styles/users.css";
import UserSearch from "./UserSearch";
import PlayerList from "./PlayerList";

function Users() {
    const [players] = useState([
        {
            image: "https://via.placeholder.com/50",
            name: "Lionel Messi",
            league: "Ligue 1",
            position: "Forward",
            matchesPlayed: 30,
            goals: 25,
        },
        {
            image: "https://via.placeholder.com/50",
            name: "Cristiano Ronaldo",
            league: "Premier League",
            position: "Forward",
            matchesPlayed: 28,
            goals: 20,
        },
        {
            image: "https://via.placeholder.com/50", // Placeholder image
            name: "Neymar Jr.",
            league: "Ligue 1",
            position: "Forward",
            matchesPlayed: 25,
            goals: 15,
        },
        {
            image: "https://via.placeholder.com/50", // Placeholder image
            name: "Kevin De Bruyne",
            league: "Premier League",
            position: "Midfielder",
            matchesPlayed: 30,
            goals: 10,
        },
        {
            image: "https://via.placeholder.com/50", // Placeholder image
            name: "Kylian Mbappé",
            league: "Ligue 1",
            position: "Forward",
            matchesPlayed: 29,
            goals: 22,
        },
        {
            image: "https://via.placeholder.com/50", // Placeholder image
            name: "Virgil van Dijk",
            league: "Premier League",
            position: "Defender",
            matchesPlayed: 30,
            goals: 5,
        },
    ]);

    const [searchTerm, setSearchTerm] = useState("");
    const [selectedLeague, setSelectedLeague] = useState(""); // Initialize to empty string
    const [selectedTeam, setSelectedTeam] = useState(""); // Initialize to empty string

    const handleSearchChange = (term) => {
        setSearchTerm(term);
    };

    const handleLeagueChange = (league) => {
        setSelectedLeague(league);
    };

    const handleTeamChange = (team) => {
        setSelectedTeam(team);
    };

    const filteredPlayers = players.filter(player =>
        player.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="main-div-wrapper">
            <h1 className="title">Registered Users</h1>
            <UserSearch
                  onSearchChange={handleSearchChange}
                  onLeagueChange={handleLeagueChange}
                  onTeamChange={handleTeamChange}
                  selectedLeague={selectedLeague}
                  selectedTeam={selectedTeam}
            />
            <div className="filtered-users">
                {filteredPlayers.length > 0 ? (
                    <PlayerList players={filteredPlayers} />
                ) : (
                    <p className="no-users-message">No players found.</p>
                )}
            </div>
        </div>
    );
}

export default Users;