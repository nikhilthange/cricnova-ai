"use client";

export default function MatchDetailView({ match, type = "match" }) {
  if (!match) {
    return (
      <div className="min-h-screen bg-black p-6 text-white">
        <h1 className="mb-6 text-3xl font-bold">Match Details</h1>
        <p className="text-gray-400">Match not found.</p>
      </div>
    );
  }

  const title = match.title || match.name || "Match";
  const homeTeam =
    match.homeTeam?.name || match.teamInfo?.[0]?.name || "Team 1";
  const awayTeam =
    match.awayTeam?.name || match.teamInfo?.[1]?.name || "Team 2";

  const venue = match.venue?.name || match.venue || "Venue not available";
  const tournament =
    match.tournament?.name || match.series || "Tournament not available";
  const status = match.status || match.ms || "Status not available";

  const dateValue = match.matchDate || match.dateTimeGMT;
  const dateText = dateValue
    ? new Date(dateValue).toLocaleString()
    : "Date not available";

  const currentScore =
    match.currentScore ||
    (Array.isArray(match.score) && match.score.length > 0
      ? match.score
          .map((s) => `${s.r}/${s.w} (${s.o})`)
          .join(" | ")
      : "Score not available");

  return (
    <div className="min-h-screen bg-black p-6 text-white">
      <div className="mx-auto max-w-4xl space-y-6">
        <div className="rounded-2xl border border-gray-800 bg-gray-900 p-6">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <h1 className="text-3xl font-bold">{title}</h1>
            <span className="rounded-full bg-red-600 px-3 py-1 text-sm font-semibold">
              {type.toUpperCase()}
            </span>
          </div>

          <p className="text-lg text-gray-300">
            {homeTeam} vs {awayTeam}
          </p>

          <p className="mt-3 text-green-400 text-lg font-medium">
            {currentScore}
          </p>

          <p className="mt-3 text-yellow-400">{status}</p>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div className="rounded-xl border border-gray-800 bg-black/40 p-4">
              <p className="text-sm text-gray-400">Venue</p>
              <p className="mt-1 text-white">{venue}</p>
            </div>

            <div className="rounded-xl border border-gray-800 bg-black/40 p-4">
              <p className="text-sm text-gray-400">Tournament / Series</p>
              <p className="mt-1 text-white">{tournament}</p>
            </div>

            <div className="rounded-xl border border-gray-800 bg-black/40 p-4">
              <p className="text-sm text-gray-400">Date & Time</p>
              <p className="mt-1 text-white">{dateText}</p>
            </div>

            <div className="rounded-xl border border-gray-800 bg-black/40 p-4">
              <p className="text-sm text-gray-400">Match Status</p>
              <p className="mt-1 text-white">{status}</p>
            </div>
          </div>
        </div>

        {Array.isArray(match.score) && match.score.length > 0 && (
          <div className="rounded-2xl border border-gray-800 bg-gray-900 p-6">
            <h2 className="mb-4 text-2xl font-semibold">Score Breakdown</h2>
            <div className="space-y-3">
              {match.score.map((inning, index) => (
                <div
                  key={index}
                  className="rounded-xl border border-gray-800 bg-black/40 p-4"
                >
                  <p className="font-semibold text-white">
                    {inning.inning || `Inning ${index + 1}`}
                  </p>
                  <p className="mt-1 text-gray-300">
                    Runs: {inning.r ?? "-"} / Wickets: {inning.w ?? "-"}
                  </p>
                  <p className="text-gray-400">Overs: {inning.o ?? "-"}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="rounded-2xl border border-gray-800 bg-gray-900 p-6">
          <h2 className="mb-4 text-2xl font-semibold">Teams</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-xl border border-gray-800 bg-black/40 p-4">
              <p className="text-sm text-gray-400">Home Team</p>
              <p className="mt-1 text-lg font-semibold">{homeTeam}</p>
            </div>

            <div className="rounded-xl border border-gray-800 bg-black/40 p-4">
              <p className="text-sm text-gray-400">Away Team</p>
              <p className="mt-1 text-lg font-semibold">{awayTeam}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}