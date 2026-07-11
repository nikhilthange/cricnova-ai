const Team = require('../models/Team');

exports.getAllTeams = async (req, res, next) => {
  try {
    const teams = await Team.find().sort({ ranking: 1 });
    res.json({ success: true, data: teams });
  } catch (error) {
    next(error);
  }
};

exports.getTeamById = async (req, res, next) => {
  try {
    const team = await Team.findById(req.params.id);
    if (!team) {
      return res.status(404).json({ success: false, message: 'Team not found' });
    }
    res.json({ success: true, data: team });
  } catch (error) {
    next(error);
  }
};