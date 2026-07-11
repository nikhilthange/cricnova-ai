import Link from "next/link";

export default function FeaturedPlayerCard({ player, label }) {
  return (
    <Link href={`/players/${player.id}`}>
      <div className="rounded-2xl border border-gray-800 bg-gray-900 p-6 transition hover:border-gray-600 hover:bg-gray-800">
        {label && (
          <p className="mb-3 text-sm font-medium uppercase tracking-wide text-gray-500">
            {label}
          </p>
        )}
        <h3 className="text-2xl font-bold text-white">{player.name}</h3>
        <p className="mt-2 text-gray-400">Role: {player.role}</p>
        <p className="mt-1 text-gray-400">Team: {player.team?.name || "N/A"}</p>
        <p className="mt-1 text-gray-400">
          Nationality: {player.nationality || "N/A"}
        </p>
      </div>
    </Link>
  );
}