import API_BASE_URL from "./api";

export const getAllMatches = async () => {
  const res = await fetch(`${API_BASE_URL}/api/matches`, {
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Failed to fetch matches");
  return res.json();
};

export const getLiveMatches = async () => {
  const res = await fetch(`${API_BASE_URL}/api/matches/live`, {
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Failed to fetch live matches");
  return res.json();
};

export const getUpcomingMatches = async () => {
  const res = await fetch(`${API_BASE_URL}/api/matches/upcoming`, {
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Failed to fetch upcoming matches");
  return res.json();
};