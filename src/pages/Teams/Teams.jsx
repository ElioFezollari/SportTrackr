import React, { useState } from 'react'
import TeamsFilter from './TeamsFilter';
import "../../styles/teams.css" 
import Table from '../../components/Table';
function Teams() {
  const [selectedLeague,setSelectedLeague] = useState()
  const [optionPicked,setOptionPicked] = useState("Pick a League")

    return (
      <div className='teams-wrapper'>
        <h1>Registered Teams</h1>
      <TeamsFilter optionPicked={optionPicked} setOptionPicked={setOptionPicked} setSelectedLeague={setSelectedLeague} selectedLeague={selectedLeague}/>
      <Table  headers={["Team","Team's Name","League","Owner","Matches Played"]} optionPicked={optionPicked}/>
      </div>
    );
}

export default Teams