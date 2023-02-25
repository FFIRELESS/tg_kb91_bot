import apiClient from "../config/axios.js";
import config from "../config/config.js";

export const getSchedule = async (dateNow) => {
    return await apiClient.get(`${config.apiUrl}method=getSchedules&id_grp=1002071&id_fio=0&id_aud=0&date_beg=${dateNow}&date_end=${dateNow}`);
}