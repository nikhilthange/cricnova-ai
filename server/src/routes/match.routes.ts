const express = require("express");
const router = express.Router();

const {
  getAllMatches,
  getMatchById,
  getLiveMatches,
  getUpcomingMatches,
  getMatchInfoById,
  getMatchScorecardById,
} = require("../controllers/match.controller");

router.get("/live", getLiveMatches);
router.get("/upcoming", getUpcomingMatches);

router.get("/", getAllMatches);
router.get("/info/:id", getMatchInfoById);
router.get("/scorecard/:id", getMatchScorecardById);
router.get("/:id", getMatchById);

module.exports = router;