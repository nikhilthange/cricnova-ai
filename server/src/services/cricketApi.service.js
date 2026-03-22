const axios = require("axios");

const API_KEY = process.env.CRICKET_API_KEY;
const BASE_URL = "https://api.cricapi.com/v1";

const getCurrentMatches = async () => {
  const response = await axios.get(`${BASE_URL}/currentMatches`, {
    params: {
      apikey: API_KEY,
      offset: 0,
    },
  });

  return response.data;
};

module.exports = {
  getCurrentMatches,
};