const express = require("express");
const {
  createPrediction,
  getPredictionsByMatchId,
} = require("../controllers/prediction.controller");

const router = express.Router();

router.post("/", createPrediction);
router.get("/match/:matchId", getPredictionsByMatchId);

module.exports = router;