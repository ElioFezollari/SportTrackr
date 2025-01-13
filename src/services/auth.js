import axios from 'axios'
const baseUrl = 'http://localhost:5000/v1/auth/'


const register = async(credentials)=>{
  const response = await axios.post(baseUrl + "register",credentials,{
    withCredentials:true
  })
  console.log(response)
  return response
}

const login = async (credentials) =>{
  const response = await axios.post(baseUrl + "login",credentials,{
    withCredentials:true
  })
  return response
}
const refreshToken = async () => {
  const response = await axios.get(baseUrl + "refresh",{
    withCredentials:true,
  });
  return response.data
}


export {login,refreshToken,register}