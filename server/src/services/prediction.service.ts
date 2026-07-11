import API_BASE_URL from "./api";

export const getAllUpcomingPredictions = async () => {
  const response = await fetch(`${API_BASE_URL}/api/upcoming-predictions`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch upcoming predictions");
  }

  return response.json();
};

export const getUpcomingPredictionById = async (id) => {
  const response = await fetch(`${API_BASE_URL}/api/upcoming-predictions/${id}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch upcoming prediction");
  }

  return response.json();
};

export const createUpcomingPrediction = async (predictionData) => {
  const response = await fetch(`${API_BASE_URL}/api/upcoming-predictions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(predictionData),
  });

  if (!response.ok) {
    throw new Error("Failed to create upcoming prediction");
  }

  return response.json();
};