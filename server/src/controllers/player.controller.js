const axios = require("axios");

const getAllPlayers = async (req, res) => {
  try {
    const apiKey = process.env.CRICKET_API_KEY;

    if (!apiKey) {
      return res.status(500).json({
        success: false,
        message: "CRICKET_API_KEY is missing in environment variables",
      });
    }

    const offset = req.query.offset || 0;

    const response = await axios.get("https://api.cricapi.com/v1/players", {
      params: {
        apikey: apiKey,
        offset,
      },
    });

    return res.status(200).json({
      success: true,
      data: response.data.data || [],
      info: response.data.info || {},
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch players",
      error: error.response?.data || error.message,
    });
  }
};

const getPlayerById = async (req, res) => {
  try {
    const apiKey = process.env.CRICKET_API_KEY;
    const { id } = req.params;

    if (!apiKey) {
      return res.status(500).json({
        success: false,
        message: "CRICKET_API_KEY is missing in environment variables",
      });
    }

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Player id is required",
      });
    }

    const response = await axios.get("https://api.cricapi.com/v1/players_info", {
      params: {
        apikey: apiKey,
        id,
      },
    });

    return res.status(200).json({
      success: true,
      data: response.data.data || response.data,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch player details",
      error: error.response?.data || error.message,
    });
  }
};

module.exports = {
  getAllPlayers,
  getPlayerById,
};