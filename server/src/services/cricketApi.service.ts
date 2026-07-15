const axios = require("axios");

const API_KEY = process.env.CRICKET_API_KEY;
const BASE_URL = "https://api.cricapi.com/v1";

const getCurrentMatches = async () => {
  const response = await axios.get(`${BASE_URL}/currentMatches`, {
    params: { apikey: API_KEY, offset: 0 },
  });
  return response.data;
};

const getMatches = async () => {
  const response = await axios.get(`${BASE_URL}/matches`, {
    params: { apikey: API_KEY, offset: 0 },
  });
  return response.data;
};

const getSeriesStandings = async (seriesId) => {
  const response = await axios.get(`${BASE_URL}/series_standings`, {
    params: { apikey: API_KEY, id: seriesId },
  });
  return response.data;
};

const getPlayers = async (searchQuery) => {
  const response = await axios.get(`${BASE_URL}/players`, {
    params: { apikey: API_KEY, search: searchQuery, offset: 0 },
  });
  return response.data;
};

module.exports = {
  getCurrentMatches,
  getMatches,
  getSeriesStandings,
  getPlayers
};