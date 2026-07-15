const express = require("express");
const router = express.Router();
const cricketApi = require("../services/cricketApi.service");

// Fallback series ID for the current major tournament if not provided.
// Currently hardcoding a popular series for the demo (e.g. T20 World Cup or IPL).
// Note: To make this dynamic, you'd fetch /series first and pick one.
const DEFAULT_SERIES_ID = "c75f8952-74d4-416f-b7b4-7da4b4e3ae6e"; 

router.get("/standings", async (req, res, next) => {
  try {
    const seriesId = req.query.id || DEFAULT_SERIES_ID;
    const apiResponse = await cricketApi.getSeriesStandings(seriesId);
    
    if (!apiResponse || !apiResponse.data) {
      return res.json([]);
    }

    // CricAPI returns an array of standings
    const standings = apiResponse.data.map((team: any, index: number) => ({
      rank: index + 1,
      team: team.teamname || team.teamName,
      code: team.shortname || (team.teamname ? team.teamname.substring(0, 3).toUpperCase() : "TBD"),
      logo: team.img || "🏏",
      matches: team.matches || 0,
      won: team.wins || 0,
      lost: team.loss || 0,
      tied: team.ties || 0,
      nrr: team.nr || "+0.000",
      points: team.points || 0
    }));

    res.json(standings);
  } catch (error) {
    console.error("CricAPI Error (Standings):", error);
    next(error);
  }
});

module.exports = router;
