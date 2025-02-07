import React, { useEffect } from 'react'
import useAuth from '../../hooks/useAuth'
import Dropdown from '../../components/Dropdown'

function RoleFilter({selectedRole,setSelectedRole}) {  
    return (
      <div className='selection-filter'>
      <Dropdown
      name={selectedRole}
      options={[{name:"Admin",id:1},{name:"Statistician",id:2},{name:"Referee",id:3}]}
      onChange={setSelectedRole}
    />
    </div>
  )
}

export default RoleFilter