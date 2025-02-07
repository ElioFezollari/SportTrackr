import axios from 'axios'
const baseUrl = 'http://localhost:5000/v1/user/'



  const getFilteredUsers = async(credentials,leagueId,teamId,name)=>{
    const config = {
      headers: {
        Authorization: `Bearer ${credentials}`, 
      },
    };

    if (isNaN(leagueId)) {
      leagueId = ""; 
    }
  
    if (isNaN(teamId)) {
      teamId = ""; 
    }

    try {
      const response = await axios.get(`${baseUrl}filtered?leagueId=${leagueId}&teamId=${teamId}&name=${name}` , config);
      return response;
    } catch (error) {
    }
  }
  

export {getFilteredUsers}