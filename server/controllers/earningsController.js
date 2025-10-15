// server/controllers/earningsController.js
const { getEarningsForTickers } = require("../utils/stockApi");

/**
 * Get earnings calendar for portfolio tickers using AlphaVantage
 */
exports.getPortfolioEarnings = async (req, res) => {
  try {
    const { tickers } = req.query;

    if (!tickers) {
      return res.status(400).json({
        success: false,
        message: "Tickers query parameter is required.",
      });
    }

    const tickerArray = tickers.split(",").map((t) => t.trim().toUpperCase());

    if (tickerArray.length === 0) {
      return res.status(200).json({
        success: true,
        data: [],
        message: "No tickers provided.",
      });
    }

    console.log(`Fetching earnings for tickers: ${tickerArray.join(", ")}`);

    // Fetch earnings from AlphaVantage
    const earnings = await getEarningsForTickers(tickerArray);

    return res.status(200).json({
      success: true,
      data: earnings,
      message:
        earnings.length > 0
          ? "Earnings calendar fetched successfully."
          : "No upcoming earnings found for these stocks.",
    });
  } catch (error) {
    console.error("Error fetching portfolio earnings:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch earnings calendar. Please try again later.",
    });
  }
};
