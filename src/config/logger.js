import {createLogger, format, transports} from 'winston';
// import PostgresTransport from 'winston-postgres-transport';
// import config from "./app.config.js";

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

        //TODO: possible performance reducing because of:
        // new PostgresTransport({
        //     level: 'info',
        //     postgresUrl: config.dbUrl,
        //     tableName: 'logs'
        // })
    ]
});

export default logger;
