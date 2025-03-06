import React from "react";
import { useState, useEffect } from "react";
import "../../styles/createTeam.css";
import useAuth from "../../hooks/useAuth";
import { getTeam } from "../../services/team";
import { getLeague } from "../../services/leagues";
import { getUser } from "../../services/user";
import SkeletonTeam from "../../components/skeletons/SkeletonTeam";
import '../../styles/myTeam.css'
import { decodeJWT } from "../../utils/decode";

function MyTeam() {
    const { auth } = useAuth();
    const [teamError, setTeamError] = useState(null);
    const [leagueError, setLeagueError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [team, setTeam] = useState(null);
    const [league, setLeague] = useState(null);
    const [error, setError] = useState(null);
    const [teamOwner, setTeamOwner] = useState(null);

    useEffect(() => {
        const getMyTeam = async () => {
            setLoading(true);

            const decodedToken = decodeJWT(auth.accessToken);

            if (!decodedToken || !decodedToken.teamId) {
                setLoading(false);
                setError("Please Create or Join a Team");
                return;
            }

            try {
                const teamResponse = await getTeam(decodedToken.teamId, auth.accessToken);
                if (teamResponse.status === 200 || teamResponse.status === 201) {
                    const teamData = teamResponse.data.team;

                    try {
                        const leagueResponse = await getLeague(auth.accessToken, teamData.league_id);
                        if (leagueResponse.status === 200 || leagueResponse.status === 201) {
                            const leagueData = leagueResponse.data.league;

                            try {
                                const userResponse = await getUser(teamData.owner_id, auth.accessToken);
                                if (userResponse.status === 200 || userResponse.status === 201) {
                                    setTeam(teamData);
                                    setLeague(leagueData);
                                    setTeamOwner(userResponse.data.user);
                                    setLoading(false);
                                    setError(null); 
                                } else {
                                    setError("Error fetching team owner");
                                    setLoading(false);
                                }
                            } catch (userError) {
                                setError("Error fetching team owner");
                                setLoading(false);
                            }

                        } else {
                            setLeagueError("Error Fetching League");
                            setLoading(false);
                        }
                    } catch (leagueError) {
                        setLeagueError("Error Fetching League");
                        setLoading(false);
                    }
                } else {
                    setTeamError("Error Fetching Team");
                    setLoading(false);
                }
            } catch (teamError) {
                setTeamError("Error Fetching Team");
                setLoading(false);
            }
        };
        console.log("")
        getMyTeam();
    }, [auth.accessToken]);

    return (
        <div className="my-team-container">
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