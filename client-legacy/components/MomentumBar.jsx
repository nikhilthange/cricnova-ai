"use client";

function getScoreData(match) {
  if (Array.isArray(match?.score) && match.score.length > 0) {
    return match.score.map((inning) => ({
      inning: inning.inning || "Inning",
      runs: Number(inning.r || 0),
      wickets: Number(inning.w || 0),
      overs: Number(inning.o || 0),
    }));
  }

  const scoreText = String(match?.currentScore || "");
  const scoreMatch = scoreText.match(/(\d+)\/(\d+)/);
  const oversMatch = scoreText.match(/\(([\d.]+)\)/);

  return [
    {
      inning: "Current",
      runs: scoreMatch ? Number(scoreMatch[1]) : 0,
      wickets: scoreMatch ? Number(scoreMatch[2]) : 0,
      overs: oversMatch ? Number(oversMatch[1]) : 0,
    },
  ];
}

function getMomentumLabel(runRate, wickets) {
  if (runRate >= 9 && wickets <= 3) return "Strong momentum";
  if (runRate >= 7) return "Good momentum";
  if (wickets >= 6) return "Under pressure";
  if (runRate < 6) return "Slow momentum";
  return "Balanced momentum";
}

export default function MomentumBar({ match }) {
  const scoreData = getScoreData(match);
  const primary = scoreData[0] || { runs: 0, wickets: 0, overs: 0 };

  const runRate =
    primary.overs && primary.overs > 0
      ? (primary.runs / primary.overs).toFixed(2)
      : "0.00";

  const rateNum = Number(runRate);

  let momentum = 50;
  if (rateNum >= 10) momentum = 90;
  else if (rateNum >= 8) momentum = 75;
  else if (rateNum >= 6.5) momentum = 60;
  else if (rateNum >= 5) momentum = 45;
  else momentum = 30;

  if (primary.wickets >= 6) momentum -= 15;
  else if (primary.wickets >= 4) momentum -= 8;
  else if (primary.wickets <= 2) momentum += 5;

  momentum = Math.max(10, Math.min(95, momentum));

  const label = getMomentumLabel(rateNum, primary.wickets);

  return (
    <div className="rounded-2xl border border-orange-900/40 bg-gradient-to-br from-orange-950/30 to-slate-950 p-6 text-white shadow-lg">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Momentum Tracker</h2>
        <span className="rounded-full border border-orange-700/40 bg-orange-900/30 px-3 py-1 text-xs font-semibold text-orange-300">
          Live Trend
        </span>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-xl border border-gray-800 bg-black/30 p-4">
          <p className="text-sm text-gray-400">Runs</p>
          <p className="mt-2 text-xl font-bold">{primary.runs}</p>
        </div>

        <div className="rounded-xl border border-gray-800 bg-black/30 p-4">
          <p className="text-sm text-gray-400">Wickets</p>
          <p className="mt-2 text-xl font-bold">{primary.wickets}</p>
        </div>

        <div className="rounded-xl border border-gray-800 bg-black/30 p-4">
          <p className="text-sm text-gray-400">Run Rate</p>
          <p className="mt-2 text-xl font-bold">{runRate}</p>
        </div>
      </div>

      <div className="mt-6">
        <div className="mb-2 flex justify-between text-sm">
          <span>Momentum</span>
          <span>{momentum}%</span>
        </div>

        <div className="h-4 w-full rounded-full bg-gray-800">
          <div
            className="h-4 rounded-full bg-orange-500 transition-all duration-500"
            style={{ width: `${momentum}%` }}
          />
        </div>

        <p className="mt-3 text-sm text-orange-300">{label}</p>
      </div>
    </div>
  );
}