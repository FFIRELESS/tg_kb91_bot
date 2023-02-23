const TelegramBot = require('node-telegram-bot-api');
const {botApiToken, apiUrl} = require("./config/config");
const axios = require("./config/axios");
const formatter = require("./utils/jsonFormatter");

const getSchedule = async () => {
    return await axios.get(`${apiUrl}method=getSchedules&id_grp=1002071&id_fio=0&id_aud=0&date_beg=24.02.2023&date_end=24.02.2023`);
}

// Создаем объект бота
const bot = new TelegramBot(botApiToken, {polling: true});

// Обработчик команды /start
bot.onText(/\/start/, (msg) => {
    bot.sendMessage(msg.chat.id, 'Привет! Я могу показать тебе погоду в любом городе. Просто отправь мне название города.');
});

bot.onText(/\/today/, async (msg) => {
    await getSchedule().then((schedule) => {
        const message = formatter(schedule.data);
        console.log(formatter(schedule.data))
        bot.sendMessage(msg.chat.id, message, { parse_mode: 'markdown' })
    });
});

// // Обработчик сообщений от пользователя
// bot.on('message', (msg) => {
//     const chatId = msg.chat.id;
//     const city = msg.text;
//     getWeather(city, chatId);
// });
