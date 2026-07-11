import API_BASE_URL from "./api";

export const getLiveMatches = async () => {
  const response = await fetch(`${API_BASE_URL}/live`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch live matches");
  }

  return response.json();
};

export const getLiveMatchById = async (id) => {
  const response = await fetch(`${API_BASE_URL}/live/${id}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch live match");
  }

  return response.json();
};