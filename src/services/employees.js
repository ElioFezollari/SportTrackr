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
      console.error('Error fetching employees:', error);
    }
  };

  const getFilteredEmployees = async(credentials,leagueId,roleId,name)=>{
    const config = {
      headers: {
        Authorization: `Bearer ${credentials}`, 
      },
    };

    if (isNaN(leagueId)) {
      leagueId = ""; 
    }
  
    if (isNaN(roleId)) {
      roleId = ""; 
    }

    console.log(`${baseUrl}filtered?league=${leagueId}&role=${roleId}&name=${name}`)
    try {
      const response = await axios.get(`${baseUrl}filtered?league=${leagueId}&role=${roleId}&name=${name}` , config);
      return response;
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  }



export {getDashboardStats,getFilteredEmployees}