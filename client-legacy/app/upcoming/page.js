"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import API_BASE_URL from "../../services/api";

export default function UpcomingPage() {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/matches/upcoming`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch upcoming matches");
        }
        return res.json();
      })
      .then((data) => {
        setMatches(data.data || []);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Failed to fetch upcoming matches:", error);
        setError("Failed to load upcoming matches");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-black p-6 text-white">
        <h1 className="mb-6 text-3xl font-bold">Upcoming Matches</h1>
        <p>Loading upcoming matches...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black p-6 text-white">
        <h1 className="mb-6 text-3xl font-bold">Upcoming Matches</h1>
        <p className="text-red-400">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black p-6 text-white">
      <h1 className="mb-6 text-3xl font-bold">Upcoming Matches</h1>

      {matches.length === 0 ? (
        <p className="text-gray-400">No upcoming matches found.</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {matches.map((match, index) => (
            <Link href={`/upcoming/${match.id || index}`} key={match.id || index}>
              <div className="cursor-pointer rounded-lg border border-gray-700 p-4 hover:bg-gray-800">
                <h2 className="text-xl font-semibold">
                  {match.title || match.name || "Upcoming Match"}
                </h2>

                <p className="mt-2 text-gray-400">
                  {match.homeTeam?.name ||
                    match.teamInfo?.[0]?.name ||
                    match.teams?.[0] ||
                    "Team 1"}{" "}
                  vs{" "}
                  {match.awayTeam?.name ||
                    match.teamInfo?.[1]?.name ||
                    match.teams?.[1] ||
                    "Team 2"}
                </p>

                <p className="text-gray-500">
                  {match.matchDate
                    ? new Date(match.matchDate).toLocaleString()
                    : match.dateTimeGMT
                    ? new Date(match.dateTimeGMT).toLocaleString()
                    : "Date not available"}
                </p>

                <p className="text-yellow-400">
                  {match.status || match.ms || "Upcoming"}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}