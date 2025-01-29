import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router'
import "../styles/components/SettingsDropdown.css"
import { logout } from '../services/auth';
function SettingsDropdown({isProfileVisible,setIsProfileVisible}) {
    const navigate = useNavigate();
    const handleToggleVisibility = () => {
        setIsProfileVisible(!isProfileVisible);
      };
      const handleLogout = async ()=>{
        const logoutStatus=await logout()
        console.log("hi")
        if(logoutStatus.status === 204){
            navigate("/")
        }

      }
        

  return (
        <div className="settings-dropdown-menu">
          <ul>
            <li>
              <Link to="/profile-details">Profile Details</Link>
            </li>
            <li>
              <div className="profile-toggle-wrapper">
                <span onClick={handleToggleVisibility}>Profile Visibility</span>
                <label className="profile-toggle-switch">
                  <input
                    type="checkbox"
                    checked={isProfileVisible}
                    onChange={handleToggleVisibility}
                  />
                  <span className="settings-slider"></span>
                </label>
              </div>
            </li>
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