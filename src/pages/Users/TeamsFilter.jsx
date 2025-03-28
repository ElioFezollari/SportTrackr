import React, { useEffect, useState } from "react";
import Dropdown from "../../components/Dropdown";
import { getTeamsByLeagueOwner } from "../../services/team";
import useAuth from "../../hooks/useAuth";

function TeamsFilter({ selectedTeam, setSelectedTeam }) {
  const { auth } = useAuth();
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    const fetchTeams = async () => {
      const response = await getTeamsByLeagueOwner(auth.accessToken);
      if (response && response.data) {
        setTeams(response.data.teams);
      }
    };

    fetchTeams();
  }, [auth.accessToken]);
  return (
    <div className="selection-filter">
      <Dropdown
        name={selectedTeam}
        options={teams.map((team) => {
          return team;
        })}
        onChange={setSelectedTeam}
      />
    </div>
  );
}

export default TeamsFilter;
