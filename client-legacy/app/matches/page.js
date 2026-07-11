"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import API_BASE_URL from "../../services/api";

export default function MatchesPage() {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/matches`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch matches");
        }
        return res.json();
      })
      .then((data) => {
        setMatches(data.data || []);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Failed to fetch matches:", error);
        setError("Failed to load matches");
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

  if (error) {
    return (
      <div className="min-h-screen bg-black p-6 text-white">
        <h1 className="mb-4 text-2xl font-bold">Matches</h1>
        <p className="text-red-400">{error}</p>
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
          {matches.map((match, index) => (
            <Link href={`/matches/${match.id || index}`} key={match.id || index}>
              <div className="cursor-pointer rounded-lg border border-gray-700 p-4 hover:bg-gray-800">
                <h2 className="text-lg font-semibold">
                  {match.title || match.name || "Match"}
                </h2>

                <p className="text-sm text-gray-400">
                  Status: {match.status || "Not available"}
                </p>

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