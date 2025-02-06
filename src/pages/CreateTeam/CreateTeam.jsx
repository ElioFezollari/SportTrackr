import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import "../../styles/createTeam.css";
import Dropdown from "../../components/layout/applayout/Dropdown";
import file_upload from '../../assets/images/createTeam/file_upload.svg'
import useAuth from "../../hooks/useAuth";
import {createTeam} from "../../services/team";
import { getLeague } from "../../services/leagues";

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
            console.log(auth.accessToken)
            const res = await getLeague(auth.accessToken, id);
            console.log(res)
            setLeague(res.data.league);
            setLoading(false)
          } catch (e) {
            console.log(e)
            setError(
              "There was an error fetching this league. Please try again later."
            );
            setLoading(false)
          }
        };
    
        getOneLeague();
    }, [auth.accessToken, id]);
    
    const handleVisibilityChange = (value) => {
        setTeamVisibility(value);
        if (value !== 'private') {
          setPrivateKey('');
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        if (teamVisibility && !privateKey) {
            console.log("Error: Private key is required for private teams.");
            return;
        }
        
        let formData = new FormData();

        let teamInfo = `
            "name":"${teamName}",
            "leagueId":6,
            "homeColor":"${primaryColor.value}",
            "awayColor":"${secondaryColor.value}",
            "teamDescription":"${teamDescription}"
            "teamVisibility":"${teamVisibility}"
        `
        
        if (teamVisibility){
            teamInfo += `,"password":"${privateKey}"`
        }

        formData.append("teamInfo", teamInfo);

        await createTeam(formData, auth.accessToken).then((res)=>{
            console.log(res.status)
            if(res.status === 500){
                console.log(res)
                console.log(res.statusText)
            }
        }).catch((e)=>{
            console.log(e);
        })

    };
    
  return (
    <div className="create-team-container">
        {error ? (
            <p className="error">{error}</p>
          ) : (
            <div className="create-team-header-container">
                <img src={league.logoUrl} alt="league-logo" className="create-team-league-logo"/>
                <h2 className="create-team-league-name">{league.leagueName}</h2>
            </div>
        )}
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
                    <label className="create-team-label" htmlFor="team-logo-upload">Team Logo</label>
                    <div className="create-team-file-upload" onClick={() => document.getElementById("team-logo-upload").click()}>
                        <input 
                            type="file" 
                            id="team-logo-upload" 
                            className="create-team-file-input" 
                            style={{ display: "none" }}
                            onChange={(e) => setTeamLogo(e.target.files[0])}
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
                <button className="create-team-submit-button">Proceed to Checkout</button>
            </div>
        </form>
    </div>
  );
}

export default CreateTeam;