import API_BASE_URL from "./api";

export const getAllMatches = async () => {
  const response = await fetch(`${API_BASE_URL}/api/matches`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch matches");
  }

  return response.json();
};

export const getMatchById = async (id) => {
  const response = await fetch(`${API_BASE_URL}/api/matches/${id}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch match");
  }

  return response.json();
};

export const getLiveMatches = async () => {
  const response = await fetch(`${API_BASE_URL}/api/matches/live`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch live matches");
  }

  return response.json();
};

export const getUpcomingMatches = async () => {
  const response = await fetch(`${API_BASE_URL}/api/matches/upcoming`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch upcoming matches");
  }

  return response.json();
};