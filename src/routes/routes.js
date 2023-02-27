import express from "express";
import db from "../config/db.js";

const router = express.Router();

router.get("/", async (req, res) => {
    res.send(await db.select().from("logs"));
});

export default router;