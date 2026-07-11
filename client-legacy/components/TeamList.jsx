"use client";

import { useMemo, useState } from "react";
import TeamCard from "./TeamCard";
import EmptyState from "./EmptyState";

export default function TeamList({ teams }) {
  const [query, setQuery] = useState("");

  const filteredTeams = useMemo(() => {
    const q = query.toLowerCase().trim();

    if (!q) return teams;

    return teams.filter((team) => {
      return (
        team.name.toLowerCase().includes(q) ||
        team.shortName.toLowerCase().includes(q) ||
        (team.country || "").toLowerCase().includes(q)
      );
    });
  }, [teams, query]);

  return (
    <div>
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search teams by name, short name, or country..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full rounded-xl border border-gray-700 bg-gray-900 px-4 py-3 text-white outline-none placeholder:text-gray-500"
        />
      </div>

      {filteredTeams.length === 0 ? (
        <EmptyState
          title="No matching teams found"
          subtitle="Try another search term."
        />
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredTeams.map((team) => (
            <TeamCard key={team.id} team={team} />
          ))}
        </div>
      )}
    </div>
  );
}