// server/controllers/stockNewsController.js
const axios = require("axios");

exports.getStockNewsData = async (req, res) => {
  const { ticker } = req.params;

  if (!ticker) {
    return res
      .status(400)
      .json({ success: false, message: "Ticker is required." });
  }

  try {
    const externalApiUrl = `https://api.fortitudenorth.com/news?search_query=${ticker}&days=30`;
    const response = await axios.get(externalApiUrl);

    // The API returns a large object. We need to filter for the news articles.
    const newsData = Object.entries(response.data.news || {})
      .filter(([key]) => !isNaN(key))
      .map(([_, value]) => value);

    const newsCount = response.data.count || 0;

    res.status(200).json({ success: true, count: newsCount, news: newsData });
  } catch (error) {
    console.error(
      "Error fetching stock news from external API:",
      error.message
    );
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch stock news data." });
  }
};
