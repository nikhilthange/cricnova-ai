const express = require("express");
const { createTeamStat } = require("../controllers/teamStat.controller");

const router = express.Router();

router.post("/", createTeamStat);

module.exports = router;