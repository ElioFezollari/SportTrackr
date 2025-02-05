import React from "react";
import { useState } from "react";
import "../../styles/createTeam.css"; // Keep this import for general styles if needed
import Dropdown from "../../components/layout/applayout/Dropdown";
import file_upload from '../../assets/images/createTeam/file_upload.svg'

function CreateTeam() {

    const League = {
     name: "First League",
     logoUrl: 'https://cdn2.vectorstock.com/i/1000x1000/82/21/football-league-logo-vector-34398221.jpg',
     price: 3000   
    }
    const [teamName, setTeamName] = useState('');
    const [primaryColor, setPrimaryColor] = useState('');
    const [secondaryColor, setSecondaryColor] = useState('');
    const [teamDescription, setTeamDescription] = useState('');
    const [teamLogo, setTeamLogo] = useState();
    const [teamVisibility, setTeamVisibility] = useState('private')
    const [privateKey, setPrivateKey] = useState('');

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

    const handleVisibilityChange = (value) => {
        setTeamVisibility(value);
        if (value !== 'private') {
          setPrivateKey('');
        }
      };

  return (
    <div className="create-team-container">
        <div className="create-team-header-container">
            <img src={League.logoUrl} alt="league-logo" className="create-team-league-logo"/>
            <h2 className="create-team-league-name">{League.name}</h2>
        </div>
        <form className="create-team-form">
            <div className="create-team-row-1">
                <div className="create-team-name-input">
                    <label htmlFor="teamName" className="create-team-label">Team Name *</label>
                    <input type="text" placeholder="Type Here..." id="teamName" name="teamName" className="create-team-input" onChange={e=>{setTeamName(e.target.value)}} required/>
                </div>
                <div className="create-team-primary-color">
                    <label htmlFor="primaryColor" className="create-team-label">Primary Color *</label>
                    <Dropdown className="dropdown" options={colorOptions} onSelect={e=>{setPrimaryColor(e.target.value)}} label="Select Color"/>
                </div>
                <div className="create-team-secondary-color">
                    <label htmlFor="primaryColor" className="create-team-label">Secondary Color *</label>
                    <Dropdown className="dropdown" options={colorOptions} onSelect={e=>{setSecondaryColor(e.target.value)}} label="Select Color"/>
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
                        checked={teamVisibility === 'private'}
                        onChange={() => handleVisibilityChange('private')}
                        className="radio-button-input"
                    />
                    <span className="create-team-visibility-span">Private</span>
                    </label>
                    <label className="create-team-visibility-label">
                    <input
                        type="radio"
                        name="visibility"
                        value="public"
                        checked={teamVisibility === 'public'}
                        onChange={() => handleVisibilityChange('public')}
                        className="radio-button-input"
                    />
                    <span className="create-team-visibility-span">Public</span>
                    </label>
                    {teamVisibility === 'private' && (
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