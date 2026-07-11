"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import API_BASE_URL from "../../services/api";

export default function TeamsPage() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/teams`)
      .then((res) => res.json())
      .then((data) => {
        setTeams(data.data || []);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Failed to fetch teams:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-black p-6 text-white">
        <h1 className="mb-4 text-2xl font-bold">Teams</h1>
        <p>Loading teams...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black p-6 text-white">
      <h1 className="mb-6 text-2xl font-bold">Teams</h1>

      {teams.length === 0 ? (
        <p className="text-gray-400">No teams found.</p>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {teams.map((team) => (
            <Link href={`/teams/${team.id}`} key={team.id}>
              <div className="cursor-pointer rounded-lg border border-gray-700 p-4 hover:bg-gray-800">
                <h2 className="text-lg font-semibold">{team.name}</h2>
                <p className="text-sm text-gray-400">
                  Short Name: {team.shortName}
                </p>
                <p className="text-sm text-gray-400">
                  Country: {team.country || "N/A"}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}