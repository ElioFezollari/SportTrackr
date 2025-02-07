import React, { useState } from 'react';
import '../../../styles/components/layouts/appNavbar.css';
import logo from '../../../assets/images/Logo3.png';
import profile from '../../../assets/images/appNavbar/profile.svg';
import settings from '../../../assets/images/appNavbar/settings.svg';
import { Link } from 'react-router';
import Hamburger from './Hamburger';
import SettingsDropdown from '../../SettingsDropdown';
import UserProfileDropDown from '../../UserProfileDropDown';

function AppNavbar({ isActive, setIsActive }) {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [isProfileVisible, setIsProfileVisible] = useState(true);
  const [profileOpen, setProfileOpen] = useState(false);

  return (
    <header className="app-header">
      <Hamburger isActive={isActive} setIsActive={setIsActive} />
      <div className="app-logo-div">
        <img src={logo} alt="logo of SportTrackr" />
        <h3>Sport Trackr</h3>
      </div>

      <div className="app-nav-icons">
        <Link>
          <button
            onClick={() => setProfileOpen((prev) => !prev)}
            className="profile-button"
          >
            <img className="profile-icon" src={profile} alt="profile icon" />
          </button>
        </Link>
        <div className="settings-wrapper">
          <button
            onClick={() => setSettingsOpen((prev) => !prev)}
            className="settings-button"
          >
            <img className="settings-icon" src={settings} alt="settings icon" />
          </button>

          {settingsOpen && <SettingsDropdown isProfileVisible={isProfileVisible} setIsProfileVisible={setIsProfileVisible}/>}
          {profileOpen && <UserProfileDropDown/>}
        </div>
      </div>
    </header>
  );
}

export default AppNavbar;
