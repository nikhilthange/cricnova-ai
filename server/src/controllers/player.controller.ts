const cricketApi = require('../services/cricketApi.service');

exports.getAllPlayers = async (req, res, next) => {
  try {
    const searchQuery = req.query.search || "Virat Kohli";
    const apiResponse = await cricketApi.getPlayers(searchQuery);
    
    if (!apiResponse || !apiResponse.data) {
      return res.json([]);
    }

    const players = apiResponse.data.map((player: any) => ({
      id: player.id,
      name: player.name,
      country: player.country || "Unknown",
      role: player.role || "Player",
      image: player.playerImg || "https://ui-avatars.com/api/?name=" + encodeURIComponent(player.name),
      stats: {
        matches: "?", 
        runs: "?",
        wickets: "?"
      }
    }));

    res.json(players);
  } catch (error) {
    console.error("CricAPI Error (Players):", error);
    next(error);
  }
};

exports.getPlayerById = async (req, res, next) => {
  try {
    // CricAPI player info endpoint not implemented yet, just returning a stub
    res.json({ success: true, data: null, message: "Not implemented yet" });
  } catch (error) {
    next(error);
  }
};