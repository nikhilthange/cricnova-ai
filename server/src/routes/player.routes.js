const express = require("express");
const {
  createPlayer,
  getAllPlayers,
  getPlayerById,
} = require("../controllers/player.controller");

const router = express.Router();

router.post("/", createPlayer);
router.get("/", getAllPlayers);
router.get("/:id", getPlayerById);

module.exports = router;