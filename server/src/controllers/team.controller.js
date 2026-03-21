const prisma = require("../config/prisma");

const createTeam = async (req, res) => {
  try {
    const { name, shortName, logoUrl, country } = req.body;

    if (!name || !shortName) {
      return res.status(400).json({
        success: false,
        message: "name and shortName are required",
      });
    }

    const existingTeam = await prisma.team.findUnique({
      where: { shortName },
    });

    if (existingTeam) {
      return res.status(409).json({
        success: false,
        message: "Team with this shortName already exists",
      });
    }

    const team = await prisma.team.create({
      data: {
        name,
        shortName,
        logoUrl,
        country,
      },
    });

    res.status(201).json({
      success: true,
      data: team,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create team",
      error: error.message,
    });
  }
};

const getAllTeams = async (req, res) => {
  try {
    const teams = await prisma.team.findMany({
      orderBy: { createdAt: "desc" },
    });

    res.status(200).json({
      success: true,
      data: teams,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch teams",
      error: error.message,
    });
  }
};

const getTeamById = async (req, res) => {
  try {
    const { id } = req.params;

    const team = await prisma.team.findUnique({
      where: { id },
      include: {
        players: true,
        teamStats: true,
        homeMatches: {
          include: {
            awayTeam: true,
            venue: true,
            tournament: true,
          },
        },
        awayMatches: {
          include: {
            homeTeam: true,
            venue: true,
            tournament: true,
          },
        },
      },
    });

    if (!team) {
      return res.status(404).json({
        success: false,
        message: "Team not found",
      });
    }

    res.status(200).json({
      success: true,
      data: team,
    });
  } catch (error) {
    console.error("GET TEAM BY ID ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch team",
      error: error.message,
    });
  }
};

module.exports = {
  createTeam,
  getAllTeams,
  getTeamById,
};