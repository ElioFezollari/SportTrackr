
import { useState } from "react";
import "../../styles/myLeagues.css";
import MyLeaguesDisplay from "./MyLeaguesDisplay";
import MyLeagueSelection from "./MyLeagueSelection";
function MyLeagues() {
  const [leagues,setLeagues] = useState()
  return (
    <div className="main-div-wrapper my-leagues-wrapper">
      <div className="main-div my-leagues">
        <h1>Browse Leagues</h1>
        <MyLeagueSelection/>
        <MyLeaguesDisplay leagues={leagues} setLeagues={setLeagues}/>
      </div>
    </div>
  );
}

export default MyLeagues;
