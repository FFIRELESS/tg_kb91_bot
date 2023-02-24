const TelegramBot = require('node-telegram-bot-api');
const config = require("./config/config");
const axios = require("./config/axios");
const jsonFormatter = require("./utils/jsonFormatter");
const { getDateNow, getDateTomorrow} = require("./utils/getDate");

const getSchedule = async (dateNow) => {
    return await axios.get(`${config.apiUrl}method=getSchedules&id_grp=1002071&id_fio=0&id_aud=0&date_beg=${dateNow}&date_end=${dateNow}`);
}

const bot = new TelegramBot(config.botApiToken, { polling: true });

bot.onText(/\/start/, (msg) => {
    bot.sendMessage(msg.chat.id, `Хей\u{1F44B}.\nЯ - бот, що допоможе тобі швидко виводити розклад пар, на які ти не ходиш))) \nДля того, щоб вивести розклад на сьогодні, введи /today.`);
});

bot.onText(/\/today/, async (msg) => {
    const date = getDateNow();
    await getSchedule(date).then((schedule) => {
        const message = jsonFormatter(schedule.data);
        bot.sendMessage(msg.chat.id, message, { parse_mode: "HTML" })
    });
});

bot.onText(/\/tomorrow/, async (msg) => {
    const date = getDateTomorrow();
    await getSchedule(date).then((schedule) => {
        const message = jsonFormatter(schedule.data);
        bot.sendMessage(msg.chat.id, message)
    });
});

// bot.on('message', (msg) => {
//     bot.sendMessage(msg.chat.id, "Не намагайся мені щось писати, поговори краще з https://chat.openai.com/chat");
// });
