import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router'
import "../styles/components/SettingsDropdown.css"
import { logout } from '../services/auth';

function SettingsDropdown({isProfileVisible,setIsProfileVisible}) {
    const navigate = useNavigate();
    const handleLogout = async ()=>{
      const logoutStatus=await logout()

      if(logoutStatus.status === 204){
          navigate("/")
      }

    }
        

  return (
        <div className="settings-dropdown-menu">
          <ul>
            <li>
              <Link to="/appearance">Appearance</Link>
            </li>
            <li>
              <button onClick={()=>handleLogout()}>Log Out</button>
            </li>

          </ul>
        </div>

  )
}

export default SettingsDropdown