const User = require('../models/User');
const Match = require('../models/Match');
const Team = require('../models/Team');

exports.getDashboardData = async (req, res, next) => {
  try {
    const totalUsers = await User.countDocuments();
    const activeMatches = await Match.countDocuments({ status: 'LIVE' });
    const teams = await Team.countDocuments();
    
    // Mock analytics for the chart (last 7 days of user growth & API usage)
    const analytics = [
      { name: 'Mon', users: 120, apiCalls: 1200 },
      { name: 'Tue', users: 150, apiCalls: 1400 },
      { name: 'Wed', users: 180, apiCalls: 1600 },
      { name: 'Thu', users: 220, apiCalls: 2100 },
      { name: 'Fri', users: 250, apiCalls: 2400 },
      { name: 'Sat', users: 300, apiCalls: 3200 },
      { name: 'Sun', users: 350, apiCalls: 3800 }
    ];

    // Mock recent system logs
    const logs = [
      { id: 1, action: "API Sync", detail: "Successfully synced latest matches from CricAPI", status: "success", time: "2 mins ago" },
      { id: 2, action: "User Signup", detail: "New user registered: new_fan@cricnova.com", status: "info", time: "15 mins ago" },
      { id: 3, action: "API Rate Limit", detail: "Approaching daily limit on CricAPI free tier", status: "warning", time: "1 hour ago" },
      { id: 4, action: "Cache Cleared", detail: "Redis cache cleared for /api/matches/live", status: "success", time: "2 hours ago" },
      { id: 5, action: "DB Backup", detail: "Automated MongoDB backup completed", status: "success", time: "5 hours ago" }
    ];

    res.json({
      success: true,
      data: {
        stats: {
          totalUsers: totalUsers > 0 ? totalUsers : 12450, // Fallback to realistic mock if db is empty for demo
          activeMatches: activeMatches > 0 ? activeMatches : 4,
          teams: teams > 0 ? teams : 32,
          tournaments: 8
        },
        analytics,
        logs
      }
    });
  } catch (error) {
    next(error);
  }
};
