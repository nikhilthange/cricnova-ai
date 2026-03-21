const express = require("express");
const {
  createTeam,
  getAllTeams,
  getTeamById,
} = require("../controllers/team.controller");

const router = express.Router();

router.post("/", createTeam);
router.get("/", getAllTeams);
router.get("/:id", getTeamById);

module.exports = router;