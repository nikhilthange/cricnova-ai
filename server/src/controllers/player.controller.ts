const Player = require('../models/Player');

exports.getAllPlayers = async (req, res, next) => {
  try {
    const players = await Player.find().populate('teamId', 'name');
    res.json({ success: true, data: players });
  } catch (error) {
    next(error);
  }
};

exports.getPlayerById = async (req, res, next) => {
  try {
    const player = await Player.findById(req.params.id).populate('teamId', 'name');
    if (!player) {
      return res.status(404).json({ success: false, message: 'Player not found' });
    }
    res.json({ success: true, data: player });
  } catch (error) {
    next(error);
  }
};