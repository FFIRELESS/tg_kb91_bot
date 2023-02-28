import {weekMenu} from "../keyboards.js";
import {getDateNow, getDateTomorrow} from "../utils/getDate.js";
import apiController from "./apiController.js";
import jsonFormatter from "../utils/jsonFormatter.js";
import logger from "../config/logger.js";
import tableHomework from "../db/tableHomework.js";
import JsonFormatter from "../utils/jsonFormatter.js";
import tableLinks from "../db/tableLinks.js";

export const scheduleController = {
    scheduleToday: async (msg) => {
        logger.info(`@${msg.chat?.username} id=${msg.chat?.id} requested schedule for today`)
        const date = getDateNow();
        try {
            await apiController.getSchedule(date).then(async (schedule) => {
                const message = jsonFormatter(schedule.data, "schedule");
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
            await apiController.getSchedule(date).then(async (schedule) => {
                const message = jsonFormatter(schedule.data, "schedule");
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
                    await apiController.getSchedule(datesWeekElement).then(async (schedule) => {
                        const message = jsonFormatter(schedule.data, "schedule");
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

    addHomework: async (msg) => {
        logger.info(`@${msg.chat?.username} id=${msg.chat?.id} requested adding homework`)
        const query = msg.message.text.substring(8, msg.message.text.length);
        const fieldValueArray = query.split('&');
        let data = {
            discipline: fieldValueArray[0].split("=")[1],
            homework: fieldValueArray[1].split("=")[1],
            deadline: fieldValueArray[2].split("=")[1],
        };

        try {
            await tableHomework.create(data).then(async () => {
                await msg.reply("\u{2705} ДЗ додано!");
                logger.info('Success adding homework');
            });
        } catch (error) {
            await msg.reply('\u{2757}Помилка бази даних')
            logger.info('Failed adding homework');
        }
    },

    getHomework: async (msg) => {
        logger.info(`@${msg.chat?.username} id=${msg.chat?.id} requested homework`)

        try {
            await tableHomework.getAll().then(async (homework) => {
                const message = JsonFormatter(homework, "homework");
                await msg.replyWithHTML(message);
                logger.info('Success showing homework');
            });
        } catch (error) {
            await msg.reply('\u{2757}Помилка бази даних')
            logger.info('Failed showing homework');
        }
    },

    addLink: async (msg) => {
        logger.info(`@${msg.chat?.username} id=${msg.chat?.id} requested adding discipline link`)
        const query = msg.message.text.substring(9, msg.message.text.length);
        const fieldValueArray = query.split('&');
        let data = {
            discipline: fieldValueArray[0].split("=")[1],
            link: fieldValueArray[1].split("=")[1],
        };

        try {
            await tableLinks.create(data).then(async () => {
                await msg.reply("\u{2705} Посилання додано!");
                logger.info('Success discipline link');
            });
        } catch (error) {
            await msg.reply('\u{2757}Помилка бази даних')
            logger.info('Failed discipline link');
        }
    },

    getLinks: async (msg) => {
        logger.info(`@${msg.chat?.username} id=${msg.chat?.id} requested discipline links`)

        try {
            await tableLinks.getAll().then(async (links) => {
                const message = JsonFormatter(links, "links");
                await msg.replyWithHTML(message);
                logger.info('Success discipline links');
            });
        } catch (error) {
            console.log(error)
            await msg.reply('\u{2757}Помилка бази даних')
            logger.info('Failed discipline links');
        }
    },
}

export default scheduleController;