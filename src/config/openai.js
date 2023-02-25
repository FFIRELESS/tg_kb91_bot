import {Configuration, OpenAIApi} from "openai";
import config from "./app.config.js";

const configuration = new Configuration({
    apiKey: config.openAiToken,
});
export const openai = new OpenAIApi(configuration);