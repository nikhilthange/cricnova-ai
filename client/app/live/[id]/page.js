"use client";

import { use, useEffect, useState } from "react";
import API_BASE_URL from "../../../services/api";
import MatchDetailView from "../../../components/MatchDetailView";
import AIPredictionPanel from "../../../components/AIPredictionPanel";

export default function LiveMatchDetailPage({ params }) {
  const resolvedParams = use(params);
  const matchId = resolvedParams.id;

  const [match, setMatch] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let intervalId;

    const fetchMatch = async (isFirstLoad = false) => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/matches/live`, {
          cache: "no-store",
        });

        if (!res.ok) {
          throw new Error("Failed to fetch live matches");
        }

        const data = await res.json();
        const allMatches = data.data || [];

        const foundMatch = allMatches.find(
          (m) => String(m.id) === String(matchId)
        );

        setMatch(foundMatch || null);
      } catch (error) {
        console.error("Failed to fetch live match details:", error);
      } finally {
        if (isFirstLoad) setLoading(false);
      }
    };

    fetchMatch(true);

    intervalId = setInterval(() => {
      fetchMatch(false);
    }, 20000);

    return () => clearInterval(intervalId);
  }, [matchId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black p-6 text-white">
        <h1 className="text-3xl font-bold">Live Match Details</h1>
        <p className="mt-4">Loading match details...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="bg-black px-6 pt-4 text-right text-xs text-gray-400">
        Auto-refresh every 20 seconds
      </div>

      <div className="mx-auto max-w-6xl space-y-6 px-6 pb-10">
        <MatchDetailView match={match} type="live" />
        <AIPredictionPanel match={match} />
      </div>
    </div>
  );
}