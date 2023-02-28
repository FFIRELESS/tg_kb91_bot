import express from "express";
import tableLogs from "../db/tableLogs.js";
import tableFeedback from "../db/tableFeedback.js";

const router = express.Router();

router.get("/logs", async (req, res) => {
    res.send(await tableLogs.getAll());
});

router.get("/feedback", async (req, res) => {
    res.send(await tableFeedback.getAll());
});

export default router;