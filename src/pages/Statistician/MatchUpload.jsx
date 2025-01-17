import React, {useState} from "react";
import "../../styles/statistician.css"


const MatchUpload = () => {
    const [activePlayer, setActivePlayer] = useState(null);
  
    const players = [
      { id: 1, name: "Manuel Neuer (C)", position: "Goalkeeper", number: 8 },
      { id: 2, name: "Dayot Upamecano", position: "Defender", number: 11 },
      { id: 3, name: "Eric Dier", position: "Defender", number: 69 },
      { id: 4, name: "Alphonso Davies", position: "Defender", number: 7 },
      { id: 5, name: "Aleksandar Pavlović", position: "Midfielder", number: 19 },
      { id: 6, name: "Leon Goretzka", position: "Midfielder", number: 62 },
      { id: 7, name: "Joshua Kimmich", position: "Midfielder", number: 81 },
      { id: 8, name: "Jamal Musiala", position: "Forward", number: 14 },
      { id: 9, name: "Kingsley Coman", position: "Forward", number: 61 },
    ];
  
    const togglePlayer = (id) => {
      setActivePlayer(activePlayer === id ? null : id);
    };
  
    return (
      <div className="stats-container">
        <header className="header">
          <h1>
            Match #50 Player Stats Upload - <img src="bayern-logo.png" alt="Bayern Munchen" /> Bayern Munchen vs <img src="skenderbeu-logo.png" alt="Skenderbeu" /> Skenderbeu
          </h1>
        </header>
        <div className="team-container">
          <div className="team-header">
            <img

            // DB IS NOT READY SO THIS IS LIKE THIS FOR NOW
              src=""
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
                  <tr className="player-row" onClick={() => togglePlayer(player.id)}>
                    <td>{player.name}</td>
                    <td>{player.position}</td>
                    <td>{player.number}</td>
                    <td className="more-info">▼</td>
                  </tr>
                  {activePlayer === player.id && (
                    <tr className="player-details">
                      <td colSpan="4">
                        <div className="stats">
                          <div>
                            <label>Goals</label>
                            <div className="counter">
                              <button>-</button>
                              <span>0</span>
                              <button>+</button>
                            </div>
                          </div>
                          <div>
                            <label>Attempts at goal</label>
                            <div className="counter">
                              <button>-</button>
                              <span>0</span>
                              <button>+</button>
                            </div>
                          </div>
                          <div>
                            <label>Assists</label>
                            <div className="counter">
                              <button>-</button>
                              <span>0</span>
                              <button>+</button>
                            </div>
                          </div>
                          <div>
                            <label>Saves</label>
                            <div className="counter">
                              <button>-</button>
                              <span>0</span>
                              <button>+</button>
                            </div>
                          </div>
                          <div>
                            <label>Interceptions</label>
                            <div className="counter">
                              <button>-</button>
                              <span>0</span>
                              <button>+</button>
                            </div>
                          </div>
                          <div>
                            <label>Cards</label>
                            <select>
                              <option value="">None</option>
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
          <button className="upload-button">Upload for Skenderbeu ></button>
        </div>
      </div>
    );
  };
  
  export default MatchUpload;