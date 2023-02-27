import {openai} from "../config/openai.js";
import logger from "../config/logger.js";

export const openAIController = {
    generateImage: async (msg) => {
        logger.info(`OpenAI DALL-E-2: @${msg.chat?.username} id=${msg.chat?.id} initiated generating image`);

        const text = msg.message.text.substring(5, msg.message.text.length);
        const {message_id} = await msg.reply('\u{1F553} Генерація зображення...');
        try {
            const response = await openai.createImage({
                prompt: text,
                n: 1,
                size: "1024x1024",
            });
            await msg.replyWithPhoto({url: response.data.data[0].url});
            await msg.telegram.editMessageText(msg.chat.id, message_id, 0, '\u{2705} Готово!');
            logger.info(`Generating image success`);
        } catch (error) {
            logger.error(`OpenAI DALL-E-2 error: ${error.response?.data?.error?.message}`);
            await msg.telegram.editMessageText(msg.chat.id, message_id, 0, '\u{1F6AB} Провал');
            await msg.reply(`\u{2757} Помилка API OpenAI: ${error.response?.data?.error?.message}`)
        }
    },

    generateText: async (msg) => {
        logger.info(`OpenAI GPT-3: @${msg.chat?.username} id=${msg.chat?.id} initiated generating text`);

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
            await msg.telegram.editMessageText(msg.chat.id, message_id, 0, '\u{2705} Готово!');
            logger.info(`Generating text success`);
        } catch (error) {
            logger.error(`OpenAI GPT-3 error: ${error.response?.data?.error?.message}`);
            await msg.telegram.editMessageText(msg.chat.id, message_id, 0, '\u{1F6AB} Провал');
            await msg.reply(`\u{2757} Помилка API OpenAI: ${error.response?.data?.error?.message}`)
        }
    }
}

export default openAIController;