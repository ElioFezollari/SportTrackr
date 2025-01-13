import React from 'react'
import "../../../styles/components/layouts/appNavbar.css"
import logo from "../../../assets/images/Logo3.png"
import profile from "../../../assets/images/appNavbar/profile.svg"
import settings from "../../../assets/images/appNavbar/settings.svg"
import { Link } from 'react-router'
function AppNavbar() {
  return (
    <header className='app-header'>
            <Link><img className='profile-icon' src={profile} alt="profile icon" /></Link>
      <div className='app-logo-div'>
      <img src={logo} alt="logo of SportTrackr" />
      <h3>Sport Trackr</h3>
      </div>

      <Link><img className='settings-icon' src={settings} alt="settings icon" /></Link>
    </header>
  )
}

export default AppNavbar