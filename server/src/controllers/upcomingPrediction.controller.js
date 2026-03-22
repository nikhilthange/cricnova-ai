const prisma = require("../config/prisma");

const getUpcomingPredictionByMatchId = async (req, res) => {
  try {
    const { matchId } = req.params;

    const match = await prisma.match.findUnique({
      where: { id: matchId },
      include: {
        homeTeam: {
          include: {
            players: true,
          },
        },
        awayTeam: {
          include: {
            players: true,
          },
        },
        venue: true,
        tournament: true,
        predictions: true,
      },
    });

    if (!match) {
      return res.status(404).json({
        success: false,
        message: "Match not found",
      });
    }

    const existingPrediction =
      match.predictions && match.predictions.length > 0
        ? match.predictions[0]
        : null;

    if (existingPrediction) {
      return res.status(200).json({
        success: true,
        data: {
          matchId: match.id,
          title: match.title,
          predictedWinner: existingPrediction.predictedWinner,
          homeWinProbability: existingPrediction.homeWinProbability,
          awayWinProbability: existingPrediction.awayWinProbability,
          projectedPowerplay: existingPrediction.projectedPowerplay ?? 48,
          projected10Over: existingPrediction.projected10Over ?? 86,
          projected12Over: existingPrediction.projected12Over ?? 101,
          projected15Over: existingPrediction.projected15Over ?? 128,
          projected20Over:
            existingPrediction.projected20Over ||
            existingPrediction.projectedTotal ||
            176,
          topScorer: existingPrediction.topScorer,
          topWicketTaker: existingPrediction.topWicketTaker,
          confidence: existingPrediction.confidence,
        },
      });
    }

    const homeTeamStrength = match.homeTeam?.players?.length || 5;
    const awayTeamStrength = match.awayTeam?.players?.length || 5;

    let homeWinProbability = 50;
    let awayWinProbability = 50;

    if (homeTeamStrength > awayTeamStrength) {
      homeWinProbability += 5;
      awayWinProbability -= 5;
    } else if (awayTeamStrength > homeTeamStrength) {
      awayWinProbability += 5;
      homeWinProbability -= 5;
    }

    const predictedWinner =
      homeWinProbability >= awayWinProbability
        ? match.homeTeam?.name
        : match.awayTeam?.name;

    const topScorer =
      predictedWinner === match.homeTeam?.name
        ? match.homeTeam?.players?.[0]?.name || "Top Batter"
        : match.awayTeam?.players?.[0]?.name || "Top Batter";

    const topWicketTaker =
      predictedWinner === match.homeTeam?.name
        ? match.homeTeam?.players?.[1]?.name || "Top Bowler"
        : match.awayTeam?.players?.[1]?.name || "Top Bowler";

    const projectedPowerplay = 52;
    const projected10Over = 88;
    const projected12Over = 102;
    const projected15Over = 132;
    const projected20Over = 182;
    const confidence = 74;

    res.status(200).json({
      success: true,
      data: {
        matchId: match.id,
        title: match.title,
        predictedWinner,
        homeWinProbability,
        awayWinProbability,
        projectedPowerplay,
        projected10Over,
        projected12Over,
        projected15Over,
        projected20Over,
        topScorer,
        topWicketTaker,
        confidence,
      },
    });
  } catch (error) {
    console.error("GET UPCOMING PREDICTION ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch upcoming prediction",
      error: error.message,
    });
  }
};

module.exports = {
  getUpcomingPredictionByMatchId,
};