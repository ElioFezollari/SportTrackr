import React, { useState, useEffect } from "react";
import "../../styles/createTeam.css";
import "../../styles/myTeam.css";
import useAuth from "../../hooks/useAuth";
import { getTeam, deleteTeam, updateTeam } from "../../services/team";
import { getLeague } from "../../services/leagues";
import { getUser } from "../../services/user";
import SkeletonTeam from "../../components/skeletons/SkeletonTeam";
import { decodeJWT } from "../../utils/decode";
import defaultProfileLogo from '../../assets/images/defaultLogo/default_profile_logo.svg';
import defaultLeagueLogo from '../../assets/images/defaultLogo/default_league_logo.svg';
import defaultTeamLogo from '../../assets/images/defaultLogo/deafult_team_logo.svg'; // Fixed typo in filename
import { useToast } from "../../context/ToastContext";
import { useNavigate } from "react-router";
import Dropdown from "../../components/layout/applayout/Dropdown";
import file_upload from '../../assets/images/createTeam/file_upload.svg';

function MyTeam() {
    const { auth } = useAuth();
    const [teamError, setTeamError] = useState(null);
    const [leagueError, setLeagueError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [team, setTeam] = useState(null);
    const [league, setLeague] = useState(null);
    const [error, setError] = useState(null);
    const [teamOwner, setTeamOwner] = useState(null);
    const [ifOwner, setIfOwner] = useState(false);
    const [editModal, setEditModal] = useState(false);
    
    // Initialize form fields with empty values
    const [teamName, setTeamName] = useState('');
    const [primaryColor, setPrimaryColor] = useState(null);
    const [secondaryColor, setSecondaryColor] = useState(null);
    const [teamDescription, setTeamDescription] = useState('');
    const [teamLogo, setTeamLogo] = useState(null);
    const [teamVisibility, setTeamVisibility] = useState(true);
    const [privateKey, setPrivateKey] = useState('');
    const [refresh, setRefresh] = useState(false);

    const { addToast } = useToast();
    const navigate = useNavigate();

    const colorOptions = [
        { value: 'red', label: 'Red' },
        { value: 'blue', label: 'Blue' },
        { value: 'green', label: 'Green' },
        { value: 'yellow', label: 'Yellow' },
        { value: 'purple', label: 'Purple' },
        { value: 'orange', label: 'Orange' },
        { value: 'black', label: 'Black' },
        { value: 'white', label: 'White' },
        { value: 'gray', label: 'Gray' },
        { value: 'brown', label: 'Brown' },
        { value: 'pink', label: 'Pink' },
        { value: 'cyan', label: 'Cyan' },
        { value: 'magenta', label: 'Magenta' },
        { value: 'lime', label: 'Lime' },
        { value: 'teal', label: 'Teal' },
        { value: 'beige', label: 'Beige' },
        { value: 'cream', label: 'Cream' },
        { value: 'turquoise', label: 'Turquoise' },
        { value: 'peach', label: 'Peach' },
        { value: 'lavender', label: 'Lavender' },
    ];

    useEffect(() => {
        const getMyTeam = async () => {
            setLoading(true);
            const decodedToken = decodeJWT(auth.accessToken);

            if (!decodedToken || !decodedToken.teamId) {
                setError("Please Create or Join a Team");
                setLoading(false);
                return;
            }

            try {
                const teamResponse = await getTeam(decodedToken.teamId, auth.accessToken);
                if (teamResponse.status === 200 || teamResponse.status === 201) {
                    const teamData = teamResponse.data.team;

                    // Set initial form values when team data is loaded
                    setTeamName(teamData.name);
                    setPrimaryColor({ value: teamData.homeColor, label: teamData.homeColor });
                    setSecondaryColor({ value: teamData.awayColor, label: teamData.awayColor });
                    setTeamDescription(teamData.description || '');
                    setTeamVisibility(teamData.teamVisibility);

                    const leagueResponse = await getLeague(auth.accessToken, teamData.league_id);
                    if (leagueResponse.status === 200 || leagueResponse.status === 201) {
                        const userResponse = await getUser(teamData.owner_id, auth.accessToken);
                        if (userResponse.status === 200 || userResponse.status === 201) {
                            setTeam(teamData);
                            setLeague(leagueResponse.data.league);
                            setTeamOwner(userResponse.data.user);
                            setIfOwner(teamData.owner_id === decodedToken.id);
                            setLoading(false);
                            setError(null);
                        } else {
                            throw new Error("Error fetching team owner");
                        }
                    } else {
                        throw new Error("Error fetching league");
                    }
                } else {
                    throw new Error("Error fetching team");
                }
            } catch (err) {
                setError(err.message || "An error occurred");
                setLoading(false);
            }
        };

        getMyTeam();
    }, [auth.accessToken, refresh]);

    const handleDeleteTeam = async () => {
        try {
            const response = await deleteTeam(auth.accessToken);
            if (response.status === 204) {
                navigate("../");
            } else {
                addToast(response.response?.data?.message || "Error Deleting Team", "failure");
            }
        } catch (e) {
            addToast("Error Deleting Team", "failure");
        }
    };

    const handleVisibilityChange = (value) => {
        setTeamVisibility(value);
        if (value) {
            setPrivateKey('');
        }
    };

    const handleLogoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.type.startsWith('image/')) {
                setTeamLogo(file);
            } else {
                addToast("Only image files are allowed for team logo", "failure");
            }
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        if (!teamVisibility && !privateKey) {
            addToast("Private key is required for private teams", "failure");
            return;
        }

        const formData = new FormData();
        const teamInfo = {
            name: teamName,
            homeColor: primaryColor?.value,
            awayColor: secondaryColor?.value,
            description: teamDescription,
            teamVisibility: teamVisibility,
            ...(teamVisibility === false && { password: privateKey })
        };

        formData.append("teamInfo", JSON.stringify(teamInfo));
        if (teamLogo) {
            formData.append("logo", teamLogo);
        }

        try {
            const response = await updateTeam(team.id, formData, auth.accessToken);
            if (response.status === 200 || response.status === 201) {
                if (response.data.url) {
                    window.location.href = response.data.url;
                } else {
                    addToast("Team updated successfully", "success");
                    setEditModal(false);
                }
            } else {
                addToast(response.data?.message || "Error updating team", "failure");
            }
        } catch (error) {
            addToast(error.response?.data?.message || "An unexpected error occurred", "failure");
        }
        setRefresh((prev) => !prev);
    };

    return (
        <div className="my-team-container">
            {loading ? (
                <SkeletonTeam />
            ) : error ? (
                <p className="error-message">{error}</p>
            ) : team && league && teamOwner ? (
                <div className="team-details">
                    <div className="league-header">
                        <img 
                            src={league.logoUrl || defaultLeagueLogo} 
                            alt={`${league.leagueName} Logo`} 
                            className="league-logo" 
                        />
                        <h2 className="league-name">{league.leagueName}</h2>
                    </div>

                    <div className="team-card">
                        <div className="team-image-container">
                            <img 
                                src={team.signedUrl || defaultTeamLogo} 
                                alt={`${team.name} Logo`} 
                                className="team-logo" 
                            />
                        </div>
                        <div className="team-info">
                            <div className="first-row">
                                <h3 className="team-name">{team.name}</h3>
                                <div className="owner-overlay">
                                    <img 
                                        src={teamOwner.pictureUrl || defaultProfileLogo} 
                                        alt={`${teamOwner.firstName} ${teamOwner.lastName}'s picture`} 
                                        className="owner-picture" 
                                    />
                                    <p className="owner-name">{teamOwner.firstName} {teamOwner.lastName}</p>
                                </div>
                            </div>
                            <p className="team-description">{team.description}</p>
                            <div className="color-palette">
                                <div className="color-swatch" style={{ backgroundColor: team.homeColor }}></div>
                                <div className="color-swatch" style={{ backgroundColor: team.awayColor }}></div>
                                <p className="color-labels">Primary & Secondary Colors</p>
                            </div>
                            <p className="team-visibility">
                                Visibility: {team.teamVisibility ? "Public" : "Private"}
                            </p>
                        </div>
                    </div>
                    
                    {ifOwner && (
                        <div className="customise-team-button-container">
                            <button className="edit-team-button" onClick={() => setEditModal(true)}>
                                Edit Team
                            </button>
                            <button className="delete-team-button" onClick={handleDeleteTeam}>
                                Delete Team
                            </button>
                        </div>
                    )}
                </div>
            ) : (
                <SkeletonTeam />
            )}

            {editModal && (
                <div className="edit-modal-overlay">
                    <form className="create-team-form" onSubmit={handleSubmit}>
                        <div className="create-team-row-1">
                            <div className="create-team-name-input">
                                <label htmlFor="teamName" className="create-team-label">Team Name *</label>
                                <input 
                                    value={teamName} 
                                    type="text" 
                                    placeholder="Type Here..." 
                                    id="teamName" 
                                    name="teamName" 
                                    className="create-team-input" 
                                    onChange={(e) => setTeamName(e.target.value)} 
                                    required
                                />
                            </div>
                            <div className="create-team-primary-color">
                                <label htmlFor="primaryColor" className="create-team-label">Primary Color *</label>
                                <Dropdown 
                                    className="dropdown" 
                                    options={colorOptions} 
                                    label="Select Color" 
                                    onSelect={setPrimaryColor}
                                    defaultValue={{value : `${team.homeColor}`, label:`${team.homeColor}`}}
                                    required
                                />
                            </div>
                            <div className="create-team-secondary-color">
                                <label htmlFor="secondaryColor" className="create-team-label">Secondary Color *</label>
                                <Dropdown 
                                    className="dropdown" 
                                    options={colorOptions} 
                                    label="Select Color" 
                                    onSelect={setSecondaryColor}
                                    defaultValue={{value : `${team.awayColor}`, label:`${team.awayColor}`}}
                                    required
                                />
                            </div>
                        </div>
                        <div className="create-team-row-2">
                            <div className="create-team-description">
                                <label htmlFor="teamDescription" className="create-team-label">Team Description</label>
                                <textarea 
                                    value={teamDescription} 
                                    placeholder="Type here..." 
                                    onChange={(e) => setTeamDescription(e.target.value)} 
                                    name="teamDescription" 
                                    id="teamDescription" 
                                    className="create-team-textarea" 
                                    rows="10" 
                                    cols="50"
                                />
                            </div>
                            <div className="create-team-logo-upload">
                                <label className="create-team-label" htmlFor="team-logo-upload">Team Logo</label>
                                <div className="create-team-file-upload" onClick={() => document.getElementById("team-logo-upload").click()}>
                                    <input 
                                        type="file" 
                                        onChange={handleLogoChange}
                                        id="team-logo-upload" 
                                        className="create-team-file-input" 
                                        style={{ display: "none" }}
                                        accept="image/png,image/jpeg"
                                    />
                                    <img 
                                        className="edit-team-file-icon" 
                                        src={teamLogo ? URL.createObjectURL(teamLogo) : (team.signedUrl || defaultTeamLogo)} 
                                        alt="Team logo preview"
                                    />
                                    <span className="create-team-file-text">Upload file here</span>
                                </div>
                            </div>
                        </div>    
                        <div className="create-team-row-3">
                            <label className="create-team-label">Team Visibility *</label>
                            <div className="create-team-visibility-options">
                                <label className="create-team-visibility-label">
                                    <input
                                        type="radio"
                                        name="visibility"
                                        value="public"
                                        checked={teamVisibility === true}
                                        onChange={() => handleVisibilityChange(true)}
                                        className="radio-button-input"
                                    />
                                    <span className="create-team-visibility-span">Public</span>
                                </label>
                                <label className="create-team-visibility-label">
                                    <input
                                        type="radio"
                                        name="visibility"
                                        value="private"
                                        checked={teamVisibility === false}
                                        onChange={() => handleVisibilityChange(false)}
                                        className="radio-button-input"
                                    />
                                    <span className="create-team-visibility-span">Private</span>
                                </label>
                                {!teamVisibility && (
                                    <input
                                        type="password"
                                        placeholder="Enter private key"
                                        value={privateKey}
                                        onChange={(e) => setPrivateKey(e.target.value)}
                                        className="create-team-private-key-input"
                                        required
                                    />
                                )}
                            </div>
                        </div>
                        <div className="edit-team-modal-row-4">
                            <button type="button" className="delete-team-modal-button" onClick={() => setEditModal(false)}>
                                Cancel
                            </button>
                            <button type="submit" className="edit-team-modal-button">Save Changes</button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
}

export default MyTeam;