let axios = require('axios')
let config = {
    // baseURL: process.env.baseURL || process.env.apiUrl || "http://localhost:3001",
    timeout: 3 * 1000, // Timeout
    withCredentials: true // Check cross-site Access-Control
}

const axiosInstance = axios.create(config)
const formDataAxios =axios.create({
    timeout: 3 * 1000, // Timeout
    withCredentials: true, // Check cross-site Access-Control,,
    headers:{ 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
    transformRequest : [function (data) {
        let ret = ''
        for (let it in data) {
          ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
        }
        return ret
    }]

})
module.exports={axiosInstance,formDataAxios}