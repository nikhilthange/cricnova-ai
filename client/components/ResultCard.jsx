import Link from "next/link";

export default function ResultCard({ match }) {
  return (
    <Link href={`/matches/${match.id}`}>
      <div className="rounded-2xl border border-gray-800 bg-gray-900 p-5 transition hover:border-gray-600 hover:bg-gray-800">
        <h3 className="text-lg font-semibold text-white">{match.title}</h3>
        <p className="mt-2 text-sm text-gray-400">
          {match.homeTeam?.name} vs {match.awayTeam?.name}
        </p>
        <p className="mt-2 text-sm text-gray-400">
          {match.resultSummary || "Result not available"}
        </p>
        <p className="mt-1 text-sm text-gray-500">
          {new Date(match.matchDate).toLocaleString()}
        </p>
      </div>
    </Link>
  );
}