import API_BASE_URL from "./api";

export const getAllPlayers = async () => {
  const response = await fetch(`${API_BASE_URL}/players`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch players");
  }

  return response.json();
};

export const getPlayerById = async (id) => {
  const response = await fetch(`${API_BASE_URL}/players/${id}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch player");
  }

  return response.json();
};