import axios from 'axios'
const baseUrl = 'http://localhost:5000/v1/league/emp/'


const getDashboardStats = async (credentials) => {
    const config = {
      headers: {
        Authorization: `Bearer ${credentials}`, 
      },
    };
    
    try {
      const response = await axios.get(`${baseUrl}dashboard` , config);
      return response;
    } catch (error) {
      console.error('Error fetching leagues:', error);
    }
  };



export {getDashboardStats}