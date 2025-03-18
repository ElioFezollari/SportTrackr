import axios from 'axios'
const baseUrl = 'http://localhost:5001/v1/team/'

const createTeam = async (formData, token)=> {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  };

  const response = await axios.post(baseUrl, formData, config);
  return response;
  
}

const getTeam = async (id, token)=>{
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    },
  }
  try{
    const response = await axios.get(baseUrl + `/${id}`, config);
    return response
  }catch(e){
    console.log(e);
  }
}

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

const deleteTeam = async (credentials)=>{
  const config = {
    headers : {
      Authorization : `Bearer ${credentials}`,
    },
  }
  try{
    const response = await axios.delete(baseUrl, config);
    return response;
  }catch(e){
    return e;
  }
}

const updateTeam = async (teamId, data, credentials)=>{
  const config = {
    headers : {
      Authorization : `Bearer ${credentials}`,
      "Content-Type": "multipart/form-data",
    },
  }
  try{
    const response = await axios.patch(baseUrl + teamId, data, config);
    return response;
  }catch(e){
    return e;
  }
}
export { getTeamsByLeagueId,getTeamsByLeagueOwner,createTeam, getTeam, deleteTeam, updateTeam};

