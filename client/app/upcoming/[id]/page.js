"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import API_BASE_URL from "../../../services/api";

export default function UpcomingMatchPredictionPage() {
  const params = useParams();
  const id = params?.id;

  const [match, setMatch] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    Promise.all([
      fetch(`${API_BASE_URL}/matches/${id}`).then((res) => res.json()),
      fetch(`${API_BASE_URL}/upcoming-prediction/${id}`).then((res) => res.json()),
    ])
      .then(([matchData, predictionData]) => {
        setMatch(matchData.data || null);
        setPrediction(predictionData.data || null);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Failed to fetch upcoming prediction page:", error);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black p-6 text-white">
        <p>Loading upcoming match prediction...</p>
      </div>
    );
  }

  if (!match || !prediction) {
    return (
      <div className="min-h-screen bg-black p-6 text-white">
        <p>Upcoming match prediction not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black p-6 text-white">
      <h1 className="mb-4 text-3xl font-bold">{match.title}</h1>

      <div className="mb-6 rounded-lg border border-gray-700 p-4">
        <p className="text-lg">
          {match.homeTeam?.name} vs {match.awayTeam?.name}
        </p>
        <p className="mt-2 text-gray-400">Status: {match.status}</p>
        <p className="text-gray-400">
          Date:{" "}
          {match.matchDate
            ? new Date(match.matchDate).toLocaleString()
            : "Not available"}
        </p>
        <p className="text-gray-400">
          Venue: {match.venue?.name || "Not available"}
        </p>
        <p className="text-gray-400">
          Tournament: {match.tournament?.name || "Not available"}
        </p>
      </div>

      <div className="mb-6 rounded-lg border border-green-500 bg-green-900/20 p-4">
        <h2 className="mb-2 text-2xl font-semibold text-green-400">
          Upcoming Match AI Prediction
        </h2>

        <p className="text-xl font-semibold">
          🏆 Predicted Winner: {prediction.predictedWinner}
        </p>

        <p className="text-gray-300">
          Home Win %: {prediction.homeWinProbability}
        </p>

        <p className="text-gray-300">
          Away Win %: {prediction.awayWinProbability}
        </p>

        <p className="text-green-400 font-semibold">
          Confidence: {prediction.confidence}%
        </p>
      </div>

      <div className="mb-6 rounded-lg border border-gray-700 p-4">
        <h2 className="mb-3 text-2xl font-semibold">Projected Scores</h2>

        <div className="grid grid-cols-2 gap-3 md:grid-cols-5">
          <div className="rounded bg-gray-800 p-3 text-center">
            <p className="text-sm text-gray-400">Powerplay</p>
            <p className="text-xl font-bold">{prediction.projectedPowerplay}</p>
          </div>

          <div className="rounded bg-gray-800 p-3 text-center">
            <p className="text-sm text-gray-400">10 Overs</p>
            <p className="text-xl font-bold">{prediction.projected10Over}</p>
          </div>

          <div className="rounded bg-gray-800 p-3 text-center">
            <p className="text-sm text-gray-400">12 Overs</p>
            <p className="text-xl font-bold">{prediction.projected12Over}</p>
          </div>

          <div className="rounded bg-gray-800 p-3 text-center">
            <p className="text-sm text-gray-400">15 Overs</p>
            <p className="text-xl font-bold">{prediction.projected15Over}</p>
          </div>

          <div className="rounded bg-gray-800 p-3 text-center">
            <p className="text-sm text-gray-400">20 Overs</p>
            <p className="text-xl font-bold">{prediction.projected20Over}</p>
          </div>
        </div>
      </div>

      <div className="rounded-lg border border-gray-700 p-4">
        <h2 className="mb-3 text-2xl font-semibold">Likely Key Performers</h2>
        <p className="text-gray-300">⭐ Top Scorer: {prediction.topScorer}</p>
        <p className="text-gray-300">
          🎯 Top Wicket Taker: {prediction.topWicketTaker}
        </p>
      </div>
    </div>
  );
}