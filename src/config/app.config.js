export const config = {
    appPort: process.env.APP_PORT,
    dbUrl: process.env.DB_URL,
    dbHost: process.env.DB_HOST,
    dbPort: process.env.DB_PORT,
    dbUser: process.env.DB_USER,
    dbPassword: process.env.DB_PASSWORD,
    dbDatabase: process.env.DB_DATABASE,
    botApiToken: process.env.BOT_API_TOKEN,
    apiUrl: process.env.API_URL,
    openAiToken: process.env.OPENAI_TOKEN,
    weatherToken: process.env.WEATHER_TOKEN,
    groupId: process.env.GROUP_ID,
    salt: process.env.SALT
}

export default config;