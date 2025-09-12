// server/controllers/stockHistoryController.js
const axios = require("axios");

exports.getStockHistoryData = async (req, res) => {
  const { ticker } = req.params;
  const { interval, range } = req.query;
  console.log("Ticker param:", ticker);
  console.log("Interval query:", interval);
  console.log("Range query:", range);

  try {
    // The URL should use the `ticker` , as specified by the external API
    const externalApiUrl = `https://api.fortitudenorth.com/stocks/${ticker}/history?interval=${interval}&range=${range}`;
    console.log("Calling external API:", externalApiUrl);

    const response = await axios.get(externalApiUrl);
    console.log("External API response:", response.data);

    res.status(200).json({ success: true, history: response.data.history });
  } catch (error) {
    console.error(
      "Error fetching stock history from external API:",
      error.message
    );
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch stock history data." });
  }
};
