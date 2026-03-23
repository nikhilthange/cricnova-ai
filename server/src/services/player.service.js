import API_BASE_URL from "./api";

export const getAllPlayers = async (offset = 0) => {
  const response = await fetch(`${API_BASE_URL}/api/players?offset=${offset}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch players");
  }

  return response.json();
};

export const getPlayerById = async (id) => {
  const response = await fetch(`${API_BASE_URL}/api/players/${id}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch player");
  }

  return response.json();
};