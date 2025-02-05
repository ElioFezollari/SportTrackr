import React from 'react'
import TeamsFilter from './TeamsFilter';
import "../../styles/teams.css" 
import Table from '../../components/Table';
function Teams() {
    return (
      <div className='teams-wrapper'>
        <h1>Registered Teams</h1>
      <TeamsFilter/>
      <Table headers={["Team","Team's Name","League","Owner","Matches Played"]}/>
      </div>
    );
}

export default Teams