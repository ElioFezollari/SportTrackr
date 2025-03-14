import React, { useEffect, useState, useRef } from "react";
import { getUserProfile, toggleProfileVisibility, updateUserName, updatePassword, uploadProfilePhoto } from "../../services/user";
import useAuth from "../../hooks/useAuth";
import "../../styles/userProfile.css";
import defaultProfileLogo from '../../assets/images/defaultLogo/default_profile_logo.svg';
import defaultLeagueLogo from '../../assets/images/defaultLogo/default_league_logo.svg';
import defaultTeamLogo from '../../assets/images/defaultLogo/deafult_team_logo.svg';
import { useToast } from "../../context/ToastContext";
import SkeletonUserProfile from "../../components/skeletons/SkeletonUserProfile";
import { Link } from "react-router";

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditingName, setIsEditingName] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newConfirmPassword, setNewConfirmPassword] = useState('');
  const [isEditingPhoto, setIsEditingPhoto] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const photoRef = useRef(null);
  const [profilePhotoUrl, setProfilePhotoUrl] = useState(null);
  const { auth } = useAuth();
  const { addToast } = useToast();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        setIsLoading(true);
        const response = await getUserProfile(auth.accessToken);
        if (response.status === 200){
          setUser(response.data.user);
          setFirstName(response.data.user.firstName);
          setLastName(response.data.user.lastName);
        }
      } catch (error) {
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserProfile();
  }, [auth.accessToken]);

  if (!user) {
    return <div className="user-profile-error-container">Unable to load profile data</div>;
  }
  
  const handleVisibilityToggle = async () => {
    if (!user) return;
  
    try {
      const res = await toggleProfileVisibility(auth.accessToken);
      if (res.status === 200) {
        addToast("Profile Visibility Updated", "success");
        
        setUser((prevUser) => ({
          ...prevUser,
          profileVisibility: !prevUser.profileVisibility,
        }));
      }else{
        addToast("Failure in Updating Profile Visibility", "failure");
      }
    } catch (error) {
      addToast("Failure in Updating Profile Visibility", "failure");
    }
  };
  

  
  
  const handleNameUpdate = async () => {
    if (!user) return;
    try {
      const res = await updateUserName(auth.accessToken, {
        firstName,
        lastName
      });
      if (res.status === 200) {
        addToast("Name Updated Successfully!", "success");
        setUser(prevUser => ({
          ...prevUser,
          firstName,
          lastName
        }));
        setIsEditingName(false);
      }else{
        addToast("Failure in Updating Name", "failure");
      }
    } catch (error) {
      addToast("Failure in Updating Name", "failure");
    }
  };
  
  const handlePasswordUpdate = async () => {
    if (!user) return;
    if (newPassword !== newConfirmPassword) {
      addToast('New password and confirmation do not match', "failure");
      return;
    }
    
    try {
      const res = await updatePassword(auth.accessToken, {
        oldPassword,
        newPassword,
        newConfirmPassword
      });
      if (res.status === 200) {
        setIsUpdatingPassword(false);
        setOldPassword('');
        setNewPassword('');
        setNewConfirmPassword('');
        addToast('Password updated successfully', "success");
      }else{
        setOldPassword('');
        setNewPassword('');
        setNewConfirmPassword('');
        addToast('Failed to Updated Password', "failure");
      }
    } catch (error) {
      setOldPassword('');
      setNewPassword('');
      setNewConfirmPassword('');
      addToast('Failed to update password. Please try again', "failure");
    }
  };
  
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };
  
  const handlePhotoUpdate = async () => {
    if (!selectedFile) return;
    
    let formData = new FormData();
    formData.append("file", selectedFile);
    
    try {
      const res = await uploadProfilePhoto(formData, auth.accessToken);
      console.log(res)
      if (res.status === 200) {
        setProfilePhotoUrl(res.data.profilePictureUrl)
        setUser((prevUser) => ({
          ...prevUser,
          pictureUrl: res.data.pictureUrl,
        }));
        setIsEditingPhoto(false);
        setSelectedFile(null);
        addToast("Profile photo updated successfully", "success");
      }else{
        addToast("Failed to update profile photo! Please try again", "failure");
      }
    } catch (error) {
      addToast("Failed to update profile photo! Please try again", "failure");
    }
  };
  
  if (isLoading) {
    return <SkeletonUserProfile/>;
  }

  return (
    <div className="user-profile-container">
      <section className="user-profile-header-section">
        <div className="user-profile-header-photo-container" ref={photoRef}>
            <img
                src={user.pictureUrl || profilePhotoUrl || defaultProfileLogo}
                alt={`${user.firstName}'s profile`}
                className="user-profile-header-photo"
                onClick={() => setIsEditingPhoto(true)}
            />
            <div className="user-profile-photo-edit-overlay" style={{display : photoRef.current && photoRef.current.matches(':hover') ? 'flex' : 'none'}} onClick={() => setIsEditingPhoto(true)}>
                <span className="user-profile-photo-edit-text">Edit</span>
            </div>
        </div>
        <div className="user-profile-header-details">
            <h1 
              className="user-profile-header-name"
              onClick={() => setIsEditingName(true)}
            >{user.firstName} {user.lastName}</h1>
            <button 
                className="user-profile-password-button"
                onClick={() => setIsUpdatingPassword(true)}
                >
                Change Password
            </button>
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

      {user.teamName && user.leagueName ? (
        <section className="user-profile-affiliations-section">
              <div className="user-profile-team-container">
                  <div className="user-profile-team-logo-wrapper">
                    <img
                      src={user.teamLogo || defaultTeamLogo}
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
                    src={user.leagueLogo || defaultLeagueLogo}
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
      ):(
        <Link to='../leagues' className="browse-leagues-button">
          Browse Leagues
        </Link>
      )}

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
      {isUpdatingPassword && (
        <div className="user-profile-modal-overlay">
            <div className="user-profile-modal">
            <div className="user-profile-modal-header">
                <h2>Change Password</h2>
            </div>
            <div className="user-profile-modal-content">
                <div className="user-profile-modal-form">
                <div className="user-profile-modal-input-group">
                    <label htmlFor="oldPassword">Current Password</label>
                    <input
                    id="oldPassword"
                    type="password"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    className="user-profile-modal-input"
                    placeholder="Enter current password"
                    />
                </div>
                <div className="user-profile-modal-input-group">
                    <label htmlFor="newPassword">New Password</label>
                    <input
                    id="newPassword"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="user-profile-modal-input"
                    placeholder="Enter new password"
                    />
                </div>
                <div className="user-profile-modal-input-group">
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input
                    id="confirmPassword"
                    type="password"
                    value={newConfirmPassword}
                    onChange={(e) => setNewConfirmPassword(e.target.value)}
                    className="user-profile-modal-input"
                    placeholder="Confirm new password"
                    />
                </div>
                </div>
            </div>
            <div className="user-profile-modal-footer">
                <button 
                className="user-profile-modal-cancel"
                onClick={() => setIsUpdatingPassword(false)}
                >
                Cancel
                </button>
                <button 
                className="user-profile-modal-save"
                onClick={handlePasswordUpdate}
                >
                Update Password
                </button>
            </div>
            </div>
        </div>
        )}
        {isEditingPhoto && (
            <div className="user-profile-modal-overlay">
                <div className="user-profile-modal">
                <div className="user-profile-modal-header">
                    <h2>Change Profile Photo</h2>
                </div>
                <div className="user-profile-modal-content">
                    <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="user-profile-modal-input"
                    />
                </div>
                <div className="user-profile-modal-footer">
                    <button
                    className="user-profile-modal-cancel"
                    onClick={() => setIsEditingPhoto(false)}
                    >
                    Cancel
                    </button>
                    <button
                    className="user-profile-modal-save"
                    onClick={handlePhotoUpdate}
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
