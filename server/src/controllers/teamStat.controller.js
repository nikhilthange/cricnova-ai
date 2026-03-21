const prisma = require("../config/prisma");

const createTeamStat = async (req, res) => {
  try {
    const {
      matchId,
      teamId,
      totalRuns,
      totalWicketsLost,
      oversPlayed,
      runRate,
      wicketsTaken,
    } = req.body;

    if (!matchId || !teamId) {
      return res.status(400).json({
        success: false,
        message: "matchId and teamId are required",
      });
    }

    const [match, team] = await Promise.all([
      prisma.match.findUnique({ where: { id: matchId } }),
      prisma.team.findUnique({ where: { id: teamId } }),
    ]);

    if (!match || !team) {
      return res.status(404).json({
        success: false,
        message: "Match or Team not found",
      });
    }

    const stat = await prisma.teamMatchStat.create({
      data: {
        matchId,
        teamId,
        totalRuns: totalRuns ?? 0,
        totalWicketsLost: totalWicketsLost ?? 0,
        oversPlayed: oversPlayed ?? 0,
        runRate: runRate ?? 0,
        wicketsTaken: wicketsTaken ?? 0,
      },
    });

    res.status(201).json({
      success: true,
      message: "Team stat created successfully",
      data: stat,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create team stat",
      error: error.message,
    });
  }
};

module.exports = {
  createTeamStat,
};