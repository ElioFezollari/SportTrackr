import React from 'react'
import "../../../styles/components/layouts/appNavbar.css"
import logo from "../../../assets/images/Logo3.png"
import profile from "../../../assets/images/appNavbar/profile.svg"
import settings from "../../../assets/images/appNavbar/settings.svg"
import { Link } from 'react-router'
import Hamburger from '../../Hamburger'
function AppNavbar() {
  return (
    <header className='app-header'>
      <Hamburger/>
      <div className='app-logo-div'>
      <img src={logo} alt="logo of SportTrackr" />
      <h3>Sport Trackr</h3>
      </div>

    <div className='app-nav-icons'><Link><img className='profile-icon' src={profile} alt="profile icon" /></Link>
    <Link><img className='settings-icon' src={settings} alt="settings icon" /></Link></div>
      
    </header>
  )
}

export default AppNavbar