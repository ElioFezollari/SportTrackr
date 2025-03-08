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

  const uploadHighlights = async (credentials, leagueId, highlights) => {
    const formData = new FormData();
  
    highlights.forEach((highlight, index) => {
      formData.append(`highlights[${index}][video]`, highlight.file);
      formData.append(`highlights[${index}][playerId]`, highlight.playerId); 
      formData.append(`highlights[${index}][matchId]`, leagueId);  
      formData.append(`highlights[${index}][type]`, highlight.type); 
    });
  
    const config = {
      headers: {
        Authorization: `Bearer ${credentials}`,
        "Content-Type": "multipart/form-data", 
      },
    };
  
    try {
      const response = await axios.post(`${baseUrl}highlights`, formData, config);
      return response.data; 
    } catch (error) {
      console.error('Error uploading highlights:', error);
      throw error;
    }
  };
  
  
export {getMatch, getMatchesByLeagueId,getMatchById,getMatchDetails,updateMatch, uploadHighlights}