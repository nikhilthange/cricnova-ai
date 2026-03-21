import Link from "next/link";

export default function TeamPreviewCard({ team }) {
  return (
    <Link href={`/teams/${team.id}`}>
      <div className="rounded-2xl border border-gray-800 bg-gray-900 p-4 transition hover:border-gray-600 hover:bg-gray-800">
        <h3 className="text-lg font-semibold text-white">{team.name}</h3>
        <p className="mt-1 text-sm text-gray-400">{team.shortName}</p>
        <p className="mt-1 text-sm text-gray-500">{team.country || "N/A"}</p>
      </div>
    </Link>
  );
}