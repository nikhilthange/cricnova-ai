const express = require("express");
const router = express.Router();

const {
  createMatch,
  getAllMatches,
  getMatchById,
  getLiveMatches,
  getUpcomingMatches,
} = require("../controllers/match.controller");

router.get("/live", getLiveMatches);
router.get("/upcoming", getUpcomingMatches);


router.post("/", createMatch);
router.get("/", getAllMatches);
router.get("/:id", getMatchById);

module.exports = router;