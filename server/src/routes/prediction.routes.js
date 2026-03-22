const express = require("express");
const {
  createPrediction,
  getPredictionsByMatchId,
  getAllPredictions,
} = require("../controllers/prediction.controller");

const router = express.Router();

router.get("/", getAllPredictions);
router.post("/", createPrediction);
router.get("/match/:matchId", getPredictionsByMatchId);

module.exports = router;