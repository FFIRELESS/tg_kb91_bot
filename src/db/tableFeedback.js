import db from "../config/db.js";

export const tableFeedback = {
    create: async (data) => {
        await db("feedback").insert({username: data.username, userId: data.userId, message: data.message});
    },

    getAll: async () => {
        return db.select().from("feedback");
    },

    truncateTable: async () => {
        return db("feedback").truncate();
    },
}

export default tableFeedback;