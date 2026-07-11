export default function PredictionCard({ prediction }) {
  return (
    <div className="rounded-2xl border border-gray-800 bg-gray-900 p-5 shadow-md">
      <h3 className="mb-3 text-xl font-semibold text-white">Prediction</h3>

      <p className="text-sm text-gray-300">
        Predicted Winner: {prediction.predictedWinner || "N/A"}
      </p>
      <p className="mt-2 text-sm text-gray-400">
        Home Win %: {prediction.homeWinProbability ?? "N/A"}
      </p>
      <p className="mt-1 text-sm text-gray-400">
        Away Win %: {prediction.awayWinProbability ?? "N/A"}
      </p>
      <p className="mt-1 text-sm text-gray-400">
        Projected Total: {prediction.projectedTotal ?? "N/A"}
      </p>
      <p className="mt-1 text-sm text-gray-400">
        Top Scorer: {prediction.topScorer || "N/A"}
      </p>
      <p className="mt-1 text-sm text-gray-400">
        Top Wicket Taker: {prediction.topWicketTaker || "N/A"}
      </p>
      <p className="mt-1 text-sm text-gray-400">
        Confidence: {prediction.confidence ?? "N/A"}%
      </p>
    </div>
  );
}