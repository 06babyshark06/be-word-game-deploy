import express from "express";
import Player from "../models/playerModel.js";

const router = express.Router();

router.get("/", async (req, res) => {
    if (!req.user) {
        return res.status(401).json({ error: "You must log in!" });
    }
    const player = await Player.findOne({ userId: req.user._id });
    res.status(200).json(player);
});

router.put("/", async (req, res) => {
    if (!req.user) {
        return res.status(401).json({ error: "You must log in!" });
    }
    const player = await Player.findOneAndUpdate({ userId: req.user._id }, req.body, { new: true });
    res.status(200).json(player);
});

router.post("/", async (req, res) => {
    if (!req.user) {
        return res.status(401).json({ error: "You must log in!" });
    }
    const player = await Player.create({ ...req.body, userId: req.user._id });
    res.status(200).json(player);
});

export default router;