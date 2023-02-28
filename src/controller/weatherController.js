import apiController from "./apiController.js";
import weatherFormatter from "../utils/weatherFormatter.js";
import logger from "../config/logger.js";

export const weatherController = {
    getLocation: async (msg) => {
        await msg.reply('\u{1F4CD} Надішли геолокацію, в якій хочеш дізнатися погоду');
    },

    sendWeather: async (msg) => {
        try {
            logger.info(`@${msg.chat?.username} id=${msg.chat?.id} requested weather forecast`)
            const weather = await apiController.getWeather(msg)
            await msg.replyWithMarkdown(weatherFormatter(weather.data));
            logger.info('Success getting the weather forecast');
        } catch (error) {
            await msg.reply("\u{2757} Помилка OpenWeather API");
            logger.error('Failed getting the weather forecast');
        }
    }
}

export default weatherController;
