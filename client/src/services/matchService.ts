import api from "./api";

// High-quality mock data for the redesign demo
const mockMatches = [
  { 
    id: 1, 
    team1: { name: "India", code: "IND", logo: "🇮🇳" }, 
    team2: { name: "Australia", code: "AUS", logo: "🇦🇺" }, 
    status: "LIVE", 
    score1: "210/4 (20.0)", 
    score2: "0/0 (0.0)", 
    toss: "India elected to bat first",
    venue: "Wankhede Stadium, Mumbai",
    momentum: 75
  },
  { 
    id: 2, 
    team1: { name: "England", code: "ENG", logo: "🏴󠁧󠁢󠁥󠁮󠁧󠁿" }, 
    team2: { name: "New Zealand", code: "NZ", logo: "🇳🇿" }, 
    status: "COMPLETED", 
    score1: "312/8 (50.0)", 
    score2: "298/10 (48.3)", 
    result: "England won by 14 runs",
    venue: "Lord's, London"
  },
  { 
    id: 3, 
    team1: { name: "South Africa", code: "SA", logo: "🇿🇦" }, 
    team2: { name: "Pakistan", code: "PAK", logo: "🇵🇰" }, 
    status: "UPCOMING", 
    date: "Tomorrow, 14:00 GMT",
    venue: "Wanderers, Johannesburg"
  },
];

export const getAllMatches = async () => {
  try {
    const response = await api.get('/api/matches');
    return response.data;
  } catch (error) {
    console.warn("API failed, using mock data");
    return mockMatches;
  }
};

export const getMatchById = async (id) => {
  try {
    const response = await api.get(`/api/matches/${id}`);
    return response.data;
  } catch (error) {
    return mockMatches.find(m => m.id == id) || mockMatches[0];
  }
};

export const getLiveMatches = async () => {
  try {
    const response = await api.get('/api/matches/live');
    return response.data;
  } catch (error) {
    return mockMatches.filter(m => m.status === 'LIVE');
  }
};

export const getUpcomingMatches = async () => {
  try {
    const response = await api.get('/api/matches/upcoming');
    return response.data;
  } catch (error) {
    return mockMatches.filter(m => m.status === 'UPCOMING');
  }
};