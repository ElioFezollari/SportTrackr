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
      console.log(matchId)
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
  
    // Prepare the data to send in the POST request
    const statsData = {
      matchId,
      homeTeam: {
        id: homeTeam.id,
        players: homeTeam.players, // Home team players stats
      },
      awayTeam: {
        id: awayTeam.id,
        players: awayTeam.players, // Away team players stats
      },
    };
  
    try {
      // Send the POST request to the backend
      const response = await axios.post(baseUrl, statsData, config);
  
      // Check if the response was successful
      if (response.status === 200) {
        console.log('Match stats updated successfully!');
        return response.data;  // Or return a success message, or just `true`
      } else {
        console.error('Failed to update match stats:', response.status);
        return null;  // Or return an error message if needed
      }
    } catch (error) {
      console.error('Error updating match:', error);
      throw new Error('Error updating match stats. Please try again later.');
    }
  };
  
export {getMatch, getMatchesByLeagueId,getMatchById,getMatchDetails,updateMatch}