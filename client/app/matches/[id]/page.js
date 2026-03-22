"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import API_BASE_URL from "../../../services/api";

export default function MatchDetailsPage() {
  const { id } = useParams();
  const [match, setMatch] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE_URL}/matches/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setMatch(data.data || null);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Failed to fetch match:", error);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black p-6 text-white">
        <p>Loading match details...</p>
      </div>
    );
  }

  if (!match) {
    return (
      <div className="min-h-screen bg-black p-6 text-white">
        <p>Match not found.</p>
      </div>
    );
  }

  const prediction =
    match.predictions && match.predictions.length > 0
      ? match.predictions[0]
      : null;

  return (
    <div className="min-h-screen bg-black p-6 text-white">
      <h1 className="mb-4 text-3xl font-bold">{match.title}</h1>

      <div className="mb-6 rounded-lg border border-gray-700 p-4">
        <p className="text-lg">
          {match.homeTeam?.name || "Home Team"} vs{" "}
          {match.awayTeam?.name || "Away Team"}
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
        <p className="text-gray-400">
          Result: {match.resultSummary || "Not available"}
        </p>
      </div>

      <h2 className="mb-3 text-2xl font-semibold">Prediction</h2>

      {prediction ? (
        <div className="mb-6 rounded-lg border border-gray-700 p-4">
          <p>Predicted Winner: {prediction.predictedWinner || "N/A"}</p>
          <p className="text-gray-400">
            Home Win %: {prediction.homeWinProbability ?? "N/A"}
          </p>
          <p className="text-gray-400">
            Away Win %: {prediction.awayWinProbability ?? "N/A"}
          </p>
          <p className="text-gray-400">
            Projected Total: {prediction.projectedTotal ?? "N/A"}
          </p>
          <p className="text-gray-400">
            Top Scorer: {prediction.topScorer || "N/A"}
          </p>
          <p className="text-gray-400">
            Top Wicket Taker: {prediction.topWicketTaker || "N/A"}
          </p>
          <p className="text-gray-400">
            Confidence: {prediction.confidence ?? "N/A"}%
          </p>
        </div>
      ) : (
        <p className="mb-6 text-gray-400">No prediction available.</p>
      )}
    </div>
  );
}