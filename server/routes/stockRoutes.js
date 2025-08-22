// server/routes/stockRoutes.js
const express = require("express");
const router = express.Router();
const { getStockInfo } = require("../controllers/stockController");

router.get("/:query", getStockInfo);

module.exports = router;
