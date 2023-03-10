import {createLogger, format, transports} from 'winston';
export const logger = createLogger({
    transports: [
        new transports.File({
            filename: 'bot.log',
            format: format.combine(
                format.timestamp({format: 'MMM-DD-YYYY HH:mm:ss'}),
                format.align(),
                format.printf(info => `${info.level}: ${[info.timestamp]}: ${info.message}`),
            )
        }),
    ]
});

export default logger;
