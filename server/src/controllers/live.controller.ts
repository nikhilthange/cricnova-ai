const { getCurrentMatches } = require("../services/cricketApi.service");

const mockLiveMatches = [
  {
    id: "mock-1",
    title: "Mumbai Indians vs Chennai Super Kings",
    homeTeam: { name: "Mumbai Indians" },
    awayTeam: { name: "Chennai Super Kings" },
    currentScore: "87/2",
    overs: "10.4",
    status: "LIVE",
    venue: { name: "Wankhede Stadium" },
  },
];

const getLiveMatches = async (req, res) => {
  try {
    const apiData = await getCurrentMatches();
    const matches = apiData.data || [];

    const formatted = matches.map((m) => {
      const score = m.score?.[0] || {};

      return {
        id: m.id,
        title:
          m.name || `${m.teams?.[0] || "Team A"} vs ${m.teams?.[1] || "Team B"}`,
        homeTeam: { name: m.teams?.[0] || "Team A" },
        awayTeam: { name: m.teams?.[1] || "Team B" },
        currentScore: `${score.r || 0}/${score.w || 0}`,
        overs: score.o || "0",
        status: m.status || "LIVE",
        venue: { name: m.venue || "Unknown Venue" },
        matchStarted: m.matchStarted,
      };
    });

    const visibleMatches = formatted.filter(
      (m) =>
        m.matchStarted === true ||
        m.status?.toLowerCase().includes("live") ||
        m.currentScore !== "0/0"
    );

    res.json({
      success: true,
      data: visibleMatches.length > 0 ? visibleMatches : mockLiveMatches,
    });
  } catch (err) {
    console.error("LIVE MATCHES ERROR:", err?.response?.data || err.message);

    res.json({
      success: true,
      data: mockLiveMatches,
    });
  }
};

const getLiveMatchById = async (req, res) => {
  try {
    const { id } = req.params;

    if (id === "mock-1") {
      return res.json({
        success: true,
        data: {
          id: "mock-1",
          title: "Mumbai Indians vs Chennai Super Kings",
          currentScore: "87/2",
          overs: "10.4",
          runRate: "8.37",
          striker: "Rohit Sharma",
          nonStriker: "Suryakumar Yadav",
          bowler: "Ravindra Jadeja",
          recentBalls: ["1", "4", "0", "Wd", "2", "1"],
          projections: {
            powerplay: 50,
            over10: 84,
            over12: 101,
            over15: 126,
            over20: 168,
          },
          livePrediction: {
            predictedWinner: "Mumbai Indians",
            winProbability: 61,
          },
        },
      });
    }

    const apiData = await getCurrentMatches();
    const matches = apiData.data || [];
    const match = matches.find((m) => String(m.id) === String(id));

    if (!match) {
      return res.status(404).json({
        success: false,
        message: "Match not found",
      });
    }

    const score = match.score?.[0] || {};
    const runs = score.r || 0;
    const wickets = score.w || 0;
    const oversRaw = Number(score.o || 1);

    const completedOvers = Math.floor(oversRaw);
    const balls = Math.round((oversRaw - completedOvers) * 10);
    const oversAsDecimal = completedOvers + balls / 6 || 1;

    const runRate = +(runs / oversAsDecimal).toFixed(2);

    const projectionPowerplay = +(runRate * 6).toFixed(0);
    const projection10 = +(runRate * 10).toFixed(0);
    const projection12 = +(runRate * 12).toFixed(0);
    const projection15 = +(runRate * 15).toFixed(0);
    const projection20 = +(runRate * 20).toFixed(0);

    let winProbability = 50;

    if (runRate >= 9) winProbability += 15;
    else if (runRate >= 8) winProbability += 10;
    else if (runRate >= 7) winProbability += 5;

    if (wickets <= 2) winProbability += 10;
    else if (wickets <= 4) winProbability += 5;
    else if (wickets >= 6) winProbability -= 10;

    if (winProbability > 90) winProbability = 90;
    if (winProbability < 10) winProbability = 10;

    res.json({
      success: true,
      data: {
        id: match.id,
        title:
          match.name ||
          `${match.teams?.[0] || "Team A"} vs ${match.teams?.[1] || "Team B"}`,
        currentScore: `${runs}/${wickets}`,
        overs: String(score.o || 0),
        runRate,
        striker: "Live Batter",
        nonStriker: "Partner",
        bowler: "Current Bowler",
        recentBalls: [],
        projections: {
          powerplay: projectionPowerplay,
          over10: projection10,
          over12: projection12,
          over15: projection15,
          over20: projection20,
        },
        livePrediction: {
          predictedWinner: match.teams?.[0] || "Team A",
          winProbability,
        },
        rawApi: match,
      },
    });
  } catch (err) {
    console.error("LIVE MATCH DETAIL ERROR:", err?.response?.data || err.message);

    res.json({
      success: true,
      data: {
        id: "mock-1",
        title: "Mumbai Indians vs Chennai Super Kings",
        currentScore: "87/2",
        overs: "10.4",
        runRate: "8.37",
        striker: "Rohit Sharma",
        nonStriker: "Suryakumar Yadav",
        bowler: "Ravindra Jadeja",
        recentBalls: ["1", "4", "0", "Wd", "2", "1"],
        projections: {
          powerplay: 50,
          over10: 84,
          over12: 101,
          over15: 126,
          over20: 168,
        },
        livePrediction: {
          predictedWinner: "Mumbai Indians",
          winProbability: 61,
        },
      },
    });
  }
};

module.exports = {
  getLiveMatches,
  getLiveMatchById,
};