import axios from 'axios'
const baseUrl = 'http://localhost:5000/v1/league/'


const getLeagues = async (credentials) => {
    const config = {
      headers: {
        Authorization: `Bearer ${credentials}`, 
      },
    };
    
    try {
      const response = await axios.get(baseUrl, config);
      return response;
    } catch (error) {
      console.error('Error fetching leagues:', error);
    }
  };

const getLeague = async (credentials,id) =>{
  const config = {
    headers: {
      Authorization: `Bearer ${credentials}`, 
    },
  };
  
  try {
    const response = await axios.get(`${baseUrl}/${id}` , config);
    return response;
  } catch (error) {
    console.error('Error fetching leagues:', error);
  }
}

const getLeagueList = async (credentials) => {

  const config = {
    headers: {
      Authorization: `Bearer ${credentials}`, 
    },
  };
  
  try {
    const response = await axios.get(baseUrl+"leagues-by-owner", config);
    return response;
  } catch (error) {
    console.error('Error fetching leagues:', error);
  }
};



export {getLeagues,getLeague,getLeagueList}