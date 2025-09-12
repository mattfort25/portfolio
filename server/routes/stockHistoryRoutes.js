// server/routes/stockHistoryRoutes.js
const express = require("express");
const {
  getStockHistoryData,
} = require("../controllers/stockHistoryController");
const router = express.Router();

router.get("/:ticker/history", getStockHistoryData);
router.get("/", (req, res) => {
  res.status(200).send("Stock History Route is Working!");
});

module.exports = router;
