const Match = require('../models/Match');

exports.getAllMatches = async (req, res, next) => {
  try {
    const matches = await Match.find()
      .populate('team1', 'name code logo')
      .populate('team2', 'name code logo')
      .sort({ date: -1 });
    res.json({ success: true, data: matches });
  } catch (error) {
    next(error);
  }
};

exports.getMatchById = async (req, res, next) => {
  try {
    const match = await Match.findById(req.params.id)
      .populate('team1', 'name code logo')
      .populate('team2', 'name code logo');
    
    if (!match) {
      return res.status(404).json({ success: false, message: 'Match not found' });
    }
    res.json({ success: true, data: match });
  } catch (error) {
    next(error);
  }
};

exports.getLiveMatches = async (req, res, next) => {
  try {
    const matches = await Match.find({ status: 'LIVE' })
      .populate('team1', 'name code logo')
      .populate('team2', 'name code logo');
    res.json({ success: true, data: matches });
  } catch (error) {
    next(error);
  }
};

exports.getUpcomingMatches = async (req, res, next) => {
  try {
    const matches = await Match.find({ status: 'UPCOMING' })
      .populate('team1', 'name code logo')
      .populate('team2', 'name code logo')
      .sort({ date: 1 });
    res.json({ success: true, data: matches });
  } catch (error) {
    next(error);
  }
};