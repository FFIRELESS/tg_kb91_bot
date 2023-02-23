const axios = require("axios");
const { apiUrl } = require("./config");

module.exports = axios.create(
    {
        baseURL: apiUrl,
        withCredentials: true,
        responseType: 'json'
    }
)
