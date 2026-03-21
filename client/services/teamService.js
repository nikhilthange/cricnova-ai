import API_BASE_URL from "./api";

export const getAllTeams = async () => {
  const response = await fetch(`${API_BASE_URL}/teams`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch teams");
  }

  return response.json();
};

export const getTeamById = async (id) => {
  const response = await fetch(`${API_BASE_URL}/teams/${id}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch team");
  }

  return response.json();
};