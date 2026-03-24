"use client";

import { use, useEffect, useState } from "react";
import API_BASE_URL from "../../../services/api";
import MatchDetailView from "../../../components/MatchDetailView";
import AIPredictionPanel from "../../../components/AIPredictionPanel";
import MomentumBar from "../../../components/MomentumBar";
import TossImpactCard from "../../../components/TossImpactCard";

export default function LiveMatchDetailPage({ params }) {
  const resolvedParams = use(params);
  const matchId = resolvedParams.id;

  const [match, setMatch] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(null);

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
        setLastUpdated(new Date());
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
      <div className="flex items-center justify-between px-6 pt-4">
        <div className="flex items-center gap-3">
          <span className="relative flex h-3 w-3">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-75"></span>
            <span className="relative inline-flex h-3 w-3 rounded-full bg-red-600"></span>
          </span>
          <p className="text-sm font-semibold text-red-400">LIVE</p>
        </div>

        <div className="flex items-center gap-4 text-sm text-gray-400">
          <p>
            Updated:{" "}
            {lastUpdated ? lastUpdated.toLocaleTimeString() : "Loading..."}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="rounded bg-gray-800 px-3 py-1 hover:bg-gray-700"
          >
            Refresh
          </button>
        </div>
      </div>

      <div className="mx-auto max-w-6xl space-y-6 px-6 pb-10">
        <MatchDetailView match={match} type="live" />
        <AIPredictionPanel match={match} />
        <MomentumBar match={match} />
      </div>
      <div className="mx-auto max-w-6xl space-y-6 px-6 pb-10">
        <MatchDetailView match={match} type="live" />
        <AIPredictionPanel match={match} />
        <MomentumBar match={match} />
        <TossImpactCard match={match} />
      </div>
    </div>
  );
}