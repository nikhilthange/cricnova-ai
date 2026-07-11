const express = require("express");
const { createTournament } = require("../controllers/tournament.controller");

const router = express.Router();

router.post("/", createTournament);

module.exports = router;