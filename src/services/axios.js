import axios from 'axios'
const baseUrl = 'http://localhost:5001'

export const axiosPrivate = axios.create({
    baseURL:baseUrl,
    headers:{'Content-Type':'application/json'},
    withCredentials:true
})