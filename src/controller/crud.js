import apiClient from "../config/axios.js";
import config from "../config/app.config.js";

export const getSchedule = async (dateNow) => {
    return await apiClient.get(`${config.apiUrl}method=getSchedules&id_grp=1002071&id_fio=0&id_aud=0&date_beg=${dateNow}&date_end=${dateNow}`);
}

export const getWeather = async (msg) => {
    return await apiClient.get(`https://openweathermap.org/data/2.5/weather?lat=${msg.message.location.latitude}&lon=${msg.message.location.longitude}&appid=${config.weatherToken}`)
}