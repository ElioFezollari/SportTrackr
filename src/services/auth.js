import axios from 'axios'
const baseUrl = 'http://localhost:5000/v1/auth/'

const refreshToken = async () => {
  const response = await axios.get(baseUrl + "refresh",{
    withCredentials:true,
  });
  return response.data
}

export default refreshToken