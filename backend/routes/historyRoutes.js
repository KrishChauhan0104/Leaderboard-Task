const express = require("express");
const router = express.Router();
const History = require("../models/History");

router.get("/", async (req, res) => {
  try {
    const history = await History.find()
      .populate("userId", "name")
      .sort({ claimedAt: -1 });
    res.json(history);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch history" });
  }
});

module.exports = router;
