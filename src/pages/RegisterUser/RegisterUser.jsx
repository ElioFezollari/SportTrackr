import React, { useState } from "react";
import "../../styles/registerUser.css";
import UserSearch from "./UserSearch";
import PlayerList from "./PlayerList";

function RegisterUser() {
    const [players] = useState([
        { image: "https://via.placeholder.com/50", name: "Lionel Messi", league: "Ligue 1", position: "Forward", matchesPlayed: 30, goals: 25, team: "Paris Saint-Germain" },
        { image: "https://via.placeholder.com/50", name: "Cristiano Ronaldo", league: "Premier League", position: "Forward", matchesPlayed: 28, goals: 20, team: "Manchester United" },
        { image: "https://via.placeholder.com/50", name: "Neymar Jr.", league: "Ligue 1", position: "Forward", matchesPlayed: 25, goals: 15, team: "Paris Saint-Germain" },
        { image: "https://via.placeholder.com/50", name: "Kevin De Bruyne", league: "Premier League", position: "Midfielder", matchesPlayed: 30, goals: 10, team: "Manchester City" },
        { image: "https://via.placeholder.com/50", name: "Kylian Mbappé", league: "Ligue 1", position: "Forward", matchesPlayed: 29, goals: 22, team: "Paris Saint-Germain" },
        { image: "https://via.placeholder.com/50", name: "Virgil van Dijk", league: "Premier League", position: "Defender", matchesPlayed: 30, goals: 5, team: "Liverpool" },
    ]);

    const [searchTerm, setSearchTerm] = useState("");
    const [selectedLeague, setSelectedLeague] = useState("");
    const [selectedTeam, setSelectedTeam] = useState("");

    const handleSearchChange = (term) => {
        setSearchTerm(term);
    };

    const handleLeagueChange = (league) => {
        setSelectedLeague(league);
    };

    const handleTeamChange = (team) => {
        setSelectedTeam(team);
    };

    const filteredPlayers = players.filter(player => {
        const matchesSearchTerm = player.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesLeague = selectedLeague ? player.league === selectedLeague : true;
        const matchesTeam = selectedTeam ? player.team === selectedTeam : true;

        return matchesSearchTerm && matchesLeague && matchesTeam;
    });

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

export default RegisterUser;
