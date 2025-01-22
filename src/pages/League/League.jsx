import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { getLeague } from "../../services/leagues";
import useAuth from "../../hooks/useAuth";
import clipboard from "../../assets/images/league/clipboard.svg"
import player from "../../assets/images/league/player.svg"
import schedule from "../../assets/images/league/schedule.svg"
import team from "../../assets/images/league/team.svg"
import maxTeam from "../../assets/images/league/max-team.svg"
import coin from "../../assets/images/league/coin.svg"
import "../../styles/league.css";
function League() {
  const { id } = useParams("id");
  const { auth } = useAuth();
  const [league, setLeague] = useState(null);
  const [error, setError] = useState(null);
  useEffect(() => {
    const getOneLeague = async () => {
      try {
        const res = await getLeague(auth.accessToken, id);
        setLeague(res.data.league);
      } catch (error) {
        setError(
          "There was an error fetching the leagues. Please try again later."
        );
      }
    };

    getOneLeague();
  }, [auth.accessToken, id]);
  console.log(league);
  return (
    <>
      <div className="league-wrapper">
        <Link className="main-btn" href="">
          + Create A Team For This League
        </Link>
      </div>
      <div className="main-div-wrapper main-league-wrapper">
        <div className="main-div">
          {league && (
            <>
              <div className="league-nav-history">
                <p>
                  <Link to="../my-leagues">Leagues</Link> &gt;{" "}
                  {league.leagueName}
                </p>{" "}
                <p>
                  <Link to="../my-leagues">Leagues</Link> &gt;{" "}
                  {league.leagueName}
                </p>
              </div>
              <div className="league-information">
                {" "}
                <img
                  src={league.logoUrl}
                  alt={`logo of ${league.leagueName}`}
                />{" "}
                <div className="league-description">
                  <div className="league-header">
                  <h3>About {league.leagueName}</h3>{" "}
                  <div>
                  <p><span>Start Date:</span>{league.startTime}</p>
                  <p><span>End Date:</span>{league.endTime}</p>
                  </div>
                  </div>
                  <p>
                    {league.description ||
                      "There is currently no description for this league"}
                  </p>
                </div>
              </div>
              <div className="league-stats">
                <div><img src={clipboard} alt="Icon of a clipboard" /> <p>Teams Signed Up: {league.teamCount}</p></div>
                <div><img src={player} alt="Icon of an ID tag" /> <p>Players Signed Up: {league.userCount}</p></div>
                <div><img src={schedule} alt="Icon of a calendar" /> <p>Game Amount: {league.gameAmount}</p></div>
                <div><img src={team} alt="Icon of 2 people tied in a circle" /> <p>Team Starter Size: {league.teamStarterSize}</p></div>
                <div><img src={maxTeam} alt="Icon of a person with a checkmark" /> <p>Max Team Size: {league.maxTeamSize}</p></div>
                <div><img src={coin} alt="Icon of two coins" /> <p>Price Per Team: {league.price}$</p></div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default League;
