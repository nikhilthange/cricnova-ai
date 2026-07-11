import { getTeamById } from "../../../services/teamService";

export const dynamic = "force-dynamic";

export default async function TeamDetailsPage({ params }) {
  const { id } = await params;

  let team = null;

  try {
    const result = await getTeamById(id);
    team = result.data;
  } catch (error) {
    console.error("TEAM FETCH ERROR:", error);
    return (
      <main className="min-h-screen bg-black p-10 text-white">
        <p className="text-red-500">Failed to fetch team</p>
      </main>
    );
  }

  if (!team) {
    return (
      <main className="min-h-screen bg-black p-10 text-white">
        <p>No team found</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black p-10 text-white">
      <h1 className="mb-4 text-4xl font-bold">{team.name}</h1>
      <p className="mb-2">Short Name: {team.shortName}</p>
      <p className="mb-6">Country: {team.country || "N/A"}</p>

      <h2 className="mb-3 text-2xl font-semibold">Players</h2>

      {team.players?.length > 0 ? (
        <div className="space-y-2">
          {team.players.map((player) => (
            <div
              key={player.id}
              className="rounded-lg border border-gray-700 bg-gray-900 p-3"
            >
              <p>{player.name}</p>
              <p className="text-sm text-gray-400">{player.role}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No players found</p>
      )}
    </main>
  );
}