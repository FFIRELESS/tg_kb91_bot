import db from "../config/db.js";

export const tableLinks = {
    create: async (data) => {
        await db("discLinks").insert({discipline: data.discipline, link: data.link});
    },

    getAll: async () => {
        return db.select().from("discLinks");
    }
}

export default tableLinks;