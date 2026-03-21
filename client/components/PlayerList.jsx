"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import EmptyState from "./EmptyState";

export default function PlayerList({ players }) {
  const [query, setQuery] = useState("");

  const filteredPlayers = useMemo(() => {
    const q = query.toLowerCase().trim();

    if (!q) return players;

    return players.filter((player) => {
      return (
        player.name.toLowerCase().includes(q) ||
        player.role.toLowerCase().includes(q) ||
        (player.team?.name || "").toLowerCase().includes(q) ||
        (player.nationality || "").toLowerCase().includes(q)
      );
    });
  }, [players, query]);

  return (
    <div>
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search players by name, role, team, or nationality..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full rounded-xl border border-gray-700 bg-gray-900 px-4 py-3 text-white outline-none placeholder:text-gray-500"
        />
      </div>

      {filteredPlayers.length === 0 ? (
        <EmptyState
          title="No matching players found"
          subtitle="Try another search term."
        />
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredPlayers.map((player) => (
            <Link key={player.id} href={`/players/${player.id}`}>
              <div className="rounded-2xl border border-gray-800 bg-gray-900 p-5 transition hover:border-gray-600 hover:bg-gray-800">
                <h2 className="text-xl font-bold">{player.name}</h2>
                <p className="mt-2 text-sm text-gray-400">Role: {player.role}</p>
                <p className="mt-1 text-sm text-gray-400">
                  Team: {player.team?.name || "N/A"}
                </p>
                <p className="mt-1 text-sm text-gray-400">
                  Nationality: {player.nationality || "N/A"}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}