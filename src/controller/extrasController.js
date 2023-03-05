import logger from "../config/logger.js";
import tableFeedback from "../db/tableFeedback.js";
import jsonFormatter from "../utils/jsonFormatter.js";

export const extrasController = {
    sendFeedback: async (msg) => {
        logger.info(`@${msg?.chat?.username} id=${msg?.chat?.id} requested sending feedback`)

        try {
            await tableFeedback.create({
                username: msg?.chat?.username,
                userId: msg?.chat?.id,
                message: msg.message.text.substring(10, msg.message.text.length)
            });
            await msg.reply(`\u{2705} Дякуємо за Ваш відгук!`)
            logger.info('Success inserting feedback to database');
        } catch (error) {
            await msg.reply('\u{2757}Помилка операції')
            logger.error('Failed inserting feedback to database');
        }
    },

    getFeedback: async (msg) => {
        logger.info(`@${msg.chat?.username} id=${msg.chat?.id} requested getting feedback`)

        try {
            await tableFeedback.getAll().then(async (feedback) => {
                await msg.replyWithHTML(jsonFormatter(feedback, "feedback"));
                logger.info('Success showing feedback');
            });
        } catch (error) {
            await msg.reply('\u{2757}Помилка бази даних')
            logger.info('Failed showing feedback');
        }
    },
}

export default extrasController;