import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import "../../styles/createTeam.css";
import Dropdown from "../../components/layout/applayout/Dropdown";
import file_upload from '../../assets/images/createTeam/file_upload.svg'
import useAuth from "../../hooks/useAuth";
import {createTeam} from "../../services/team";
import { getLeague } from "../../services/leagues";
import { useNavigate } from 'react-router-dom';

function CreateTeam() {

    const [teamName, setTeamName] = useState('');
    const [primaryColor, setPrimaryColor] = useState('');
    const [secondaryColor, setSecondaryColor] = useState('');
    const [teamDescription, setTeamDescription] = useState('');
    const [teamLogo, setTeamLogo] = useState();
    const [teamVisibility, setTeamVisibility] = useState(false)
    const [privateKey, setPrivateKey] = useState('');
    const { id } = useParams("id");
    const [league, setLeague] = useState(null);
    const { auth } = useAuth();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
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
        const getOneLeague = async () => {

            try {
                const res = await getLeague(auth.accessToken, id);
                if (res.status === 200 || res.status === 201) {
                    setLeague(res.data.league);
                    setError(null);
                } else {
                    console.error("Error fetching league:", res.status, res.data);
                    setError("Error fetching league");
                }
            } catch (e) {
                console.error("Error fetching league:", e);
                setError("There was an error fetching this league. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        getOneLeague();
    }, [id, auth.accessToken]);
    
    const handleVisibilityChange = (value) => {
        setTeamVisibility(value);
        if (value !== 'private') {
          setPrivateKey('');
        }
    };

    const handleLogoChange = (e) => {
        const file = e.target.files[0];

        if (file) {
            if (file.type.startsWith('image/')) {
                console.log("Here")
                setTeamLogo(file);
            } else {
                setError('Please select an image file.');
            }
        } else {
          setTeamLogo(null)
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        if(!teamLogo){
            setError("Team Logo is required");
            return;
        }

        if (teamVisibility && !privateKey) {
            console.log("Error: Private key is required for private teams.");
            return;
        }
        
        let formData = new FormData();

        let teamInfo = `{"name":"${teamName}","leagueId":6,"homeColor":"${primaryColor.value}","awayColor":"${secondaryColor.value}","teamDescription":"${teamDescription}","teamVisibility":"${teamVisibility}"
        `
        
        if (teamVisibility){
            teamInfo += `,"password":"${privateKey}"}`
        }else{
            teamInfo += "}"
        }

        formData.append("teamInfo", teamInfo);
        formData.append("logo", teamLogo);

        try {
            const response = await createTeam(formData, auth.accessToken);
            if (response.status === 200 || response.status === 201) {
                const redirectUrl = response.data.url;
                if (redirectUrl) {
                    window.location.href = redirectUrl;
                } else {
                    setError("Internal Server Error. Please try again")
                }
            } else if (response.status >= 400 && response.status < 500) {
                setError("Error Creating Team: " + response.data?.message || response.statusText);
                console.error("Error creating team:", response.status, response.data);
            } else {
              setError("An unexpected error occurred. Please try again later.")
              console.error("Error creating team:", response.status, response.data);
            }
        } catch (error) {
            console.error("Error creating team:", error);
            setError("An unexpected error occurred. Please try again later.");
        }
    };
    
  return (
    <div className="create-team-container">
        {loading ? (
                <p>Loading league details...</p>
            ) : league ? (
                <>
                    <div className="create-team-header-container">
                        <img src={league.logoUrl} alt="league-logo" className="create-team-league-logo" />
                        <h2 className="create-team-league-name">{league.leagueName}</h2>
                    </div>
            {error ? (<p className="error">{error}</p>) : (<></> )}
        <form className="create-team-form" onSubmit={handleSubmit}>
            <div className="create-team-row-1">
                <div className="create-team-name-input">
                    <label htmlFor="teamName" className="create-team-label">Team Name *</label>
                    <input type="text" placeholder="Type Here..." id="teamName" name="teamName" className="create-team-input" onChange={e=>{setTeamName(e.target.value)}} required/>
                </div>
                <div className="create-team-primary-color">
                    <label htmlFor="primaryColor" className="create-team-label">Primary Color *</label>
                    <Dropdown className="dropdown" options={colorOptions} label="Select Color" onSelect={setPrimaryColor}/>
                </div>
                <div className="create-team-secondary-color">
                    <label htmlFor="primaryColor" className="create-team-label">Secondary Color *</label>
                    <Dropdown className="dropdown" options={colorOptions} label="Select Color" onSelect={setSecondaryColor}/>
                </div>
            </div>
            <div className="create-team-row-2">
                <div className="create-team-description">
                    <label htmlFor="teamDescription" className="create-team-label">Team Description</label>
                    <textarea placeholder="Type here..." onChange={e=>{setTeamDescription(e.target.value)}} name="teamDescription" id="teamDescription" className="create-team-textarea" rows="10" cols="50"></textarea>
                </div>

                <div className="create-team-logo-upload">
                    <label className="create-team-label" htmlFor="team-logo-upload">Team Logo*</label>
                    <div className="create-team-file-upload" onClick={() => document.getElementById("team-logo-upload").click()}>
                        <input 
                            type="file" 
                            id="team-logo-upload" 
                            className="create-team-file-input" 
                            style={{ display: "none" }}
                            onChange={handleLogoChange}
                            accept="image/png, image/jpeg"
                        />
                        <img className="create-team-file-icon" src={file_upload} alt="file_upload"/>
                        <span className="create-team-file-text">Upload file here</span>
                    </div>
                </div>
            </div>    
            <div className="create-team-row-3">
                <label htmlFor="teamVisibility" className="create-team-label">
                    Team Visibility *
                </label>
                <div className="create-team-visibility-options">
                    <label className="create-team-visibility-label">
                    <input
                        type="radio"
                        name="visibility"
                        value="private"
                        checked={teamVisibility === true}
                        onChange={() => handleVisibilityChange(true)}
                        className="radio-button-input"
                    />
                    <span className="create-team-visibility-span">Private</span>
                    </label>
                    <label className="create-team-visibility-label">
                    <input
                        type="radio"
                        name="visibility"
                        value="public"
                        checked={teamVisibility === false}
                        onChange={() => handleVisibilityChange(false)}
                        className="radio-button-input"
                    />
                    <span className="create-team-visibility-span">Public</span>
                    </label>
                    {teamVisibility && (
                    <>
                    <input
                        type="text"
                        placeholder="Enter private key"
                        value={privateKey}
                        onChange={(e) => setPrivateKey(e.target.value)}
                        className="create-team-private-key-input"
                    />
                    </>
                    )}
                </div>
            </div>
            <div className="create-team-row-4">
                <button type="submit" className="create-team-submit-button">Proceed to Checkout</button>
            </div>
        </form>
        </>
        ):null}
    </div>
  );
}

export default CreateTeam;