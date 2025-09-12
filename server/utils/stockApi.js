// server/utils/stockApi.js
const axios = require("axios");

const stockIdMap = {
  apple: 1,
  aapl: 1,
  amazon: 2,
  amzn: 2,
  meta: 3,
  goog: 4,
  microsoft: 5,
  msft: 5,
  nvidia: 6,
  nvda: 6,
  jpmorgan: 7,
  vpmxx: 7,
  tesla: 8,
  tsla: 8,
  walmart: 9,
  wmt: 9,
};

const getStockDetailsFromAPI = async (ticker) => {
  const stockId = stockIdMap[ticker.toLowerCase()];
  if (!stockId) {
    throw new Error("Stock not found in API mapping.");
  }

  const externalApiUrl = `https://api.fortitudenorth.com/stocks/info/${stockId}`;
  const response = await axios.get(externalApiUrl);
  return response.data.stock;
};

module.exports = { getStockDetailsFromAPI };
