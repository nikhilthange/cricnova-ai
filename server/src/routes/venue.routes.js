const express = require("express");
const { createVenue } = require("../controllers/venue.controller");

const router = express.Router();

router.post("/", createVenue);

module.exports = router;