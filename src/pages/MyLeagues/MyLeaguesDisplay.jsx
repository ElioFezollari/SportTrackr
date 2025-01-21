import React from "react";
import bundesliga from "../../assets/temp/teamLogos/bundesliga.jpg";
import premierleague from "../../assets/temp/teamLogos/premierleague.png";
import mls from "../../assets/temp/teamLogos/mls.webp";
import laliga from "../../assets/temp/teamLogos/laliga.webp";
import ligue1 from "../../assets/temp/teamLogos/ligue1.png";
import seriaa from "../../assets/temp/teamLogos/seriaa.png";
import { Link } from "react-router";
function MyLeaguesDisplay() {
  const leagues = [
    {
      img: bundesliga,
      name: "Bundesliga",
      createdAt: "13/11/2024, 2:34pm",
    },
    {
      img: premierleague,
      name: "Premiere League",
      createdAt: "03/02/2023, 4:30pm",
    },
    {
      img: mls,
      name: "MLS",
      createdAt: "03/02/2023, 4:30pm",
    },
    {
      img: laliga,
      name: "La Liga",
      createdAt: "03/02/2023, 4:30pm",
    },
    {
      img: ligue1,
      name: "Ligue 1",
      createdAt: "03/02/2023, 4:30pm",
    },
    {
      img: seriaa,
      name: "Seria A",
      createdAt: "03/02/2023, 4:30pm",
    },
    {
        img: laliga,
        name: "La Liga",
        createdAt: "03/02/2023, 4:30pm",
      },
      {
        img: ligue1,
        name: "Ligue 1",
        createdAt: "03/02/2023, 4:30pm",
      },

  ];
  return (
    <div className="league-listings-wrapper">

        {leagues.map((league) => {
          return (
            <div className="league-card">
              <img src={league.img} alt={league.name} />
              <div>
                <h3>{league.name}</h3>
                <p>{league.createdAt}</p>
                <Link>More Info</Link>
              </div>
            </div>
          );
        })}

    </div>
  );
}

export default MyLeaguesDisplay;
