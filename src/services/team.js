import axios from 'axios';
const baseUrl = 'http://localhost:5000/v1/team/';

const getTeamsByLeagueId = async (credentials, leagueId) => {
  const config = {
    headers: {
      Authorization: `Bearer ${credentials}`,
    },
  };

  try {
    const response = await axios.get(`${baseUrl}league/${leagueId}`, config);
    return response;
  } catch (error) {
    console.error('Error fetching teams:', error);
  }
};

const getTeamsByLeagueOwner = async (credentials)=>{
  const config = {
    headers: {
      Authorization: `Bearer ${credentials}`,
    },
  };

  try {
    const response = await axios.get(`${baseUrl}`, config);
    return response;
  } catch (error) {
    console.error('Error fetching teams:', error);
  }
};

export { getTeamsByLeagueId,getTeamsByLeagueOwner };