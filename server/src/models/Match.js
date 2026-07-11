const mongoose = require('mongoose');

const matchSchema = new mongoose.Schema(
  {
    team1: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Team',
      required: true,
    },
    team2: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Team',
      required: true,
    },
    status: {
      type: String,
      enum: ['UPCOMING', 'LIVE', 'COMPLETED'],
      default: 'UPCOMING',
    },
    score1: { type: String },
    score2: { type: String },
    toss: { type: String },
    result: { type: String },
    venue: { type: String },
    date: { type: Date, required: true },
    momentum: { type: Number, default: 50 },
    timeline: [
      {
        over: Number,
        event: String,
      }
    ]
  },
  { timestamps: true }
);

const Match = mongoose.model('Match', matchSchema);
module.exports = Match;
