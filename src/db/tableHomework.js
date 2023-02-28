import db from "../config/db.js";

export const tableHomework = {
    create: async (data) => {
        await db("homework").insert({discipline: data.discipline, homework: data.homework, deadline: data.deadline});
    },

    getAll: async () => {
        return db.select().from("homework");
    }
}

export default tableHomework;