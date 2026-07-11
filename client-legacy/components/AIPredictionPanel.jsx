"use client";

function getTeamNames(match) {
  const teamA =
    match?.homeTeam?.name ||
    match?.teamInfo?.[0]?.name ||
    match?.teams?.[0] ||
    "Team 1";

  const teamB =
    match?.awayTeam?.name ||
    match?.teamInfo?.[1]?.name ||
    match?.teams?.[1] ||
    "Team 2";

  return { teamA, teamB };
}

function parseScoreText(scoreText = "") {
  const cleaned = String(scoreText).trim();
  const match = cleaned.match(/(\d+)\/(\d+)/);

  if (!match) {
    return { runs: 0, wickets: 0 };
  }

  return {
    runs: Number(match[1]),
    wickets: Number(match[2]),
  };
}

function getPrimaryScore(match) {
  if (Array.isArray(match?.score) && match.score.length > 0) {
    const s = match.score[0];
    return {
      runs: Number(s?.r || 0),
      wickets: Number(s?.w || 0),
      overs: Number(s?.o || 0),
    };
  }

  const currentScore = match?.currentScore || "";
  const parsed = parseScoreText(currentScore);

  let overs = 0;
  const oversMatch = String(currentScore).match(/\(([\d.]+)\)/);
  if (oversMatch) overs = Number(oversMatch[1]);

  return {
    runs: parsed.runs,
    wickets: parsed.wickets,
    overs,
  };
}

function generatePrediction(match) {
  const { teamA, teamB } = getTeamNames(match);
  const score = getPrimaryScore(match);
  const statusText = String(match?.status || match?.ms || "").toLowerCase();

  if (!statusText || statusText.includes("not started")) {
    return {
      winner: "Too early to predict",
      teamAChance: 50,
      teamBChance: 50,
      confidence: "Low",
      keyFactor: "Waiting for match to begin",
      summary: "Prediction will become more meaningful once the match starts.",
    };
  }

  let teamAChance = 50;

  if (score.runs >= 180) teamAChance += 20;
  else if (score.runs >= 140) teamAChance += 10;
  else if (score.runs <= 80) teamAChance -= 10;

  if (score.wickets >= 7) teamAChance -= 20;
  else if (score.wickets >= 5) teamAChance -= 10;
  else if (score.wickets <= 2) teamAChance += 8;

  if (score.overs >= 15 && score.runs >= 150) teamAChance += 8;
  if (score.overs >= 15 && score.runs < 110) teamAChance -= 8;

  teamAChance = Math.max(5, Math.min(95, teamAChance));
  const teamBChance = 100 - teamAChance;

  const winner = teamAChance >= teamBChance ? teamA : teamB;
  const spread = Math.abs(teamAChance - teamBChance);

  let confidence = "Low";
  if (spread >= 30) confidence = "High";
  else if (spread >= 15) confidence = "Medium";

  let keyFactor = "Balanced match conditions";
  if (score.runs >= 160) keyFactor = "Strong run total";
  if (score.wickets >= 6) keyFactor = "Heavy wicket pressure";
  if (score.overs >= 15) keyFactor = "Late innings momentum";

  return {
    winner,
    teamAChance,
    teamBChance,
    confidence,
    keyFactor,
    summary: `${winner} currently has the stronger projected winning position based on score pace, wickets, and match momentum.`,
  };
}

export default function AIPredictionPanel({ match }) {
  const { teamA, teamB } = getTeamNames(match);
  const prediction = generatePrediction(match);

  return (
    <div className="rounded-2xl border border-cyan-900/40 bg-gradient-to-br from-cyan-950/30 to-slate-950 p-6 text-white shadow-lg">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-2xl font-semibold">AI Prediction Panel</h2>
        <span className="rounded-full border border-cyan-700/40 bg-cyan-900/30 px-3 py-1 text-xs font-semibold text-cyan-300">
          Live Analysis
        </span>
      </div>

      <p className="mb-6 text-sm text-gray-300">
        This prediction is a live heuristic model based on score, wickets, overs, and match momentum.
      </p>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-xl border border-gray-800 bg-black/30 p-4">
          <p className="text-sm text-gray-400">Predicted Winner</p>
          <p className="mt-2 text-lg font-bold text-cyan-300">{prediction.winner}</p>
        </div>

        <div className="rounded-xl border border-gray-800 bg-black/30 p-4">
          <p className="text-sm text-gray-400">Confidence</p>
          <p className="mt-2 text-lg font-bold">{prediction.confidence}</p>
        </div>

        <div className="rounded-xl border border-gray-800 bg-black/30 p-4">
          <p className="text-sm text-gray-400">Key Factor</p>
          <p className="mt-2 text-lg font-bold">{prediction.keyFactor}</p>
        </div>
      </div>

      <div className="mt-6 space-y-4">
        <div>
          <div className="mb-2 flex justify-between text-sm">
            <span>{teamA}</span>
            <span>{prediction.teamAChance}%</span>
          </div>
          <div className="h-3 w-full rounded-full bg-gray-800">
            <div
              className="h-3 rounded-full bg-cyan-500 transition-all duration-500"
              style={{ width: `${prediction.teamAChance}%` }}
            />
          </div>
        </div>

        <div>
          <div className="mb-2 flex justify-between text-sm">
            <span>{teamB}</span>
            <span>{prediction.teamBChance}%</span>
          </div>
          <div className="h-3 w-full rounded-full bg-gray-800">
            <div
              className="h-3 rounded-full bg-emerald-500 transition-all duration-500"
              style={{ width: `${prediction.teamBChance}%` }}
            />
          </div>
        </div>
      </div>

      <div className="mt-6 rounded-xl border border-gray-800 bg-black/30 p-4">
        <p className="text-sm text-gray-400">AI Summary</p>
        <p className="mt-2 text-gray-200">{prediction.summary}</p>
      </div>
    </div>
  );
}