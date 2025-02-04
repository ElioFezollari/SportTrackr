import axios from 'axios'
const baseUrl = 'http://localhost:5000/v1/auth/'


const register = async(credentials,token)=>{
  const response = await axios.post(baseUrl + "register/" + token,credentials,{
    withCredentials:true
  })
  return response
}

const login = async (credentials) =>{
  const response = await axios.post(baseUrl + "login",credentials,{
    withCredentials:true
  })
  return response
}

const logout = async () => {
  try {
    const response = await axios.post(baseUrl + 'logout', {}, { withCredentials: true });
    return response;
  } catch (error) {
    return error.response || { status: 500, message: "Internal error" };
  }
};
const refreshToken = async () => {
  const response = await axios.get(baseUrl + "refresh",{
    withCredentials:true,
  });
  return response.data
}


export {login,refreshToken,register,logout}