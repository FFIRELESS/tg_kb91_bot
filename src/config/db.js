import config from "./app.config.js";
import knex from "knex";

export const db = knex({
    client: "pg",
    connection: {
        port: config.dbPort,
        host: config.dbHost,
        user: config.dbUser,
        password: config.dbPassword,
        database: config.dbDatabase,
    },
});

export default db;