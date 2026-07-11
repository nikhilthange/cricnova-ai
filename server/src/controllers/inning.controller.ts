const prisma = require("../config/prisma");

const createInning = async (req, res) => {
  try {
    const {
      matchId,
      inningNumber,
      battingTeam,
      bowlingTeam,
      runs,
      wickets,
      overs,
    } = req.body;

    if (!matchId || !inningNumber || !battingTeam || !bowlingTeam) {
      return res.status(400).json({
        success: false,
        message: "matchId, inningNumber, battingTeam and bowlingTeam are required",
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

    const inning = await prisma.inning.create({
      data: {
        matchId,
        inningNumber,
        battingTeam,
        bowlingTeam,
        runs: runs ?? 0,
        wickets: wickets ?? 0,
        overs: overs ?? 0,
      },
    });

    res.status(201).json({
      success: true,
      message: "Inning created successfully",
      data: inning,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create inning",
      error: error.message,
    });
  }
};

const getInningsByMatchId = async (req, res) => {
  try {
    const { matchId } = req.params;

    const innings = await prisma.inning.findMany({
      where: { matchId },
      orderBy: { inningNumber: "asc" },
    });

    res.status(200).json({
      success: true,
      count: innings.length,
      data: innings,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch innings",
      error: error.message,
    });
  }
};

module.exports = {
  createInning,
  getInningsByMatchId,
};