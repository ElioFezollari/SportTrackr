import axios from 'axios'
const baseUrl = 'http://localhost:5000/v1/user/'

const getUserProfile = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    },
  }
  try{
    const response = await axios.get(baseUrl, config);
    return response
  }catch(e){
    return e;
  }
}

const getUser = async (id, token)=>{
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    },
  }
  try{
    const response = await axios.get(baseUrl + `${id}`, config);
    return response
  }catch(e){
    console.log(e);
  }
}

const toggleProfileVisibility = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    },
  }
  try{
    const response = await axios.post(baseUrl + 'toggle-visibility',{}, config);
    return response
  }catch(e){
    return e;
  }
}

const updateUserName = async (token, data) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    },
  }
  try{
    const response = await axios.put(baseUrl + 'update',data, config);
    return response
  }catch(e){
    return e;
  }
}

const updatePassword = async (token, data) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    },
  }
  try{
    const response = await axios.put(baseUrl + 'update-pass',data, config);
    return response
  }catch(e){
    return e;
  }
}

const uploadProfilePhoto = async (formData, token)=> {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  };

  const response = await axios.post(baseUrl + 'upload-photo', formData, config);
  return response;
  
}

export {getUserProfile, getUser, toggleProfileVisibility, updateUserName, updatePassword, uploadProfilePhoto}