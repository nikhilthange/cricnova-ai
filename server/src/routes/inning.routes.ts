const express = require("express");
const {
  createInning,
  getInningsByMatchId,
} = require("../controllers/inning.controller");

const router = express.Router();

router.post("/", createInning);
router.get("/match/:matchId", getInningsByMatchId);

module.exports = router;