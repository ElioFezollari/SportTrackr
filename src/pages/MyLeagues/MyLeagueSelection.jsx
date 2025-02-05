import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import trophy from "../../assets/images/myLeagues/trophy.svg";
import { Link } from "react-router";

function MyLeagueSelection() {
  const { auth } = useAuth();
  const isAdmin = auth.roles && auth.roles.includes("owner");
  const [ownedLeagues, setOwnedLeagues] = useState(false);
  const [employeedLeagues, setEmployeedLeagues] = useState(false);
  const [animate, setAnimate] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setAnimate(false), 1500);

    return () => clearTimeout(timer);
  }, []);
  return (
    <div>
      {isAdmin && (
        <div className="emp-options">
          <div>
            <button onClick={() => setOwnedLeagues(!ownedLeagues)}>
              <img
                className={!animate ? "no-animation" : ""}
                style={{
                  backgroundColor: ownedLeagues == true ? "#36b495" : "",
                }}
                src={trophy}
                alt=""
              />{" "}
              <h2>Created leagues</h2>
            </button>{" "}
          </div>
          <Link>+ Create new league</Link>
        </div>
      )}

      {/**For employeed users to filter leagues they work in */}
      {auth.roles &&!isAdmin && auth.roles.length > 1 && (
        <div className="emp-options">
          <div>
            <button onClick={() => setEmployeedLeagues((prev) => !prev)}>
              <img
                className={!animate ? "no-animation" : ""}
                style={{
                  backgroundColor: employeedLeagues ? "#36b495" : "transparent",
                }}
                src={trophy}
                alt="Trophy Icon"
              />
              <h2>Leagues Employed In</h2>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default MyLeagueSelection;
