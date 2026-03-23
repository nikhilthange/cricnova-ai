const prisma = require("../config/prisma");

const getAllTeams = async (req, res) => {
  try {
    const teams = await prisma.team.findMany({
      orderBy: { name: "asc" },
    });

    return res.status(200).json({
      success: true,
      count: teams.length,
      data: teams,
    });
  } catch (error) {
    return res.status(500).json({
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
        homeMatches: true,
        awayMatches: true,
      },
    });

    if (!team) {
      return res.status(404).json({
        success: false,
        message: "Team not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: team,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch team",
      error: error.message,
    });
  }
};

module.exports = {
  getAllTeams,
  getTeamById,
};