import express from "express";
import {Telegraf} from "telegraf";
import config from './config/app.config.js';
import {getDatesWeek} from "./utils/getDate.js";
import controller from "./controller/controller.js";

const app = express();
const bot = new Telegraf(config.botApiToken, {handlerTimeout: 9_000_000});

const datesWeek = getDatesWeek()

bot.start(controller.startAlert);
bot.command('info', controller.botInfo)
bot.command('today', controller.scheduleToday)
bot.command('tomorrow', controller.scheduleTomorrow)

bot.hears("Розклад на сьогодні", controller.scheduleToday);
bot.hears("Розклад на завтра", controller.scheduleTomorrow);
bot.hears("\u{1F4C5} Розклад на 10 днів", async msg => {
    await controller.scheduleWeek(msg, datesWeek);
});
bot.hears("\u{26C5} Погода", controller.getLocation);
bot.hears(/(!img\s).*/, controller.generateImage);
bot.hears(/(!gpt\s).*/, controller.generateText);

bot.on('location', controller.sendWeather);

bot.action(datesWeek, async msg => {
    await controller.scheduleWeekActions(msg, datesWeek);
});

bot.launch().then(() => {
});
app.listen(config.appPort, () => {
    console.log(`App started at port: ${config.appPort}`)
});
