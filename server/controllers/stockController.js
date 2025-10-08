// server/controllers/stockController.js
const { getStockDetailsFromAPI } = require("../utils/stockApi");

const getStockInfo = async (req, res) => {
  const userQuery = req.params.query ? req.params.query : "";

  if (!userQuery) {
    return res
      .status(400)
      .json({ success: false, message: "Stock name or ticker is required." });
  }

  try {
    const stockData = await getStockDetailsFromAPI(userQuery);
    res.status(200).json({ success: true, data: stockData });
  } catch (error) {
    console.error("Error fetching stock info:", error.message);
    res.status(404).json({
      success: false,
      message:
        error.message || "Failed to fetch stock data from external service.",
    });
  }
};

module.exports = { getStockInfo };
