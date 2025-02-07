import React, { useEffect, useState } from 'react'
import Dropdown from './Dropdown'
import { getLeagueList } from '../services/leagues'
import useAuth from '../hooks/useAuth'
function LeaguesFilter({optionPicked,setOptionPicked,setSelectedLeague,selectedLeague}) {
  const {auth} = useAuth()

  useEffect(()=>{
    const getLeagues = async () =>{
      const result = await getLeagueList(auth.accessToken)
      setSelectedLeague(result.data)
    }
    getLeagues()
  },[auth.accessToken])


  return (
    <div className='selection-filter'>
    {selectedLeague && <Dropdown
    name={optionPicked}
    options={selectedLeague.map((league)=>{
        return league
    })}
    onChange={setOptionPicked}
  />}
  </div>
  )
}

export default LeaguesFilter