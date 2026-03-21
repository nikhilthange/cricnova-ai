import Link from "next/link";

export default function MatchCard({ match }) {
  return (
    <Link href={`/matches/${match.id}`}>
      <div className="rounded-2xl border border-gray-800 bg-gray-900 p-5 shadow-md transition hover:border-gray-600 hover:bg-gray-800">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-xl font-bold text-white">{match.title}</h2>
          <span className="rounded-full border border-gray-700 px-3 py-1 text-xs text-gray-300">
            {match.status}
          </span>
        </div>

        <p className="text-sm text-gray-400">
          {match.homeTeam?.name} vs {match.awayTeam?.name}
        </p>

        <p className="mt-2 text-sm text-gray-400">
          Venue: {match.venue?.name || "N/A"}
        </p>

        <p className="mt-1 text-sm text-gray-400">
          Tournament: {match.tournament?.name || "N/A"}
        </p>

        <p className="mt-1 text-sm text-gray-400">
          Date: {new Date(match.matchDate).toLocaleString()}
        </p>
      </div>
    </Link>
  );
}