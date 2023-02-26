import {weekMenu} from "../keyboards.js";
import {getDateNow, getDateTomorrow} from "../utils/getDate.js";
import {getSchedule} from "./crud.js";
import jsonFormatter from "../utils/jsonFormatter.js";
import logger from "../config/logger.js";

export const scheduleController = {
    scheduleToday: async (msg) => {
        logger.info(`@${msg.chat?.username} id=${msg.chat?.id} requested schedule for today`)
        const date = getDateNow();
        try {
            await getSchedule(date).then(async (schedule) => {
                const message = jsonFormatter(schedule.data);
                await msg.replyWithHTML(message)
                logger.info('Success schedule showing for today');
            });
        } catch (error) {
            await msg.reply('\u{2757}Помилка SSU API')
            logger.error('Schedule API error');
            logger.info('Failed schedule showing for today');
        }
    },

    scheduleTomorrow: async (msg) => {
        logger.info(`@${msg.chat?.username} id=${msg.chat?.id} requested schedule for tomorrow`)
        const date = getDateTomorrow();
        try {
            await getSchedule(date).then(async (schedule) => {
                const message = jsonFormatter(schedule.data);
                await msg.replyWithHTML(message)
                logger.info('Success schedule showing for tomorrow');
            });
        } catch (error) {
            await msg.reply('\u{2757}Помилка SSU API')
            logger.error('Schedule API error');
            logger.info('Failed schedule showing for tomorrow');
        }
    },

    scheduleWeek: async (msg, datesWeek) => {
        logger.info(`@${msg.chat?.username} id=${msg.chat?.id} requested schedule for 10 days`)
        await msg.reply("Оберіть дату:", weekMenu(datesWeek));
    },

    scheduleWeekActions: async (msg, datesWeek) => {
        for (const datesWeekElement of datesWeek) {
            if (msg.callbackQuery.data === datesWeekElement) {
                try {
                    await getSchedule(datesWeekElement).then(async (schedule) => {
                        const message = jsonFormatter(schedule.data);
                        await msg.replyWithHTML(message)
                        logger.info('Success schedule showing for 10 days');
                    });
                } catch (error) {
                    await msg.reply('\u{2757}Помилка SSU API')
                    logger.error('Schedule API error');
                    logger.error('Failed schedule showing for 10 days');
                }
            }
        }
    },
}

export default scheduleController;