import axios from 'axios'
const baseUrl = 'http://localhost:5001/v1/match/'


const getMatch = async (credentials) => {
    const config = {
      headers: {
        Authorization: `Bearer ${credentials}`, 
      },
    };
    
    try {
      const response = await axios.get(`${baseUrl}stats` , config);
      return response;
    } catch (error) {
      console.error('Error fetching match:', error);
    }
  };


  const getMatchesByLeagueId = async (credentials, leagueId) => {
    const config = {
      headers: {
        Authorization: `Bearer ${credentials}`, 
      },
    };
    
    try {
      console.log(leagueId)
      const response = await axios.get(`${baseUrl}league/${leagueId}` , config);
      return response;
    } catch (error) {
      console.error('Error fetching match:', error);
    }
  };


  const getMatchById = async (credentials, matchId) => {
    const config = {
      headers: {
        Authorization: `Bearer ${credentials}`, 
      },
    };
    
    try {
      const response = await axios.get(`${baseUrl}general/${matchId}` , config);
      return response;
    } catch (error) {
      console.error('Error fetching match:', error);
    }
  };


  const getMatchDetails = async (credentials, matchId) => {
    const config = {
      headers: {
        Authorization: `Bearer ${credentials}`, 
      },
    };
    
    try {
      const response = await axios.get(`${baseUrl}${matchId}` , config);
      return response;
    } catch (error) {
      console.error('Error fetching match:', error);
    }
  };

  const updateMatch = async (credentials, matchId, homeTeam, awayTeam) => {
    const config = {
      headers: {
        Authorization: `Bearer ${credentials}`,
        'Content-Type': 'application/json',
      },
    };
  
    const statsData = {
      matchId,
      homeTeam: {
        id: homeTeam.id,
        players: homeTeam.players,
      },
      awayTeam: {
        id: awayTeam.id,
        players: awayTeam.players, 
      },
    };
  
    try {
      const response = await axios.post(baseUrl, statsData, config);
  
      if (response.status === 200) {
        console.log('Match stats updated successfully!');
        return response.data;  
      } else {
        console.error('Failed to update match stats:', response.status);
        return null; 
      }
    } catch (error) {
      console.error('Error updating match:', error);
      throw new Error('Error updating match stats. Please try again later.');
    }
  };

  const uploadHighlights = async (credentials, formData) => {
    const config = {
      headers: {
        Authorization: `Bearer ${credentials}`,
        "Content-Type": "multipart/form-data", // Important to send as form data
      },
    };
  
    try {
      // Send the formData directly to the server
      const response = await axios.post(`${baseUrl}highlights`, formData, config);
      return response.data;
    } catch (error) {
      console.error("Error uploading highlights:", error);
      throw error;
    }
  };
  
  const getDataCreateMatch = async (credentials, leagueId) => {
    const config = {
      headers: {
        Authorization: `Bearer ${credentials}`, 
      },
    };
    
    try {
      const response = await axios.get(`${baseUrl}createMatches/${leagueId}` , config);
      return response;
    } catch (error) {
      console.error('Error fetching match:', error);
    }
  };
  const createMatch = async (credentials, leagueId, matchData) => {
    try {
      console.log(matchData)
      const config = {
        headers: {
          Authorization: `Bearer ${credentials}`,
          "Content-Type": "application/json",
        },
      };
  
      // Prepare data once and send it
      const response = await axios.post(`${baseUrl}createMatches`, {
        leagueId,
        ...matchData, // Spread the matchData into the request payload
      }, config);
  
      return response.data;
    } catch (error) {
      console.error("Error creating match:", error);
      throw error;
    }
  };
  

  const updateForfeited = async (credentials, matchId, forfeitedBy) => {
    const config = {
      headers: {
        Authorization: `Bearer ${credentials}`, 
      },
    };
  
    try {
      console.log("Updating match forfeited status:", matchId, "Forfeited By:", forfeitedBy);
  
      const response = await axios.put(`${baseUrl}/${matchId}/forfeit`, { forfeitedBy }, config);
      return response.data;
    } catch (error) {
      console.error("Error updating match forfeited status:", error);
      throw error;
    }
  };
  
export {getMatch, getMatchesByLeagueId,getMatchById,getMatchDetails,updateMatch, uploadHighlights, getDataCreateMatch, createMatch, updateForfeited}