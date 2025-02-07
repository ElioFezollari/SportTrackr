import React, { useEffect, useState } from 'react'

import Table from '../../components/Table';
import LeaguesFilter from '../../components/LeaguesFIlter';
import useAuth from '../../hooks/useAuth';
import { getTeamsByLeagueId } from '../../services/team';
function Teams() {
  const [selectedLeague,setSelectedLeague] = useState()
  const [optionPicked,setOptionPicked] = useState("Pick a League")
  const { auth } = useAuth();
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const teamsData = await getTeamsByLeagueId(auth.accessToken, optionPicked);

        setTeams(teamsData.data.teams)

      } catch (error) {
        console.error("Error fetching teams:", error);
      }
    };

    if (auth.accessToken && optionPicked) {
      fetchTeams();
    
    }
  }, [optionPicked, auth.accessToken]);
    return (
      <div className='listings-wrapper'>
        <h1>Registered Teams</h1>
      <LeaguesFilter optionPicked={optionPicked} setOptionPicked={setOptionPicked} setSelectedLeague={setSelectedLeague} selectedLeague={selectedLeague}/>
      <Table  headers={["Team","Team's Name","League","Owner","Matches Played"]} rows={["name","leagueName","ownerName","matchesPlayed"]} data={teams}/>
      </div>
    );
}

export default Teams