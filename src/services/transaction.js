import axios from 'axios'
const baseUrl = 'http://localhost:5001/v1/transaction'

const getLeagueOwnerTransactions = async (token)=>{
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      },
    }
    try{
      const response = await axios.get(baseUrl, config);
      return response
    }catch(e){
      console.log(e);
    }
  }

export {getLeagueOwnerTransactions}