"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import API_BASE_URL from "../../../services/api";

export default function LiveMatchPage() {
  const params = useParams();
  const id = params?.id;

  const [match, setMatch] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    fetch(`${API_BASE_URL}/live/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setMatch(data.data || null);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Failed to fetch live match:", error);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black p-6 text-white">
        <p>Loading live match...</p>
      </div>
    );
  }

  if (!match) {
    return (
      <div className="min-h-screen bg-black p-6 text-white">
        <p>Live match not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black p-6 text-white">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">{match.title}</h1>
        <span className="rounded bg-red-600 px-3 py-1 text-sm font-bold">
          LIVE
        </span>
      </div>

      <div className="mb-6 rounded-lg border border-gray-700 p-4">
        <p className="text-3xl font-bold text-green-400">
          {match.currentScore} ({match.overs})
        </p>
        <p className="mt-2 text-gray-400">Run Rate: {match.runRate}</p>
        <p className="text-gray-400">Striker: {match.striker}</p>
        <p className="text-gray-400">Non-Striker: {match.nonStriker}</p>
        <p className="text-gray-400">Bowler: {match.bowler}</p>
      </div>

      <div className="mb-6 rounded-lg border border-green-500 bg-green-900/20 p-4">
        <h2 className="mb-2 text-2xl font-semibold text-green-400">
          Live AI Prediction
        </h2>

        <p className="text-xl font-semibold">
          🏆 {match.livePrediction?.predictedWinner}
        </p>

        <p className="text-gray-300">
          Win Probability: {match.livePrediction?.winProbability}%
        </p>
      </div>

      <div className="mb-6 rounded-lg border border-gray-700 p-4">
        <h2 className="mb-3 text-2xl font-semibold">Projected Scores</h2>

        <div className="grid grid-cols-2 gap-3 md:grid-cols-5">
          <div className="rounded bg-gray-800 p-3 text-center">
            <p className="text-sm text-gray-400">Powerplay</p>
            <p className="text-xl font-bold">{match.projections?.powerplay}</p>
          </div>

          <div className="rounded bg-gray-800 p-3 text-center">
            <p className="text-sm text-gray-400">10 Overs</p>
            <p className="text-xl font-bold">{match.projections?.over10}</p>
          </div>

          <div className="rounded bg-gray-800 p-3 text-center">
            <p className="text-sm text-gray-400">12 Overs</p>
            <p className="text-xl font-bold">{match.projections?.over12}</p>
          </div>

          <div className="rounded bg-gray-800 p-3 text-center">
            <p className="text-sm text-gray-400">15 Overs</p>
            <p className="text-xl font-bold">{match.projections?.over15}</p>
          </div>

          <div className="rounded bg-gray-800 p-3 text-center">
            <p className="text-sm text-gray-400">20 Overs</p>
            <p className="text-xl font-bold">{match.projections?.over20}</p>
          </div>
        </div>
      </div>

      <div className="rounded-lg border border-gray-700 p-4">
        <h2 className="mb-3 text-2xl font-semibold">Recent Balls</h2>
        <div className="flex flex-wrap gap-2">
          {match.recentBalls?.map((ball, index) => (
            <span
              key={index}
              className="rounded bg-gray-800 px-3 py-2 text-sm"
            >
              {ball}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}