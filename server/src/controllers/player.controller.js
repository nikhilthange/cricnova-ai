const prisma = require("../config/prisma");

const createPlayer = async (req, res) => {
  try {
    const {
      name,
      role,
      battingStyle,
      bowlingStyle,
      nationality,
      imageUrl,
      teamId,
    } = req.body;

    if (!name || !role || !teamId) {
      return res.status(400).json({
        success: false,
        message: "name, role and teamId are required",
      });
    }

    const team = await prisma.team.findUnique({
      where: { id: teamId },
    });

    if (!team) {
      return res.status(404).json({
        success: false,
        message: "Team not found",
      });
    }

    const player = await prisma.player.create({
      data: {
        name,
        role,
        battingStyle,
        bowlingStyle,
        nationality,
        imageUrl,
        teamId,
      },
    });

    res.status(201).json({
      success: true,
      message: "Player created successfully",
      data: player,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create player",
      error: error.message,
    });
  }
};

const getAllPlayers = async (req, res) => {
  try {
    const players = await prisma.player.findMany({
      include: {
        team: true,
        playerStats: true,
      },
      orderBy: { createdAt: "desc" },
    });

    res.status(200).json({
      success: true,
      count: players.length,
      data: players,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch players",
      error: error.message,
    });
  }
};
const getPlayerById = async (req, res) => {
  try {
    const { id } = req.params;

    const player = await prisma.player.findUnique({
      where: { id },
      include: {
        team: true,
        playerStats: {
          include: {
            match: true,
          },
        },
      },
    });

    if (!player) {
      return res.status(404).json({
        success: false,
        message: "Player not found",
      });
    }

    res.status(200).json({
      success: true,
      data: player,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch player",
      error: error.message,
    });
  }
};

module.exports = {
  createPlayer,
  getAllPlayers,
  getPlayerById,
};