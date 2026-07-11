const express = require("express");
const {
  getLiveMatches,
  getLiveMatchById,
} = require("../controllers/live.controller");

const router = express.Router();

router.get("/", getLiveMatches);
router.get("/:id", getLiveMatchById);

module.exports = router;