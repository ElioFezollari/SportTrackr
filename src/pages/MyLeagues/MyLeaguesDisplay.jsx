import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import { getLeagues } from "../../services/leagues";
import useAuth from "../../hooks/useAuth";
import SkeletonLeagues from "../../components/skeletons/SkeletonLeagues";
import defaultLeagueLogo from '../../assets/images/defaultLogo/default_league_logo.svg'

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
      { leagues ? (
        leagues.map((league) => (
          <div className="league-card" key={league.id}>
            <img src={league.logoUrl || defaultLeagueLogo} alt={league.leagueName + " logo"} />
            <div>
              <h3>{league.leagueName}</h3>
              <p>Starts {league.startTime}</p>
              <Link to={`../leagues/${league.id}`}>More Info</Link>
            </div>
          </div>
        ))
      ) : (
        skeletonLeagues.map((_, index) => (
          <SkeletonLeagues key={index} />
        ))
      )}
    </div>
  );
}

export default MyLeaguesDisplay;
