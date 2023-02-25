import axios from "axios";
import config from "./config.js";

export const apiClient = axios.create(
    {
        baseURL: config.apiUrl,
        withCredentials: true,
        responseType: 'json'
    }
)

export default apiClient;
