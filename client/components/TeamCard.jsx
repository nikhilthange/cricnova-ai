import Link from "next/link";

export default function TeamCard({ team }) {
  return (
    <Link href={`/teams/${team.id}`}>
      <div className="rounded-2xl border border-gray-800 bg-gray-900 p-5 shadow-md transition hover:border-gray-600 hover:bg-gray-800">
        <h2 className="text-xl font-bold text-white">{team.name}</h2>
        <p className="mt-2 text-sm text-gray-400">Short Name: {team.shortName}</p>
        <p className="mt-1 text-sm text-gray-400">
          Country: {team.country || "N/A"}
        </p>
      </div>
    </Link>
  );
}