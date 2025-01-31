import React from "react";
import PropTypes from "prop-types";
import "../../styles/users.css"; // Ensure to create this CSS file for styling

function PlayerRow({ player }) {
    return (
        <div className="player-row">
            <img src={player.image} alt={player.name} className="player-image" />
            <div className="player-name">{player.name}</div>
            <div className="player-league">{player.league}</div>
            <div className="player-position">{player.position}</div>
            <div className="matches-played">{player.matchesPlayed}</div>
            <div className="goals-scored">{player.goals}</div>
        </div>
    );
}

PlayerRow.propTypes = {
    player: PropTypes.shape({
        image: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        league: PropTypes.string.isRequired,
        position: PropTypes.string.isRequired,
        matchesPlayed: PropTypes.number.isRequired,
        goals: PropTypes.number.isRequired,
    }).isRequired,
};

export default PlayerRow;