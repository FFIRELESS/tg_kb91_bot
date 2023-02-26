import {getMainMenu, weekMenu} from "../keyboards.js";
import {getDateNow, getDateTomorrow} from "../utils/getDate.js";
import {getSchedule, getWeather} from "./crud.js";
import jsonFormatter from "../utils/jsonFormatter.js";
import {openai} from "../config/openai.js";
import weatherFormatter from "../utils/weatherFormatter.js";

export const controller = {
    startAlert: async (msg) => {
        await msg.reply("Привіт \u{1F44B}\n\nЯ - бот, що допоможе тобі швидко виводити розклад пар, на які ти не ходиш)))"
            + " А ще я можу працювати з OpenAI та показувати погоду.\nДля перегляду можливих команд введи команду "
            + "/info. \n\nСкористайся меню для взаємодії зі мною \u{1F31A}", getMainMenu());
    },

    botInfo: async (msg) => {
        await msg.replyWithMarkdown("***kBOT-91*** – бот, створений для облегшення й так тяжкого життя групи"
            + " КБ-91 \"Кібербезполєзнікі\".\n\n Для роботи з розкладом занять використовуй меню.\n\n"
            + "***Хочеш нових відчуттів? \u{2764}\u{FE0F}\u{200D}\u{1F525} Спробуй наступні команди OpenAI:***\n"
            + "___!gpt {ваше повідомлення}___ – поговорити з GPT-3;\n" + "___!img {ключові слова}___ – згенерувати зображення.\n\n"
            + "\u{26C5} Для того, щоб дізнатися прогноз погоди в конкретному місті – відправ його геолокацію."
            + "\n\n_*Бот перебуває на стадії розробки, тому деякі функції можуть працювати не так, як очікувалось"
            + " \u{1F921}. Функціонал буде доповнюватися*_.\n\nАвтор: @lfistr");
    },

    scheduleToday: async (msg) => {
        const date = getDateNow();
        await getSchedule(date).then(async (schedule) => {
            const message = jsonFormatter(schedule.data);
            await msg.replyWithHTML(message)
        });
    },

    scheduleTomorrow: async (msg) => {
        const date = getDateTomorrow();
        await getSchedule(date).then(async (schedule) => {
            const message = jsonFormatter(schedule.data);
            await msg.replyWithHTML(message)
        });
    },

    scheduleWeek: async (msg, datesWeek) => {
        await msg.reply("Оберіть дату:", weekMenu(datesWeek));
    },

    scheduleWeekActions: async (msg, datesWeek) => {
        for (const datesWeekElement of datesWeek) {
            if (msg.callbackQuery.data === datesWeekElement) {
                await getSchedule(datesWeekElement).then(async (schedule) => {
                    const message = jsonFormatter(schedule.data);
                    await msg.replyWithHTML(message)
                });
            }
        }
    },

    getLocation: async (msg) => {
        await msg.reply('\u{1F4CD} Надішли геолокацію, в якій хочеш дізнатися погоду');
    },

    sendWeather: async (msg) => {
        try {
            const weather = await getWeather(msg)
            await msg.replyWithMarkdown(weatherFormatter(weather.data));
        } catch (error) {
            console.log(error);
            await msg.reply("\u{2757} Помилка OpenWeather API");
        }
    },

    generateImage: async (msg) => {
        const text = msg.message.text.substring(5, msg.message.text.length);
        const {message_id} = await msg.reply('\u{1F553} Генерація зображення...');
        try {
            const response = await openai.createImage({
                prompt: text,
                n: 1,
                size: "1024x1024",
            });
            await msg.replyWithPhoto({url: response.data.data[0].url});
            await msg.telegram.editMessageText(msg.chat.id, message_id, 0, '\u{2705} Ваше зображення:');
        } catch (error) {
            if (error.response) {
                console.log(error.response.status);
                console.log(error.response.data);
            } else {
                console.log(error.message);
            }
            await msg.reply(`\u{2757} Помилка API OpenAI: ${error.response?.data?.error?.message}`)
        }
    },

    generateText: async (msg) => {
        const text = msg.message.text.substring(5, msg.message.text.length);
        const {message_id} = await msg.reply('\u{1F553} Генерація відповіді...');
        try {
            const response = await openai.createCompletion({
                model: "text-davinci-003",
                prompt: text,
                max_tokens: 1000,
                temperature: 0,
                top_p: 1,
                n: 1,
                stop: "\0",
            });
            await msg.reply(response.data.choices[0].text);
            await msg.telegram.editMessageText(msg.chat.id, message_id, 0, '\u{2705} Готово:');
        } catch (error) {
            if (error.response) {
                console.log(error.response.status);
                console.log(error.response.data);
            } else {
                console.log(error.message);
            }
            await msg.reply(`\u{2757} Помилка API OpenAI: ${error.response?.data?.error?.message}`)
        }
    }
}

export default controller;