const prisma = require("../config/prisma");

const createTournament = async (req, res) => {
  try {
    const { name, season, format } = req.body;

    if (!name || !season) {
      return res.status(400).json({
        success: false,
        message: "name and season are required",
      });
    }

    const tournament = await prisma.tournament.create({
      data: {
        name,
        season,
        format,
      },
    });

    res.status(201).json({
      success: true,
      message: "Tournament created successfully",
      data: tournament,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create tournament",
      error: error.message,
    });
  }
};

module.exports = {
  createTournament,
};