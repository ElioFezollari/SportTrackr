import React from "react";
import PlayersRow from "./PlayersRow";

function PlayerList({ players }) {
    return (
        <div className="player-list">
            <div className="player-list-header">
                <div className="header-item">Player</div>
                <div className="header-item">Player's Name</div>
                <div className="header-item">League</div>
                <div className="header-item">Position</div>
                <div className="header-item">Matches Played</div>
                <div className="header-item">Goals</div>
            </div>
            {players.map((player, index) => (
                <PlayersRow key={index} player={player} />
            ))}
        </div>
    );
}

export default PlayerList;