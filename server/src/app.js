require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const morgan = require("morgan");
const connectDB = require("./config/db");

// Connect to Database
connectDB();

const app = express();

// Security Middlewares
app.use(helmet());
app.use(
  cors({
     origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  })
);

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Logging
app.use(morgan("dev"));

// Body Parser
app.use(express.json());

// Basic Routes
app.get("/", (req, res) => {
  res.json({ message: "CricNova AI backend running 🚀" });
});

app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "CricNova AI backend is healthy",
  });
});

// Import Routes
const authRoutes = require("./routes/auth.routes");
app.use("/api/auth", authRoutes);

// Error Handler Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Server Error",
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
});

module.exports = app;