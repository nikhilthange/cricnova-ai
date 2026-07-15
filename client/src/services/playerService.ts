import api from "./api";

const mockPlayers = [
  { id: 1, name: "Virat Kohli", country: "India", role: "Batter", matches: 275, runs: 12898, average: 57.3 },
  { id: 2, name: "Pat Cummins", country: "Australia", role: "Bowler", matches: 75, wickets: 124, economy: 5.2 },
  { id: 3, name: "Ben Stokes", country: "England", role: "All-rounder", matches: 105, runs: 2924, wickets: 74 },
];

export const getAllPlayers = async () => {
  try {
    const response = await api.get('/api/players');
    return response.data;
  } catch (error) {
    console.warn("API failed, using mock data");
    return mockPlayers;
  }
};

export const getPlayerById = async (id) => {
  try {
    const response = await api.get(`/api/players/${id}`);
    return response.data;
  } catch (error) {
    return mockPlayers.find(p => p.id == id) || mockPlayers[0];
  }
};