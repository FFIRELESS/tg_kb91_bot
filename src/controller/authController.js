import passwordHasher from "../utils/passwordHasher.js";
import config from "../config/app.config.js";

export const authController = {
    checkPassword: (plainPassword, hash) =>
        hash === passwordHasher(plainPassword, config.salt),
}

export default authController;