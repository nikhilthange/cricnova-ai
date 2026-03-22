"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import API_BASE_URL from "../../services/api";

export default function LivePage() {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE_URL}/live`)
      .then((res) => res.json())
      .then((data) => {
        setMatches(data.data || []);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Failed to fetch live matches:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-black p-6 text-white">
        <h1 className="mb-6 text-3xl font-bold">Live Matches</h1>
        <p>Loading live matches...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black p-6 text-white">
      <h1 className="mb-6 text-3xl font-bold">Live Matches</h1>

      {matches.length === 0 ? (
        <p className="text-gray-400">No live matches right now.</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {matches.map((match) => (
            <Link href={`/live/${match.id}`} key={match.id}>
              <div className="cursor-pointer rounded-lg border border-gray-700 p-4 hover:bg-gray-800">
                <div className="mb-2 flex items-center justify-between">
                  <h2 className="text-xl font-semibold">{match.title}</h2>
                  <span className="rounded bg-red-600 px-2 py-1 text-xs font-bold">
                    LIVE
                  </span>
                </div>

                <p className="text-green-400">
                  {match.currentScore} ({match.overs})
                </p>

                <p className="mt-2 text-gray-400">
                  {match.homeTeam?.name} vs {match.awayTeam?.name}
                </p>

                <p className="text-gray-500">{match.venue?.name}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}