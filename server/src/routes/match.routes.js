const express = require("express");
const {
  createMatch,
  getAllMatches,
  getMatchById,
} = require("../controllers/match.controller");

const router = express.Router();

router.post("/", createMatch);
router.get("/", getAllMatches);
router.get("/:id", getMatchById);

module.exports = router;