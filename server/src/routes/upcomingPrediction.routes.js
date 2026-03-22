const express = require("express");
const {
  getUpcomingPredictionByMatchId,
} = require("../controllers/upcomingPrediction.controller");

const router = express.Router();

router.get("/:matchId", getUpcomingPredictionByMatchId);

module.exports = router;