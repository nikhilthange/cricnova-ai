const express = require("express");
const cors = require("cors");

const teamRoutes = require("./routes/team.routes");
const playerRoutes = require("./routes/player.routes");
const tournamentRoutes = require("./routes/tournament.routes");
const venueRoutes = require("./routes/venue.routes");
const matchRoutes = require("./routes/match.routes");
const predictionRoutes = require("./routes/prediction.routes");
const inningRoutes = require("./routes/inning.routes");
const teamStatRoutes = require("./routes/teamStat.routes");
const playerStatRoutes = require("./routes/playerStat.routes");
const liveRoutes = require("./routes/live.routes");
const upcomingPredictionRoutes = require("./routes/upcomingPrediction.routes");


const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "CricNova AI backend running 🚀" });
});
app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "CricNova AI backend is healthy",
  });
});
app.use("/api/teams", teamRoutes);
app.use("/api/players", playerRoutes);
app.use("/api/tournaments", tournamentRoutes);
app.use("/api/venues", venueRoutes);
app.use("/api/matches", matchRoutes);
app.use("/api/predictions", predictionRoutes);
app.use("/api/innings", inningRoutes);
app.use("/api/team-stats", teamStatRoutes);
app.use("/api/player-stats", playerStatRoutes);
app.use("/api/live", liveRoutes);
app.use("/api/upcoming-prediction", upcomingPredictionRoutes);

module.exports = app;