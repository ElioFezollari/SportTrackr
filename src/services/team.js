import axios from 'axios'
const baseUrl = 'http://localhost:5000/v1/team'

const createTeam = async (formData, token)=> {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  };

  try {
    const response = await axios.post(baseUrl, formData, config);
    return response;
  } catch (error) {
    console.error('Error fetching leagues:', error);
  }
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


export {createTeam, getTeam}