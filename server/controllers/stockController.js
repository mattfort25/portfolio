// server/controllers/stockController.js
const axios = require("axios");

const stockIdMap = {
  apple: 1,
  aapl: 1,
  amazon: 2,
  amzn: 2,
  meta: 3,
  meta: 3,
  alphabet: 4,
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

const getStockInfo = async (req, res) => {
  const userQuery = req.params.query ? req.params.query.toLowerCase() : "";

  if (!userQuery) {
    return res
      .status(400)
      .json({ success: false, message: "Stock name or ticker is required." });
  }

  const stockId = stockIdMap[userQuery];

  if (!stockId) {
    return res.status(404).json({
      success: false,
      message:
        "Stock not found in our database. Please try a different name or ticker.",
    });
  }

  try {
    const externalApiUrl = `https://api.fortitudenorth.com/stocks/info/${stockId}`;
    const response = await axios.get(externalApiUrl);

    res.status(200).json({ success: true, data: response.data.stock });
  } catch (error) {
    console.error(
      "Error fetching stock info from external API:",
      error.message
    );
    res.status(500).json({
      success: false,
      message: "Failed to fetch stock data from external service.",
    });
  }
};

module.exports = { getStockInfo };
