"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import API_BASE_URL from "../../services/api";

export default function MatchesPage() {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE_URL}/matches`)
      .then((res) => res.json())
      .then((data) => {
        setMatches(data.data || []);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Failed to fetch matches:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-black p-6 text-white">
        <h1 className="mb-4 text-2xl font-bold">Matches</h1>
        <p>Loading matches...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black p-6 text-white">
      <h1 className="mb-6 text-2xl font-bold">Matches</h1>

      {matches.length === 0 ? (
        <p className="text-gray-400">No matches found.</p>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {matches.map((match) => (
            <Link href={`/matches/${match.id}`} key={match.id}>
              <div className="cursor-pointer rounded-lg border border-gray-700 p-4 hover:bg-gray-800">
                <h2 className="text-lg font-semibold">{match.title}</h2>
                <p className="text-sm text-gray-400">Status: {match.status}</p>
                <p className="text-sm text-gray-400">
                  {match.homeTeam?.name || "Home Team"} vs{" "}
                  {match.awayTeam?.name || "Away Team"}
                </p>
                <p className="text-sm text-gray-500">
                  {match.matchDate
                    ? new Date(match.matchDate).toLocaleString()
                    : "Date not available"}
                </p>
                <p className="mt-2 text-sm text-gray-400">
                  Venue: {match.venue?.name || "Not available"}
                </p>
                <p className="text-sm text-gray-400">
                  Tournament: {match.tournament?.name || "Not available"}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}