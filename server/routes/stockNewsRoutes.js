const express = require("express");
const { getStockNewsData } = require("../controllers/stockNewsController");
const router = express.Router();

// Route to fetch news based on a stock ticker
router.get("/:ticker/news", getStockNewsData);

module.exports = router;
