import React, { useState } from 'react';
import '../../styles/createLeague.css';
import file_upload from '../../assets/images/createTeam/file_upload.svg';
import { createLeague } from '../../services/leagues';
import useAuth from "../../hooks/useAuth";
import { useNavigate } from 'react-router-dom';


function CreateLeague() {
    const [leagueName, setLeagueName] = useState('');
    const [price, setPrice] = useState('');
    const [maxTeamSize, setMaxTeamSize] = useState('');
    const [teamStarterSize, setTeamStarterSize] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [gameAmount, setGameAmount] = useState('');
    const [leagueLogo, setLeagueLogo] = useState(null);
    const [error, setError] = useState(null);
    const { auth } = useAuth();
    const navigate = useNavigate();

    const handleLogoChange = (e) => {
        const file = e.target.files[0];

        if (file) {
            if (file.type.startsWith('image/')) {
                setLeagueLogo(file);
            } else {
                setError('Please select an image file.');
            }
        } else {
            setLeagueLogo(null);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        if (!leagueName || !price || !maxTeamSize || !teamStarterSize || !startTime || !endTime || !gameAmount) {
            setError("All fields except League Logo are required.");
            return;
        }

        let formData = new FormData();
        formData.append("leagueName", leagueName);
        formData.append("price", price);
        formData.append("maxTeamSize", maxTeamSize);
        formData.append("teamStarterSize", teamStarterSize);
        formData.append("startTime", startTime);
        formData.append("endTime", endTime);
        formData.append("gameAmount", gameAmount);

        if (leagueLogo) {
            formData.append("file", leagueLogo);
        }

        try {
            console.log(auth.accessToken)
            const response = await createLeague(auth.accessToken, formData);
            if (response.status === 200 || response.status === 201) {
                navigate('/app/leagues');
            } else if (response.status >= 400 && response.status < 500) {
                setError("Error Creating League: " + response.data?.message || response.statusText);
            } else {
                setError("An unexpected error occurred. Please try again later.")
            }
        } catch (error) {
            setError("An unexpected error occurred. Please try again later.");
        }
    };

    return (
        <div className="create-league-container">
            
            {error && <p className="error">{error}</p>}
            <form className="create-league-form" onSubmit={handleSubmit}>
                <div className='create-league-heading'>
                    Create League
                </div>
                <div className='outer-row-one-two'>
                    <div className='inner-row-one-two'>
                        <div className='row-one'>
                            <div className="input-group">
                                <label htmlFor="leagueName" className="create-league-label">League Name *</label>
                                <input type="text" id="leagueName" className="create-league-input" value={leagueName} onChange={(e) => setLeagueName(e.target.value)} required />
                            </div>
                            <div className="input-group">
                                <label htmlFor="price" className="create-league-label">Price *</label>
                                <input type="number" id="price" className="create-league-input" value={price} onChange={(e) => setPrice(e.target.value)} required />
                            </div>
                        </div>
                        <div className='row-two'>
                            <div className="input-group">
                                <label htmlFor="startTime" className="create-league-label">Start Time *</label>
                                <input type="datetime-local" id="startTime" className="create-league-input" value={startTime} onChange={(e) => setStartTime(e.target.value)} required />
                            </div>
                            <div className="input-group">
                                <label htmlFor="endTime" className="create-league-label">End Time *</label>
                                <input type="datetime-local" id="endTime" className="create-league-input" value={endTime} onChange={(e) => setEndTime(e.target.value)} required />
                            </div>
                        </div>
                    </div>
                    <div className="input-group logo-half">
                        <label className="create-league-label" htmlFor="league-logo-upload">League Logo</label>
                        <div className="create-league-file-upload" onClick={() => document.getElementById("league-logo-upload").click()}>
                            <input type="file" id="league-logo-upload" className="create-league-file-input" style={{ display: "none" }} onChange={handleLogoChange} accept="image/png, image/jpeg" />
                            <img className="create-league-file-icon" src={file_upload} alt="file_upload" />
                            <span className="create-league-file-text">Upload file here</span>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="input-group">
                        <label htmlFor="maxTeamSize" className="create-league-label">Max Team Size *</label>
                        <input type="number" id="maxTeamSize" className="create-league-input" value={maxTeamSize} onChange={(e) => setMaxTeamSize(e.target.value)} required />
                    </div>
                    <div className="input-group">
                        <label htmlFor="teamStarterSize" className="create-league-label">Team Starter Size *</label>
                        <input type="number" id="teamStarterSize" className="create-league-input" value={teamStarterSize} onChange={(e) => setTeamStarterSize(e.target.value)} required />
                    </div>
                    <div className="input-group">
                        <label htmlFor="gameAmount" className="create-league-label">Game Amount *</label>
                        <input type="number" id="gameAmount" className="create-league-input" value={gameAmount} onChange={(e) => setGameAmount(e.target.value)} required />
                    </div>
                </div>

                <div className="row">
                    <button type="submit" className="create-league-submit-button">Create League</button>
                </div>

            </form>
        </div>
    );
}

export default CreateLeague;