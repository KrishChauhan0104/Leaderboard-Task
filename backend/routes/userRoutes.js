const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.get("/", userController.getUsers);
router.post("/add", userController.addUser);
router.post("/claim", userController.claimPoints);
router.get("/leaderboard", userController.getLeaderboard);

module.exports = router;
