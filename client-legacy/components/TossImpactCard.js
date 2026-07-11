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

function getTossInfo(match) {
  const tossWinner =
    match?.tossWinner ||
    match?.tossWinnerName ||
    match?.tossWinnerTeam ||
    "Not available";

  const tossDecision =
    match?.tossDecision ||
    match?.decision ||
    "Not available";

  return { tossWinner, tossDecision };
}

function buildImpact(match) {
  const { teamA, teamB } = getTeamNames(match);
  const { tossWinner, tossDecision } = getTossInfo(match);
  const statusText = String(match?.status || match?.ms || "").toLowerCase();

  if (tossWinner === "Not available") {
    return {
      tossWinner,
      tossDecision,
      impact: "Low",
      note: "Toss data is not available for this match yet.",
      likelyBenefit: "Unknown",
    };
  }

  let likelyBenefit = tossWinner;
  let impact = "Medium";
  let note = `${tossWinner} may gain an early tactical advantage from the toss.`;

  if (String(tossDecision).toLowerCase().includes("bat")) {
    impact = "Medium";
    note = `${tossWinner} chose to bat first, which can help set scoreboard pressure.`;
  }

  if (String(tossDecision).toLowerCase().includes("field")) {
    impact = "Medium";
    note = `${tossWinner} chose to field first, which may help while chasing later.`;
  }

  if (statusText.includes("not started")) {
    impact = "Low";
    note = `The toss is important, but match conditions are still developing before start.`;
  }

  if (statusText.includes("live")) {
    impact = "High";
    note = `${tossWinner}'s toss decision is now directly affecting match flow and pressure.`;
  }

  if (tossWinner !== teamA && tossWinner !== teamB) {
    likelyBenefit = tossWinner;
  }

  return {
    tossWinner,
    tossDecision,
    impact,
    note,
    likelyBenefit,
  };
}

export default function TossImpactCard({ match }) {
  const { teamA, teamB } = getTeamNames(match);
  const data = buildImpact(match);

  return (
    <div className="rounded-2xl border border-violet-900/40 bg-gradient-to-br from-violet-950/30 to-slate-950 p-6 text-white shadow-lg">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Toss + Win Impact</h2>
        <span className="rounded-full border border-violet-700/40 bg-violet-900/30 px-3 py-1 text-xs font-semibold text-violet-300">
          Tactical Insight
        </span>
      </div>

      <p className="mb-6 text-sm text-gray-300">
        Toss decisions can shift early control, match tempo, and chasing pressure.
      </p>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-xl border border-gray-800 bg-black/30 p-4">
          <p className="text-sm text-gray-400">Teams</p>
          <p className="mt-2 text-lg font-bold">
            {teamA} vs {teamB}
          </p>
        </div>

        <div className="rounded-xl border border-gray-800 bg-black/30 p-4">
          <p className="text-sm text-gray-400">Toss Winner</p>
          <p className="mt-2 text-lg font-bold text-violet-300">
            {data.tossWinner}
          </p>
        </div>

        <div className="rounded-xl border border-gray-800 bg-black/30 p-4">
          <p className="text-sm text-gray-400">Decision</p>
          <p className="mt-2 text-lg font-bold">
            {data.tossDecision}
          </p>
        </div>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <div className="rounded-xl border border-gray-800 bg-black/30 p-4">
          <p className="text-sm text-gray-400">Impact Level</p>
          <p className="mt-2 text-lg font-bold">{data.impact}</p>
        </div>

        <div className="rounded-xl border border-gray-800 bg-black/30 p-4">
          <p className="text-sm text-gray-400">Likely Benefit</p>
          <p className="mt-2 text-lg font-bold">{data.likelyBenefit}</p>
        </div>
      </div>

      <div className="mt-6 rounded-xl border border-gray-800 bg-black/30 p-4">
        <p className="text-sm text-gray-400">AI Note</p>
        <p className="mt-2 text-gray-200">{data.note}</p>
      </div>
    </div>
  );
}