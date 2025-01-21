import React, { useEffect, useState } from "react";
import bundesliga from "../../assets/temp/teamLogos/bundesliga.jpg";
import premierleague from "../../assets/temp/teamLogos/premierleague.png";
import mls from "../../assets/temp/teamLogos/mls.webp";
import laliga from "../../assets/temp/teamLogos/laliga.webp";
import ligue1 from "../../assets/temp/teamLogos/ligue1.png";
import seriaa from "../../assets/temp/teamLogos/seriaa.png";
import { Link } from "react-router";
import { getLeagues } from "../../services/leagues";
import useAuth from "../../hooks/useAuth";
import SkeletonLeague from "../../components/skeletons/SkeletonLeague.jsx";

function MyLeaguesDisplay({ leagues, setLeagues }) {
  const { auth } = useAuth();
  const skeletonLeagues = [1,2,3,4,5,6]
  const [error, setError] = useState(null);

  useEffect(() => {
    const getAllLeagues = async () => {
      try {
        const res = await getLeagues(auth.accessToken);
        setLeagues(res.data.leagues);
      } catch (error) {
        console.error('Error fetching leagues:', error);
        setError('There was an error fetching the leagues. Please try again later.');
      }
    };

    getAllLeagues();
  }, [auth.accessToken]);

  return (

    <div className="league-listings-wrapper">
      {error ? (
        <p className="error">{error}</p>
      ) : leagues ? (
        leagues.map((league) => (
          <>
          <div className="league-card" key={league.id}>
            <img src={league.logo_url} alt={league.league_name + " logo"} />
            <div>
              <h3>{league.league_name}</h3>
              <p>Starts {new Date(league.start_time).toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' })}</p>
              <Link to={`/leagues/${league.id}`}>More Info</Link>
            </div>
          </div>
          </>
        ))
      ) : (
        skeletonLeagues.map(()=>{
          return <SkeletonLeague/>
        })
      )}
    </div>
  );
}

export default MyLeaguesDisplay;
