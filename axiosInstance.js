let axios = require('axios')
let config = {
    // baseURL: process.env.baseURL || process.env.apiUrl || "http://localhost:3001",
    timeout: 60 * 1000, // Timeout
    withCredentials: true // Check cross-site Access-Control
}

const axiosInstance = axios.create(config)
module.exports=axiosInstance