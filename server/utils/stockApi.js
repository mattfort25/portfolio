const axios = require("axios");

const getStockDetailsFromAPI = async (ticker) => {
  if (!ticker) {
    throw new Error("Ticker is required.");
  }

  try {
    // range=1d with interval=1m often returns 1 or 2 daily aggregate data points,
    // which is what we need to calculate the daily change.
    const externalApiUrl = `https://api.fortitudenorth.com/stocks/${ticker.toUpperCase()}/history?interval=1m&range=1d`;
    const response = await axios.get(externalApiUrl);

    const history = response.data.history;
    if (!history || history.length === 0) {
      throw new Error(`No data found for ticker: ${ticker}`);
    }

    const latestData = history[history.length - 1];
    // This is the data from the previous day's close
    const previousData =
      history.length > 1 ? history[history.length - 2] : null;

    const closePrice = latestData.close;
    let dailyChangePercent = null;

    if (latestData.open && latestData.open !== 0) {
      dailyChangePercent =
        ((closePrice - latestData.open) / latestData.open) * 100;
    } else if (previousData) {
      const previousClose = previousData.close;
      dailyChangePercent = ((closePrice - previousClose) / previousClose) * 100;
    }

    return {
      symbol: response.data.ticker,
      displayName: response.data.ticker,
      longName: response.data.ticker,
      shortName: response.data.ticker,
      regularMarketPrice: closePrice,
      regularMarketChangePercent: dailyChangePercent,
    };
  } catch (error) {
    console.error("Error fetching stock info:", error.message);
    throw new Error(
      error.response?.data?.message ||
        error.message ||
        "Failed to fetch stock data"
    );
  }
};

module.exports = { getStockDetailsFromAPI };
