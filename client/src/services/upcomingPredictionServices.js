import API_BASE_URL from "./api";

export const getUpcomingPredictionByMatchId = async (matchId) => {
  const response = await fetch(`${API_BASE_URL}/upcoming-prediction/${matchId}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch upcoming prediction");
  }

  return response.json();
};