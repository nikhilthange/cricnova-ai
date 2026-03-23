"use client";

import { use, useEffect, useState } from "react";
import API_BASE_URL from "../../../services/api";
import MatchDetailView from "../../../components/MatchDetailView";

export default function UpcomingMatchDetailPage({ params }) {
  const resolvedParams = use(params);
  const matchId = resolvedParams.id;

  const [match, setMatch] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/matches/upcoming`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch upcoming matches");
        }
        return res.json();
      })
      .then((data) => {
        const allMatches = data.data || [];
        const foundMatch = allMatches.find(
          (m) => String(m.id) === String(matchId)
        );
        setMatch(foundMatch || null);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Failed to fetch upcoming match details:", error);
        setLoading(false);
      });
  }, [matchId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black p-6 text-white">
        <h1 className="text-3xl font-bold">Upcoming Match Details</h1>
        <p className="mt-4">Loading match details...</p>
      </div>
    );
  }

  return <MatchDetailView match={match} type="upcoming" />;
}