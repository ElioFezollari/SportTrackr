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
      console.log(response);
      return response;
    } catch (error) {
      console.error('Error fetching leagues:', error);
    }
  };



export {getLeagues}