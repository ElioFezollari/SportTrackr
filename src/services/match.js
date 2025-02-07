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



export {getMatch}