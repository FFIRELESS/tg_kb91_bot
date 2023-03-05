import {getMainMenu} from "../keyboards.js";
import logger from "../config/logger.js";

export const textController = {
    startAlert: async (msg) => {
        logger.info(`@${msg.chat?.username} id=${msg.chat?.id} requested /start command`);
        await msg.reply("Привіт \u{1F44B}\n\nЯ - бот, що допоможе тобі швидко виводити розклад пар, на які ти не ходиш)))"
            + " А ще я можу працювати з OpenAI та показувати погоду.\nДля перегляду можливих команд введи команду "
            + "/info. \n\nСкористайся меню для взаємодії зі мною \u{1F31A}", getMainMenu());
    },

    botInfo: async (msg) => {
        logger.info(`@${msg.chat?.username} id=${msg.chat?.id} requested /info command`)
        await msg.replyWithMarkdown("***kBOT-91*** – бот, створений для облегшення й так тяжкого життя групи"
            + " КБ-91 \"Кібербезполєзнікі\".\n\nДля роботи з розкладом занять використовуй меню.\n\n"
            + "***Хочеш нових відчуттів? \u{2764}\u{FE0F}\u{200D}\u{1F525} Спробуй наступні команди OpenAI:***\n"
            + "___!gpt {ваше повідомлення}___ – поговорити з GPT-3;\n" + "___!img {ключові слова}___ – згенерувати "
            + "зображення з DALL•E•2.\n\n"
            + "\u{26C5} Для того, щоб дізнатися прогноз погоди в конкретному місті – відправ його геолокацію (не текстом!)."
            + "\n\n_\*Бот перебуває на стадії розробки, тому деякі функції можуть працювати не так, як очікувалось"
            + " \u{1F921}. Функціонал буде доповнюватися_.\n\nПовідомити про проблему або побажати розробнику "
            + "гарного дня:\n___!feedback {текст повідомлення}___\n\nАвтор: \@lfistr", getMainMenu());
    },
}

export default textController;