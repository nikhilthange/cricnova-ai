const prisma = require("../config/prisma");

const createVenue = async (req, res) => {
  try {
    const { name, city, country } = req.body;

    if (!name || !city || !country) {
      return res.status(400).json({
        success: false,
        message: "name, city and country are required",
      });
    }

    const venue = await prisma.venue.create({
      data: {
        name,
        city,
        country,
      },
    });

    res.status(201).json({
      success: true,
      message: "Venue created successfully",
      data: venue,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create venue",
      error: error.message,
    });
  }
};

module.exports = {
  createVenue,
};