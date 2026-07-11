const prisma = require("../config/prisma");

const createPlayerStat = async (req, res) => {
  try {
    const {
      matchId,
      playerId,
      runs,
      ballsFaced,
      fours,
      sixes,
      strikeRate,
      wickets,
      oversBowled,
      runsConceded,
      economy,
      catches,
      runOuts,
    } = req.body;

    if (!matchId || !playerId) {
      return res.status(400).json({
        success: false,
        message: "matchId and playerId are required",
      });
    }

    const [match, player] = await Promise.all([
      prisma.match.findUnique({ where: { id: matchId } }),
      prisma.player.findUnique({ where: { id: playerId } }),
    ]);

    if (!match || !player) {
      return res.status(404).json({
        success: false,
        message: "Match or Player not found",
      });
    }

    const stat = await prisma.playerMatchStat.create({
      data: {
        matchId,
        playerId,
        runs: runs ?? 0,
        ballsFaced: ballsFaced ?? 0,
        fours: fours ?? 0,
        sixes: sixes ?? 0,
        strikeRate: strikeRate ?? 0,
        wickets: wickets ?? 0,
        oversBowled: oversBowled ?? 0,
        runsConceded: runsConceded ?? 0,
        economy: economy ?? 0,
        catches: catches ?? 0,
        runOuts: runOuts ?? 0,
      },
    });

    res.status(201).json({
      success: true,
      message: "Player stat created successfully",
      data: stat,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create player stat",
      error: error.message,
    });
  }
};

module.exports = {
  createPlayerStat,
};