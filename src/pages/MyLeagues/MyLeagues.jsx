
import "../../styles/myLeagues.css";
import MyLeaguesDisplay from "./MyLeaguesDisplay";
import MyLeagueSelection from "./MyLeagueSelection";
function MyLeagues() {

  return (
    <div className="my-leagues-wrapper">
      <div className="my-leagues">
        <h1>Browse Leagues</h1>
        <MyLeagueSelection/>
        <MyLeaguesDisplay/>
      </div>
    </div>
  );
}

export default MyLeagues;
