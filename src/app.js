import express from "express";
import {Telegraf} from "telegraf";
import config from './config/app.config.js';
import {getDatesWeek} from "./utils/getDate.js";
import scheduleController from "./controller/scheduleController.js";
import logger from "./config/logger.js";
import textController from "./controller/textController.js";
import weatherController from "./controller/weatherController.js";
import openAIController from "./controller/openAIController.js";
import {extrasController} from "./controller/extrasController.js";

const app = express();
const bot = new Telegraf(config.botApiToken, {handlerTimeout: 9_000_000});

const datesWeek = getDatesWeek()

bot.start(textController.startAlert);
bot.command('info', textController.botInfo)
bot.command('today', scheduleController.scheduleToday)
bot.command('tomorrow', scheduleController.scheduleTomorrow)

bot.hears("Розклад на сьогодні", scheduleController.scheduleToday);
bot.hears("Розклад на завтра", scheduleController.scheduleTomorrow);
bot.hears("\u{1F4C5} Розклад на 10 днів", async msg => {
    await scheduleController.scheduleWeek(msg, datesWeek);
});
bot.hears("\u{26C5} Погода", weatherController.getLocation);
bot.hears(/(!img\s).*/, openAIController.generateImage);
bot.hears(/(!gpt\s).*/, openAIController.generateText);
bot.hears(/(!feedback\s).*/, extrasController.sendFeedback);

bot.on('location', weatherController.sendWeather);

bot.action(datesWeek, async msg => {
    await scheduleController.scheduleWeekActions(msg, datesWeek);
});

logger.info('Bot started');

bot.launch().then(() => {
    logger.info('Bot finished');
});
app.listen(config.appPort, () => {
    console.log(`App started at port: ${config.appPort}`);
    logger.info(`Server started at port ${config.appPort}`);
});
