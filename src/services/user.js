import axios from 'axios'
const baseUrl = 'http://localhost:5001/v1/user'

const getUser = async (id, token)=>{
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

export {getUser}