import logger from "../config/logger.js";
import fs from 'fs';
import * as path from "path";

export const extrasController = {
    sendFeedback: async (msg) => {
        logger.info(`@${msg.chat?.username} id=${msg.chat?.id} requested sending feedback`)
        const text = `[${new Date().toISOString()}] @${msg.chat?.username ? msg.chat.username : msg.chat.id}: ` +
            `${msg.message.text.substring(10, msg.message.text.length)}\n`;
        const __dirname = path.dirname(new URL(import.meta.url).pathname);

        fs.appendFile(`${__dirname}/../../feedback.txt`, text, async (err) => {
            if (err) {
                await msg.reply('\u{2757}Помилка операції')
                logger.error('Failed sending feedback');
            } else {
                await msg.reply(`\u{2705} Дякуємо за Ваш відгук!`)
                logger.info('Success sending feedback');
            }
        });
    }
}