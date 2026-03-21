import { getPlayerById } from "../../../services/playerService";

export const dynamic = "force-dynamic";

export default async function PlayerDetailsPage({ params }) {
  const { id } = await params;

  let player = null;

  try {
    const result = await getPlayerById(id);
    player = result.data;
  } catch (error) {
    return (
      <main className="min-h-screen bg-black p-10 text-white">
        <p className="text-red-500">Failed to fetch player</p>
      </main>
    );
  }

  if (!player) {
    return (
      <main className="min-h-screen bg-black p-10 text-white">
        <p>No player found</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black p-10 text-white">
      <h1 className="mb-4 text-4xl font-bold">{player.name}</h1>

      <div className="mb-8 rounded-2xl border border-gray-800 bg-gray-900 p-6">
        <p className="text-gray-300">Role: {player.role}</p>
        <p className="mt-2 text-gray-400">
          Team: {player.team?.name || "N/A"}
        </p>
        <p className="mt-1 text-gray-400">
          Nationality: {player.nationality || "N/A"}
        </p>
        <p className="mt-1 text-gray-400">
          Batting Style: {player.battingStyle || "N/A"}
        </p>
        <p className="mt-1 text-gray-400">
          Bowling Style: {player.bowlingStyle || "N/A"}
        </p>
      </div>

      <section>
        <h2 className="mb-4 text-2xl font-semibold">Match Performances</h2>

        {player.playerStats?.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2">
            {player.playerStats.map((stat) => (
              <div
                key={stat.id}
                className="rounded-2xl border border-gray-800 bg-gray-900 p-5"
              >
                <p className="text-lg font-semibold text-white">
                  {stat.match?.title || "Match"}
                </p>
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
                <p className="mt-1 text-gray-400">Catches: {stat.catches}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-gray-800 bg-gray-900 p-6 text-gray-400">
            No match performances available.
          </div>
        )}
      </section>
    </main>
  );
}