const prisma = require("../config/prisma");

const createMatch = async (req, res) => {
  try {
    const {
      title,
      status,
      matchDate,
      tossWinner,
      tossDecision,
      resultSummary,
      homeTeamId,
      awayTeamId,
      venueId,
      tournamentId,
    } = req.body;

    if (!title || !matchDate || !homeTeamId || !awayTeamId || !venueId || !tournamentId) {
      return res.status(400).json({
        success: false,
        message: "title, matchDate, homeTeamId, awayTeamId, venueId and tournamentId are required",
      });
    }

    if (homeTeamId === awayTeamId) {
      return res.status(400).json({
        success: false,
        message: "homeTeamId and awayTeamId cannot be the same",
      });
    }

    const [homeTeam, awayTeam, venue, tournament] = await Promise.all([
      prisma.team.findUnique({ where: { id: homeTeamId } }),
      prisma.team.findUnique({ where: { id: awayTeamId } }),
      prisma.venue.findUnique({ where: { id: venueId } }),
      prisma.tournament.findUnique({ where: { id: tournamentId } }),
    ]);

    if (!homeTeam || !awayTeam || !venue || !tournament) {
      return res.status(404).json({
        success: false,
        message: "One or more related records not found",
      });
    }

    const match = await prisma.match.create({
      data: {
        title,
        status,
        matchDate: new Date(matchDate),
        tossWinner,
        tossDecision,
        resultSummary,
        homeTeamId,
        awayTeamId,
        venueId,
        tournamentId,
      },
      include: {
        homeTeam: true,
        awayTeam: true,
        venue: true,
        tournament: true,
      },
    });

    res.status(201).json({
      success: true,
      message: "Match created successfully",
      data: match,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create match",
      error: error.message,
    });
  }
};

const getAllMatches = async (req, res) => {
  try {
    const matches = await prisma.match.findMany({
      include: {
        homeTeam: true,
        awayTeam: true,
        venue: true,
        tournament: true,
      },
      orderBy: { matchDate: "asc" },
    });

    res.status(200).json({
      success: true,
      count: matches.length,
      data: matches,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch matches",
      error: error.message,
    });
  }
};

const getMatchById = async (req, res) => {
  try {
    const { id } = req.params;

    const match = await prisma.match.findUnique({
      where: { id },
      include: {
        homeTeam: true,
        awayTeam: true,
        venue: true,
        tournament: true,
        innings: true,
        teamStats: {
          include: {
            team: true,
          },
        },
        playerStats: {
          include: {
            player: true,
          },
        },
        predictions: true,
      },
    });

    if (!match) {
      return res.status(404).json({
        success: false,
        message: "Match not found",
      });
    }

    res.status(200).json({
      success: true,
      data: match,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch match",
      error: error.message,
    });
  }
};

module.exports = {
  createMatch,
  getAllMatches,
  getMatchById,
};