const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    country: { type: String, required: true },
    role: { type: String, enum: ['Batter', 'Bowler', 'All-rounder', 'Wicketkeeper'] },
    photo: { type: String },
    stats: {
      matches: { type: Number, default: 0 },
      runs: { type: Number, default: 0 },
      average: { type: Number, default: 0 },
      wickets: { type: Number, default: 0 },
      economy: { type: Number, default: 0 },
    },
    teamId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Team',
    }
  },
  { timestamps: true }
);

const Player = mongoose.model('Player', playerSchema);
module.exports = Player;
