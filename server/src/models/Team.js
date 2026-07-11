const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    code: { type: String, required: true },
    logo: { type: String },
    ranking: { type: Number },
    winRate: { type: Number },
    colorClass: { type: String },
    captain: { type: String },
    coach: { type: String },
  },
  { timestamps: true }
);

const Team = mongoose.model('Team', teamSchema);
module.exports = Team;
