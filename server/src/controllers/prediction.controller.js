const prisma = require("../config/prisma");

const createPrediction = async (req, res) => {
  try {
    const {
      matchId,
      predictedWinner,
      homeWinProbability,
      awayWinProbability,
      projectedTotal,
      topScorer,
      topWicketTaker,
      confidence,
    } = req.body;

    if (!matchId) {
      return res.status(400).json({
        success: false,
        message: "matchId is required",
      });
    }

    const match = await prisma.match.findUnique({
      where: { id: matchId },
    });

    if (!match) {
      return res.status(404).json({
        success: false,
        message: "Match not found",
      });
    }

    const prediction = await prisma.prediction.create({
      data: {
        matchId,
        predictedWinner,
        homeWinProbability,
        awayWinProbability,
        projectedTotal,
        topScorer,
        topWicketTaker,
        confidence,
      },
    });

    res.status(201).json({
      success: true,
      message: "Prediction created successfully",
      data: prediction,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create prediction",
      error: error.message,
    });
  }
};

const getPredictionsByMatchId = async (req, res) => {
  try {
    const { matchId } = req.params;

    const predictions = await prisma.prediction.findMany({
      where: { matchId },
      orderBy: { createdAt: "desc" },
    });

    res.status(200).json({
      success: true,
      count: predictions.length,
      data: predictions,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch predictions",
      error: error.message,
    });
  }
};

module.exports = {
  createPrediction,
  getPredictionsByMatchId,
};