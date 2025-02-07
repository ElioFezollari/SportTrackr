import React, { useEffect, useState } from 'react'
import LeaguesFilter from '../../components/LeaguesFIlter'
import RoleFilter from './RoleFilter'
import Search from '../../components/Search'
import Table from '../../components/Table'
import { getFilteredEmployees } from '../../services/employees'
import useAuth from '../../hooks/useAuth'

function Employees() {
  const {auth} = useAuth()
      const [employeeLeagues,setEmployeeLeagues] = useState()
      const [optionPicked,setOptionPicked] = useState("Pick a league")
      const [selectedRole,setSelectedRole] = useState("Pick a role")
      const [employeeName,setEmployeeName] = useState("")


      const [employees,setEmployees] = useState([])
      useEffect(() => {
        const fetchEmployees = async () => {
          try {
            const employeeData = await getFilteredEmployees(auth.accessToken, optionPicked,selectedRole,employeeName);
    
            console.log(employeeData.data)
            setEmployees(employeeData.data)
    
          } catch (error) {
            console.error("Error fetching teams:", error);
          }
        };
    
        if (auth.accessToken) {
          fetchEmployees();
        
        }
      }, [optionPicked, auth.accessToken,selectedRole,employeeName]);
  return (
    <div className='listings-wrapper'>
    <h1>Registered Employees</h1>
    <div className='listings-filter'>
    <div className='selection-filter'>
    <Search placeholder="Search Employee..." text={employeeName} setText={setEmployeeName}/>
  </div>
    <RoleFilter selectedRole={selectedRole} setSelectedRole={setSelectedRole}/>
  <LeaguesFilter optionPicked={optionPicked} setOptionPicked={setOptionPicked} selectedLeague={employeeLeagues} setSelectedLeague={setEmployeeLeagues}/>

  </div>
  <Table  
  headers={["Picture","Full Name", "League", "League Role", "Matches", "Actions"]} 
  rows={["fullName", "league", "leagueRole","matches" ]} 
  data={employees.map(employee => ({
    ...employee,
    matches: Math.floor(Math.random() * 10) + 1, 
  }))}
/>

  </div>
  )
}

export default Employees