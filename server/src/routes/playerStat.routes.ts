

const express = require("express");
const { createPlayerStat } = require("../controllers/playerStat.controller");

const router = express.Router();

router.post("/", createPlayerStat);

module.exports = router;