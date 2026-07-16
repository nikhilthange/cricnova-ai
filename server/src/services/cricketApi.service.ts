const axios = require("axios");

const API_KEY = process.env.CRICKET_API_KEY;
const BASE_URL = "https://api.cricapi.com/v1";

// --- In-Memory Cache Setup ---
const cache = new Map();
const CACHE_TTL = 15 * 60 * 1000; // 15 minutes in milliseconds

/**
 * Helper function to fetch data from API or return cached data if valid.
 */
const fetchWithCache = async (endpoint, params) => {
  const url = `${BASE_URL}${endpoint}`;
  
  // Create a unique cache key based on the URL and all parameters
  const cacheKey = `${url}?${new URLSearchParams(params).toString()}`;
  const now = Date.now();

  if (cache.has(cacheKey)) {
    const cachedEntry = cache.get(cacheKey);
    if (now < cachedEntry.expiry) {
      console.log(`[CACHE HIT] Serving ${endpoint} from memory (Expires in ${Math.round((cachedEntry.expiry - now) / 1000)}s)`);
      return cachedEntry.data;
    }
  }

  console.log(`[API CALL] Fetching ${endpoint} from CricAPI...`);
  try {
    const response = await axios.get(url, { params });
    
    // CricAPI returns status inside the response data for some failures
    if (response.data && response.data.status !== "failure") {
      cache.set(cacheKey, { data: response.data, expiry: now + CACHE_TTL });
    }
    
    return response.data;
  } catch (error) {
    console.error(`[API ERROR] Failed to fetch ${endpoint}:`, error.message);
    // If the API fails but we have stale cache, serve the stale cache as a fallback!
    if (cache.has(cacheKey)) {
      console.log(`[CACHE FALLBACK] Serving stale cache for ${endpoint} due to API error`);
      return cache.get(cacheKey).data;
    }
    throw error;
  }
};
// -----------------------------

const getCurrentMatches = async () => {
  return fetchWithCache('/currentMatches', { apikey: API_KEY, offset: 0 });
};

const getMatches = async () => {
  return fetchWithCache('/matches', { apikey: API_KEY, offset: 0 });
};

const getSeriesList = async () => {
  return fetchWithCache('/series', { apikey: API_KEY, offset: 0 });
};

const getSeriesStandings = async (seriesId) => {
  return fetchWithCache('/series_standings', { apikey: API_KEY, id: seriesId });
};

const getPlayers = async (searchQuery) => {
  return fetchWithCache('/players', { apikey: API_KEY, search: searchQuery, offset: 0 });
};

const getMatchInfo = async (matchId) => {
  return fetchWithCache('/match_info', { apikey: API_KEY, id: matchId });
};

const getMatchScorecard = async (matchId) => {
  return fetchWithCache('/match_scorecard', { apikey: API_KEY, id: matchId });
};

module.exports = {
  getCurrentMatches,
  getMatches,
  getSeriesList,
  getSeriesStandings,
  getPlayers,
  getMatchInfo,
  getMatchScorecard
};