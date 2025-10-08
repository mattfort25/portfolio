// server/routes/stockRoutes.js
const express = require("express");
const router = express.Router();
const { getStockInfo } = require("../controllers/stockController");

router.get("/info/:query", getStockInfo);

module.exports = router;
