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

const cricketApi = require('../services/cricketApi.service');

exports.getLiveMatches = async (req, res, next) => {
  try {
    const apiResponse = await cricketApi.getCurrentMatches();
    
    if (!apiResponse || !apiResponse.data) {
      return res.json([]);
    }

    const liveMatches = apiResponse.data
      .filter(match => match.matchStarted && !match.matchEnded)
      .map(match => ({
        _id: match.id,
        id: match.id,
        team1: { 
          name: match.teamInfo?.[0]?.name || match.teams?.[0] || "Team 1", 
          code: match.teamInfo?.[0]?.shortname || match.teams?.[0]?.substring(0,3) || "T1", 
          logo: match.teamInfo?.[0]?.img || "🏏" 
        },
        team2: { 
          name: match.teamInfo?.[1]?.name || match.teams?.[1] || "Team 2", 
          code: match.teamInfo?.[1]?.shortname || match.teams?.[1]?.substring(0,3) || "T2", 
          logo: match.teamInfo?.[1]?.img || "🏏" 
        },
        status: 'LIVE',
        score1: match.score?.[0] ? `${match.score[0].r}/${match.score[0].w} (${match.score[0].o})` : "Yet to bat",
        score2: match.score?.[1] ? `${match.score[1].r}/${match.score[1].w} (${match.score[1].o})` : "",
        toss: match.status,
        result: match.status,
        venue: match.venue,
        date: match.date
      }));

    res.json(liveMatches); // The frontend expects the raw array because of how we fixed matchService
  } catch (error) {
    console.error("CricAPI Error:", error);
    next(error);
  }
};

exports.getUpcomingMatches = async (req, res, next) => {
  try {
    const apiResponse = await cricketApi.getMatches();
    
    if (!apiResponse || !apiResponse.data) {
      return res.json([]);
    }

    const upcomingMatches = apiResponse.data
      .filter(match => !match.matchStarted)
      .sort((a, b) => new Date(a.dateTimeGMT).getTime() - new Date(b.dateTimeGMT).getTime())
      .map(match => ({
        _id: match.id,
        id: match.id,
        team1: { 
          name: match.teamInfo?.[0]?.name || match.teams?.[0] || "Team 1", 
          code: match.teamInfo?.[0]?.shortname || match.teams?.[0]?.substring(0,3) || "T1", 
          logo: match.teamInfo?.[0]?.img || "🏏" 
        },
        team2: { 
          name: match.teamInfo?.[1]?.name || match.teams?.[1] || "Team 2", 
          code: match.teamInfo?.[1]?.shortname || match.teams?.[1]?.substring(0,3) || "T2", 
          logo: match.teamInfo?.[1]?.img || "🏏" 
        },
        status: 'UPCOMING',
        venue: match.venue || "TBD",
        date: new Date(match.dateTimeGMT).toLocaleString(),
        format: match.matchType?.toUpperCase() || "T20"
      }));

    res.json(upcomingMatches);
  } catch (error) {
    console.error("CricAPI Error (Upcoming):", error);
    next(error);
  }
};

exports.getMatchInfoById = async (req, res, next) => {
  try {
    const apiResponse = await cricketApi.getMatchInfo(req.params.id);
    if (!apiResponse || !apiResponse.data) {
      return res.status(404).json({ success: false, message: 'Match not found' });
    }
    res.json(apiResponse.data);
  } catch (error) {
    console.error("CricAPI Error (Match Info):", error);
    next(error);
  }
};

exports.getMatchScorecardById = async (req, res, next) => {
  try {
    const apiResponse = await cricketApi.getMatchScorecard(req.params.id);
    if (!apiResponse || !apiResponse.data) {
      return res.status(404).json({ success: false, message: 'Scorecard not found' });
    }
    res.json(apiResponse.data);
  } catch (error) {
    console.error("CricAPI Error (Scorecard):", error);
    next(error);
  }
};