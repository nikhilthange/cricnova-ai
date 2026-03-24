const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Routes
const matchRoutes = require("./routes/match.routes");
const playerRoutes = require("./routes/player.routes");
const teamRoutes = require("./routes/team.routes");

// Middleware
app.use(express.json());

const allowedOrigins = [
  "http://localhost:3000",
  "https://cricnova-ai.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

// Test route
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "CricNova backend is running",
  });
});

// API routes
app.use("/api/matches", matchRoutes);
app.use("/api/players", playerRoutes);
app.use("/api/teams", teamRoutes);

// 404 route
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});