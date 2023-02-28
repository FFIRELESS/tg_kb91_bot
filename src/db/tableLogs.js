import db from "../config/db.js";

export const tableLogs = {
    getAll: async () => {
        return db.select().from("logs");
    }
}

export default tableLogs;