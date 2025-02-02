import React from "react";
import PropTypes from "prop-types";
import "../../styles/users.css";

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

PlayersRow.propTypes = {
    player: PropTypes.shape({
        image: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        league: PropTypes.string.isRequired,
        position: PropTypes.string.isRequired,
        matchesPlayed: PropTypes.number.isRequired,
        goals: PropTypes.number.isRequired,
    }).isRequired,
};

export default PlayersRow;