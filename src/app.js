import express from "express";
import {Telegraf} from "telegraf";
import config from './config/config.js';
import jsonFormatter from "./utils/jsonFormatter.js";
import {getDateNow, getDatesWeek, getDateTomorrow} from "./utils/getDate.js";
import {getSchedule} from "./controller/crud.js";
import {getMainMenu, weekMenu} from "./keyboards.js";

const app = express();
const bot = new Telegraf(config.botApiToken);

const datesWeek = getDatesWeek()

bot.start((msg) => {
    msg.reply(`Хей\u{1F44B}.\nЯ - бот, що допоможе тобі швидко виводити`
        + ` розклад пар, на які ти не ходиш))) \nСкористайся меню для взаємодії з ботом \u{1F31A}`, getMainMenu());
});

bot.command('info', msg => {
    msg.reply("Цього бота створено для облегшення й так тяжкого життя групи"
        + " КБ-91 \"Кібербезполєзнікі\".\n\nАвтор: @lfistr");
})

bot.command('today', async msg => {
    const date = getDateNow();
    await getSchedule(date).then((schedule) => {
        const message = jsonFormatter(schedule.data);
        msg.reply(message, {parse_mode: "HTML"})
    });
})

bot.command('tomorrow', async msg => {
    const date = getDateTomorrow();
    await getSchedule(date).then((schedule) => {
        const message = jsonFormatter(schedule.data);
        msg.reply(message)
    });
})
bot.hears("Розклад на сьогодні", async msg => {
    const date = getDateNow();
    await getSchedule(date).then((schedule) => {
        const message = jsonFormatter(schedule.data);
        msg.reply(message, {parse_mode: "HTML"})
    });
});

bot.hears("Розклад на завтра", async msg => {
    const date = getDateTomorrow();
    await getSchedule(date).then((schedule) => {
        const message = jsonFormatter(schedule.data);
        msg.reply(message)
    });
});

bot.hears("\u{1F4C5} Розклад на 10 днів", msg => {
    msg.reply("Оберіть дату:", weekMenu(datesWeek));
});

bot.hears(/(?!\/).*/, msg => {
    msg.reply("Хочеш поговорити? \u{1F601}\nПиши @lfistr або йому: https://chat.openai.com/chat");
});

bot.action(datesWeek, async msg => {
    for (const datesWeekElement of datesWeek) {
        if (msg.callbackQuery.data === datesWeekElement) {
            await getSchedule(datesWeekElement).then((schedule) => {
                const message = jsonFormatter(schedule.data);
                msg.reply(message, {parse_mode: "HTML"})
            });
        }
    }
})

bot.launch()
app.listen(3002)
