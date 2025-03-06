import React, { useEffect, useState } from "react";
import { getUserProfile, toggleProfileVisibility, updateUserName } from "../../services/user";
import useAuth from "../../hooks/useAuth";
import "../../styles/userProfile.css";
import defaultProfilePhoto from '../../assets/images/userProfile/default_profile_photo.svg';
import defaultLeaguePhoto from '../../assets/images/userProfile/default_league_photo.svg';

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditingName, setIsEditingName] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const { auth } = useAuth();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        setIsLoading(true);
        const response = await getUserProfile(auth.accessToken);
        setUser(response.data.user);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserProfile();
  }, [auth.accessToken]);

  const handleVisibilityToggle = async () => {
    if (!user) return;
  
    try {
      const res = await toggleProfileVisibility(auth.accessToken);
      if (res.status === 200) {
        alert("Profile Visibility Updated");
        
        setUser((prevUser) => ({
          ...prevUser,
          profileVisibility: !prevUser.profileVisibility,
        }));
      }
    } catch (error) {
      console.error("Failed to update profile visibility:", error);
    }
  };
  

  if (isLoading) {
    return <div className="user-profile-loading-container">
      <div className="user-profile-loading-spinner"></div>
      <span>Loading your profile...</span>
    </div>;
  }

  if (!user) {
    return <div className="user-profile-error-container">Unable to load profile data</div>;
  }

  const handleNameUpdate = async () => {
    if (!user) return;
    try {
      const res = await updateUserName(auth.accessToken, {
        firstName,
        lastName
      });
      if (res.status === 200) {
        setUser(prevUser => ({
          ...prevUser,
          firstName,
          lastName
        }));
        setIsEditingName(false);
      }
    } catch (error) {
      console.error("Failed to update user name:", error);
    }
  };

  return (
    <div className="user-profile-container">
      <section className="user-profile-header-section">
        <div className="user-profile-header-photo-container">
          <img
            src={user.pictureUrl || defaultProfilePhoto}
            alt={`${user.firstName}'s profile`}
            className="user-profile-header-photo"
          />
        </div>
        <div className="user-profile-header-details">
            <h1 
              className="user-profile-header-name"
              onClick={() => setIsEditingName(true)}
            >{user.firstName} {user.lastName}</h1>

          <div className="user-profile-visibility-toggle">
          <span className="toggle-label">
            {user.profileVisibility ? "Public Profile" : "Private Profile"}
          </span>
            <label className="toggle-switch">
              <input
                type="checkbox"
                checked={user.profileVisibility}
                onChange={handleVisibilityToggle}
              />
              <span className="toggle-slider"></span>
            </label>
          </div>
        </div>
      </section>

      <section className="user-profile-affiliations-section">
        <div className="user-profile-team-container">
          <div className="user-profile-team-logo-wrapper">
            <img
              src={user.teamLogo || defaultProfilePhoto}
              alt={`${user.teamName} logo`}
              className="user-profile-team-logo"
            />
          </div>
          <div className="user-profile-team-details">
            <h2 className="user-profile-team-name">{user.teamName}</h2>
            <p className="user-profile-team-label">Team</p>
          </div>
        </div>

        <div className="user-profile-league-container">
          <div className="user-profile-league-logo-wrapper">
            <img
              src={user.leagueLogo || defaultLeaguePhoto}
              alt={`${user.leagueName} logo`}
              className="user-profile-league-logo"
            />
          </div>
          <div className="user-profile-league-details">
            <h2 className="user-profile-league-name">{user.leagueName}</h2>
            <p className="user-profile-league-label">League</p>
          </div>
        </div>
      </section>

      <section className="user-profile-stats-dashboard">
        <h2 className="user-profile-stats-title">Player Statistics</h2>
        <div className="user-profile-stats-grid">
          <PlayerStat label="Goals" value={user.totalGoals} category="offensive" />
          <PlayerStat label="Shots" value={user.totalShots} category="offensive" />
          <PlayerStat label="Assists" value={user.totalAssists} category="offensive" />
          <PlayerStat label="Saves" value={user.totalSaves} category="defensive" />
          <PlayerStat label="Interceptions" value={user.totalInterceptions} category="defensive" />
          <PlayerStat label="Yellow Cards" value={user.totalYellowCards} category="disciplinary" />
          <PlayerStat label="Red Cards" value={user.totalRedCards} category="disciplinary" />
        </div>
      </section>
      {isEditingName && (
        <div className="user-profile-modal-overlay">
          <div className="user-profile-modal">
            <div className="user-profile-modal-header">
              <h2>Edit Name</h2>
            </div>
            <div className="user-profile-modal-content">
              <div className="user-profile-modal-form">
                <div className="user-profile-modal-input-group">
                  <label htmlFor="firstName">First Name</label>
                  <input
                    id="firstName"
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="user-profile-modal-input"
                  />
                </div>
                <div className="user-profile-modal-input-group">
                  <label htmlFor="lastName">Last Name</label>
                  <input
                    id="lastName"
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="user-profile-modal-input"
                  />
                </div>
              </div>
            </div>
            <div className="user-profile-modal-footer">
              <button 
                className="user-profile-modal-cancel"
                onClick={() => setIsEditingName(false)}
              >
                Cancel
              </button>
              <button 
                className="user-profile-modal-save"
                onClick={handleNameUpdate}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const PlayerStat = ({ label, value, category }) => {
  const getCategoryClass = () => {
    switch (category) {
      case "offensive": return "user-profile-stat-card-offensive";
      case "defensive": return "user-profile-stat-card-defensive";
      case "disciplinary": 
        return label.includes("Yellow") ? "user-profile-stat-card-yellow" : "user-profile-stat-card-red";
      default: return "user-profile-stat-card-default";
    }
  };

  return (
    <div className={`user-profile-stat-card ${getCategoryClass()}`}>
      <div className="user-profile-stat-card-value">{value}</div>
      <div className="user-profile-stat-card-label">{label}</div>
    </div>
  );
};

export default UserProfile;
