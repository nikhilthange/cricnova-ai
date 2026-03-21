import { getMatchById } from "../../../services/matchService";
import PredictionCard from "../../../components/PredictionCard";

export const dynamic = "force-dynamic";

export default async function MatchDetailsPage({ params }) {
  const { id } = await params;

  let match = null;

  try {
    const result = await getMatchById(id);
    match = result.data;
  } catch (error) {
    return (
      <main className="min-h-screen bg-black p-10 text-white">
        <p className="text-red-500">Failed to fetch match</p>
      </main>
    );
  }

  if (!match) {
    return (
      <main className="min-h-screen bg-black p-10 text-white">
        <p>No match found</p>
      </main>
    );
  }

  const latestPrediction =
    match.predictions && match.predictions.length > 0
      ? match.predictions[0]
      : null;

  return (
    <main className="min-h-screen bg-black p-10 text-white">
      <h1 className="mb-4 text-4xl font-bold">{match.title}</h1>

      <div className="mb-8 grid gap-6 lg:grid-cols-3">
        <div className="rounded-2xl border border-gray-800 bg-gray-900 p-6 lg:col-span-2">
          <p className="text-lg text-gray-200">
            {match.homeTeam?.name} vs {match.awayTeam?.name}
          </p>
          <p className="mt-2 text-gray-400">Status: {match.status}</p>
          <p className="mt-1 text-gray-400">
            Date: {new Date(match.matchDate).toLocaleString()}
          </p>
          <p className="mt-1 text-gray-400">
            Venue: {match.venue?.name || "N/A"}
          </p>
          <p className="mt-1 text-gray-400">
            Tournament: {match.tournament?.name || "N/A"}{" "}
            {match.tournament?.season || ""}
          </p>
          <p className="mt-1 text-gray-400">
            Result: {match.resultSummary || "Not available"}
          </p>
        </div>

        <div>
          {latestPrediction ? (
            <PredictionCard prediction={latestPrediction} />
          ) : (
            <div className="rounded-2xl border border-gray-800 bg-gray-900 p-6 text-gray-400">
              No predictions available.
            </div>
          )}
        </div>
      </div>

      <section className="mb-8">
        <h2 className="mb-4 text-2xl font-semibold">Score Summary</h2>

        {match.innings?.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2">
            {match.innings.map((inning) => (
              <div
                key={inning.id}
                className="rounded-2xl border border-gray-800 bg-gray-900 p-5"
              >
                <p className="text-lg font-semibold text-white">
                  {inning.battingTeam}
                </p>
                <p className="mt-2 text-2xl font-bold text-green-400">
                  {inning.runs}/{inning.wickets}
                </p>
                <p className="mt-1 text-gray-400">Overs: {inning.overs}</p>
                <p className="mt-1 text-gray-400">
                  Against: {inning.bowlingTeam}
                </p>
                <p className="mt-1 text-gray-500">
                  Inning {inning.inningNumber}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-gray-800 bg-gray-900 p-6 text-gray-400">
            No innings data available.
          </div>
        )}
      </section>

      <section className="mb-8">
        <h2 className="mb-4 text-2xl font-semibold">Team Stats</h2>

        {match.teamStats?.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2">
            {match.teamStats.map((stat) => (
              <div
                key={stat.id}
                className="rounded-2xl border border-gray-800 bg-gray-900 p-5"
              >
                <p className="text-lg font-semibold text-white">
                  {stat.team?.name}
                </p>
                <p className="mt-2 text-gray-400">Runs: {stat.totalRuns}</p>
                <p className="mt-1 text-gray-400">
                  Wickets Lost: {stat.totalWicketsLost}
                </p>
                <p className="mt-1 text-gray-400">
                  Overs Played: {stat.oversPlayed}
                </p>
                <p className="mt-1 text-gray-400">Run Rate: {stat.runRate}</p>
                <p className="mt-1 text-gray-400">
                  Wickets Taken: {stat.wicketsTaken}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-gray-800 bg-gray-900 p-6 text-gray-400">
            No team stats available.
          </div>
        )}
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-semibold">Player Stats</h2>

        {match.playerStats?.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2">
            {match.playerStats.map((stat) => (
              <div
                key={stat.id}
                className="rounded-2xl border border-gray-800 bg-gray-900 p-5"
              >
                <p className="text-gray-300">{stat.player?.name}</p>
                <p className="mt-2 text-gray-400">Runs: {stat.runs}</p>
                <p className="mt-1 text-gray-400">Balls: {stat.ballsFaced}</p>
                <p className="mt-1 text-gray-400">4s: {stat.fours}</p>
                <p className="mt-1 text-gray-400">6s: {stat.sixes}</p>
                <p className="mt-1 text-gray-400">
                  Strike Rate: {stat.strikeRate}
                </p>
                <p className="mt-1 text-gray-400">Wickets: {stat.wickets}</p>
                <p className="mt-1 text-gray-400">
                  Overs Bowled: {stat.oversBowled}
                </p>
                <p className="mt-1 text-gray-400">
                  Runs Conceded: {stat.runsConceded}
                </p>
                <p className="mt-1 text-gray-400">Economy: {stat.economy}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-gray-800 bg-gray-900 p-6 text-gray-400">
            No player stats available.
          </div>
        )}
      </section>
    </main>
  );
}