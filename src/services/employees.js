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

    try {
      const response = await axios.get(`${baseUrl}filtered?league=${leagueId}&role=${roleId}&name=${name}` , config);
      return response;
    } catch (error) {
    }
  }
  const addEmployee = async (credentials, email, roleId, leagueId) => {
    const config = {
      headers: {
        Authorization: `Bearer ${credentials}`, 
      },
    };

    const data = {
      email: email,
      role: roleId,
    };
  
    try {
      const response = await axios.post(`${baseUrl}${leagueId}`, data, config);
      return response;
    } catch (error) {
    }
  };


export {getDashboardStats,getFilteredEmployees,addEmployee}