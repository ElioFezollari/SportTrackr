/* eslint-disable react/prop-types */

import React from "react";
import "../../styles/registeruser.css";

function PlayersRow({ player }) {
    return (
        <div className="players-row">
            <div className="row-item">
                <img src={player.image} alt={player.name} className="player-image" />
            </div>
            <div className="row-item">{player.name}</div>
            <div className="row-item">{player.league}</div>
            <div className="row-item">{player.position}</div>
            <div className="row-item">{player.matchesPlayed}</div>
            <div className="row-item">{player.goals}</div>
        </div>
    );
}

export default PlayersRow;
