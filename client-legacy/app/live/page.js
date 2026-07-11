"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import API_BASE_URL from "../../services/api";

export default function LivePage() {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let intervalId;

    const fetchLiveMatches = async (isFirstLoad = false) => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/matches/live`, {
          cache: "no-store",
        });

        if (!res.ok) {
          throw new Error(`HTTP error: ${res.status}`);
        }

        const data = await res.json();

        const liveOnly = (data.data || []).filter((match) => {
          const statusText = String(match.status || "").toLowerCase();
          const msText = String(match.ms || "").toLowerCase();

          return (
            statusText.includes("live") ||
            statusText.includes("in progress") ||
            msText.includes("live") ||
            msText.includes("in progress")
          );
        });

        setMatches(liveOnly);
        setError("");
      } catch (err) {
        console.error("Failed to fetch live matches:", err);
        setError("Failed to load live matches");
      } finally {
        if (isFirstLoad) {
          setLoading(false);
        }
      }
    };

    fetchLiveMatches(true);

    intervalId = setInterval(() => {
      fetchLiveMatches(false);
    }, 10000);

    return () => clearInterval(intervalId);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-black p-6 text-white">
        <h1 className="mb-6 text-3xl font-bold">Live Matches</h1>
        <p>Loading live matches...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black p-6 text-white">
        <h1 className="mb-6 text-3xl font-bold">Live Matches</h1>
        <p className="text-red-400">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black p-6 text-white">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Live Matches</h1>
        <p className="text-sm text-gray-400">Auto-refresh every 10 seconds</p>
      </div>

      {matches.length === 0 ? (
        <p className="text-gray-400">No live matches right now.</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {matches.map((match, index) => (
            <Link href={`/live/${match.id || index}`} key={match.id || index}>
              <div className="cursor-pointer rounded-lg border border-gray-700 p-4 hover:bg-gray-800">
                <div className="mb-2 flex items-center justify-between">
                  <h2 className="text-xl font-semibold">
                    {match.title || match.name || "Live Match"}
                  </h2>
                  <span className="rounded bg-red-600 px-2 py-1 text-xs font-bold">
                    LIVE
                  </span>
                </div>

                <p className="text-green-400">
                  {match.currentScore || match.status || "Score not available"}
                  {match.overs ? ` (${match.overs})` : ""}
                </p>

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
                  {match.venue?.name || match.venue || "Venue not available"}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}