import React, { useState } from "react";
import "../../styles/statistician.css";
import mls from "../../assets/temp/teamLogos/mls.webp";
import Bayern from "../../assets/temp/teamLogos/Bayern.png";

const MatchUpload = () => {
  const [activePlayer, setActivePlayer] = useState(null);
  const [players, setPlayers] = useState([

    //DUMB DB 
    {
      id: 1,
      name: "Manuel Neuer (C)",
      position: "Goalkeeper",
      number: 8,
      stats: { goals: 0, attempts: 0, assists: 0, saves: 0, interceptions: 0 },
      cards: "none", // cards for each player
    },
    {
      id: 2,
      name: "Dayot Upamecano",
      position: "Defender",
      number: 11,
      stats: { goals: 0, attempts: 0, assists: 0, saves: 0, interceptions: 0 },
      cards: "none",
    },
    {
      id: 3,
      name: "Eric Dier",
      position: "Defender",
      number: 69,
      stats: { goals: 0, attempts: 0, assists: 0, saves: 0, interceptions: 0 },
      cards: "none",
    },
    {
      id: 4,
      name: "Alphonso Davies",
      position: "Defender",
      number: 7,
      stats: { goals: 0, attempts: 0, assists: 0, saves: 0, interceptions: 0 },
      cards: "none",
    },
    {
      id: 5,
      name: "Aleksandar Pavlović",
      position: "Midfielder",
      number: 19,
      stats: { goals: 0, attempts: 0, assists: 0, saves: 0, interceptions: 0 },
      cards: "none",
    },
    {
      id: 6,
      name: "Leon Goretzka",
      position: "Midfielder",
      number: 62,
      stats: { goals: 0, attempts: 0, assists: 0, saves: 0, interceptions: 0 },
      cards: "none",
    },
    {
      id: 7,
      name: "Joshua Kimmich",
      position: "Midfielder",
      number: 81,
      stats: { goals: 0, attempts: 0, assists: 0, saves: 0, interceptions: 0 },
      cards: "none",
    },
    {
      id: 8,
      name: "Jamal Musiala",
      position: "Forward",
      number: 14,
      stats: { goals: 0, attempts: 0, assists: 0, saves: 0, interceptions: 0 },
      cards: "none",
    },
    {
      id: 9,
      name: "Kingsley Coman",
      position: "Forward",
      number: 61,
      stats: { goals: 0, attempts: 0, assists: 0, saves: 0, interceptions: 0 },
      cards: "none",
    },
  ]);

  const togglePlayer = (id) => {
    setActivePlayer(activePlayer === id ? null : id);
  };
//Change stat func
  const updateStat = (playerId, stat, delta) => {
    setPlayers((prev) =>
      prev.map((player) =>
        player.id === playerId
          ? {
              ...player,
              stats: {
                ...player.stats,
                [stat]: Math.max(0, player.stats[stat] + delta), 
              },
            }
          : player
      )
    );
  };
//liittoo function to change card value
  const updateCard = (playerId, cardValue) => {
    setPlayers((prev) =>
      prev.map((player) =>
        player.id === playerId
          ? { ...player, cards: cardValue } // Update card value
          : player
      )
    );
  };

  return (
    <div className="stats-container">
      <header className="match-upload-header">
        <h1 className>
          Match #50 Player Stats Upload -{" "}
          <img src={Bayern} alt="Bayern Munchen" className="team-logo"/> Bayern Munchen vs{" "} 
          <img src={mls} alt="Skenderbeu" className="team-logo" /> Skenderbeu
        </h1>
      </header>
      <div className="team-container">
        <div className="team-header">
          <img
            // Placeholder for now
            src={Bayern}
            alt="Bayern Munchen Logo"
            className="team-logo"
          />
          <h2>Bayern Munchen</h2>
        </div>
        <table className="stats-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Position this game</th>
              <th>Number</th>
              <th>More info</th>
            </tr>
          </thead>
          <tbody>
            {players.map((player) => (
              <React.Fragment key={player.id}>
                <tr
                  className="player-row"
                  onClick={() => togglePlayer(player.id)}
                >
                  <td>{player.name}</td>
                  <td>{player.position}</td>
                  <td>{player.number}</td>
                  <td className="more-info">
                    <span className={`arrow ${ activePlayer === player.id ? "rotated" : ""}`}>
                    &gt;
                   </span>
                  </td>
                </tr>
                {activePlayer === player.id && (
                  <tr className="player-details">
                    <td colSpan="4">
                      <div className="stats">
                        {[
                          "goals",
                          "attempts",
                          "assists",
                          "saves",
                          "interceptions",
                        ].map((stat) => (
                          <div key={stat} className="stat-box">
                            <label>
                              {stat.charAt(0).toUpperCase() + stat.slice(1)}
                            </label>
                            <div className="counter">
                              <button
                                onClick={() =>
                                  updateStat(player.id, stat, -1)
                                }
                              >
                                -
                              </button>
                              <span>{player.stats[stat]}</span>
                              <button
                                onClick={() =>
                                  updateStat(player.id, stat, 1)
                                }
                              >
                                +
                              </button>
                            </div>
                          </div>
                        ))}
                        <div className="stat-box">
                          <label>Cards</label>
                          <select
                            className="cards-select"
                            value={player.cards}
                            onChange={(e) =>
                              updateCard(player.id, e.target.value)
                            }
                          >
                            <option value="none">None</option>
                            <option value="yellow">Yellow</option>
                            <option value="red">Red</option>
                          </select>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>

        {/* THIS NEED TO BE ADJUST WHEN IMPLEMENT DB */}
        <div className="page-container">
          <button className="upload-button">
            <img src={Bayern} alt="Logo" className="upload-logo" />
            &nbsp;Upload for Skenderbeu
          </button>
        </div>
      </div>
    </div>
  );
};

export default MatchUpload;
