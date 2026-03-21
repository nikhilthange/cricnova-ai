import API_BASE_URL from "./api";

export const getAllMatches = async () => {
  const response = await fetch(`${API_BASE_URL}/matches`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch matches");
  }

  return response.json();
};

export const getMatchById = async (id) => {
  const response = await fetch(`${API_BASE_URL}/matches/${id}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch match");
  }

  return response.json();
};