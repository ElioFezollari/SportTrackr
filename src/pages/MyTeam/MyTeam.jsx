import React from "react";
import { useState, useEffect } from "react";
import "../../styles/createTeam.css";
import useAuth from "../../hooks/useAuth";
import { getTeam } from "../../services/team";
import { getLeague } from "../../services/leagues";
import { getUser } from "../../services/user";
import SkeletonTeam from "../../components/skeletons/SkeletonTeam";
import '../../styles/myTeam.css'

function MyTeam() {
    const { auth } = useAuth();
    const [teamError, setTeamError] = useState(null);
    const [leagueError, setLeagueError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [team, setTeam] = useState(null);
    const [league, setLeague] = useState(null);
    const [error, setError] = useState(null);
    const [teamOwner, setTeamOwner] = useState(null);
    
    function decodeJWT(token) {
        try {
            const payload = token.split(".")[1];
            return JSON.parse(atob(payload));
        } catch (error) {
            console.error("Error decoding JWT:", error);
            return null;
        }
    }

    useEffect(() => {
        const getMyTeam = async () => {
            const decodedToken = decodeJWT(auth.accessToken);

            if (!decodedToken || !decodedToken.teamId) {
                setLoading(false);
                setError("Please Create or Join a Team");
                return;
            }

            try {
                const response = await getTeam(decodedToken.teamId, auth.accessToken);
                if (response.status === 200 || response.status === 201) {
                    setTeam(response.data.team);
                    setTeamError(null);

                    try {
                        const res = await getLeague(auth.accessToken, response.data.team.league_id);
                        if (res.status === 200 || res.status === 201) {
                            setLeague(res.data.league);
                            setLeagueError(null);
                        } else {
                            setLeagueError("Error Fetching League");
                        }
                    } catch (e) {
                        console.error("Error fetching league:", e);
                        setLeagueError("Error Fetching League");
                    }

                    try{
                        const response = await getUser(team.owner_id, auth.accessToken);
                        if (response.status === 200 || response.status === 201) {
                            setTeamOwner(response.data.user);
                            setLoading(false);
                        }
                    }catch(e){
                        console.log(e)
                    }

                } else {
                    setTeamError("Error Fetching Team");
                }
            } catch (e) {
                console.error("Error fetching team:", e);
                setTeamError("Error Fetching Team");
            }
            console.log(team)
            console.log(league)
        };

        getMyTeam();
    }, [auth.accessToken]);

    return (
        <div className="create-team-container">
            {loading ? (
                <SkeletonTeam />
            ) : error ? (
                <p className="error-message">{error}</p>
            ) : leagueError ? (
                <p className="error-message">{leagueError}</p>
            ) : teamError ? (
                <p className="error-message">{teamError}</p>
            ) : team && league && teamOwner ? (
                <div className="team-details">
                    <div className="league-header">
                        <img src={league.logoUrl} alt={league.leagueName + " Logo"} className="league-logo" />
                        <h2 className="league-name">{league.leagueName}</h2>
                    </div>

                    <div className="team-card">
                        <div className="team-image-container">
                            <img src={team.signedUrl} alt={team.name + " Logo"} className="team-logo" />
                        </div>
                        <div className="team-info">
                            <div className="first-row">
                            <h3 className="team-name">{team.name}</h3>
                            <div className="owner-overlay">
                                <img src={teamOwner.pictureUrl} alt={teamOwner.firstName + " " + teamOwner.lastName + "'s picture"} className="owner-picture" />
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
                                Visibility: {team.visibility === false ? "Public" : "Private"}
                            </p>
                        </div>
                    </div>
                </div>
            ) : <SkeletonTeam/> } 
        </div>
    );
}

export default MyTeam;