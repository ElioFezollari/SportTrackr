import React from "react";
import { useState } from "react";
import "../../styles/createTeam.css";
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
    <div className="container">
        {/* Header Looking something like this  BUNDESLIGA > Create a team*/}
        <div className="header-container">
            <img src={League.logoUrl} alt="league-logo"/>
            
            <h2 className="league-name">{League.name}</h2>
        </div>
        {/* Then there will be a team creation container 
        
        // Firt row will contain three things Team name, primary color and secondary color

        // Team Description And Team Logo

        // Team visibility if public then nothing else ask them to create a private key

        // Procees to checkout button
        
        */}
        <form>
            <div>
                <div>
                    <label for="teamName">Team Name *</label>
                    <input type="text" placeholder="Type Here..." id="teamName" name="teamName" onChange={e=>{setTeamName(e.target.value)}} required/>
                </div>
                <div>
                    <label for="primaryColor">Primary Color *</label>
                    <Dropdown className="dropdown" options={colorOptions} onSelect={e=>{setPrimaryColor(e.target.value)}} label="Select Color"/>
                </div>
                <div>
                    <label for="primaryColor">Secondary Color *</label>
                    <Dropdown className="dropdown" options={colorOptions} onSelect={e=>{setSecondaryColor(e.target.value)}} label="Select Color"/>
                </div>
            </div>
            <div>
                <div>
                    <label for="teamDescription">Team Description</label>
                    <textarea placeholder="Type here..." onChange={e=>{setTeamDescription(e.target.value)}} name="teamDescription" id="teamDescription" rows="10" cols="50"></textarea>
                </div>

                <div >
                    <label>Team Logo</label>
                    <div class="file-upload">
                        <img class="icon" src={file_upload} alt="file_upload"/>
                        <span class="text">Upload file here</span>
                        <input type="file" />
                    </div>
                </div>
            </div>    
            <div>
                <label htmlFor="teamVisibility">
                    Team Visibility *
                </label>
                <div>
                    <label>
                    <input
                        type="radio"
                        name="visibility"
                        value="private"
                        checked={teamVisibility === 'private'}
                        onChange={() => handleVisibilityChange('private')}
                    />
                    <span>Private</span>
                    </label>
                    <label>
                    <input
                        type="radio"
                        name="visibility"
                        value="public"
                        checked={teamVisibility === 'public'}
                        onChange={() => handleVisibilityChange('public')}
                    />
                    <span>Public</span>
                    </label>
                    {teamVisibility === 'private' && (
                    <>
                    <input
                        type="text"
                        placeholder="Enter private key"
                        value={privateKey}
                        onChange={(e) => setPrivateKey(e.target.value)}
                    />
                    </>
                    )}
                </div>
            </div>
            <div>
                <button>Proceed to Checkout</button>
            </div>
        </form>
    </div>
  );
}

export default CreateTeam;
