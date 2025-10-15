// server/routes/earningsRoutes.js
const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const { getPortfolioEarnings } = require("../controllers/earningsController");

const router = express.Router();

router.get("/portfolio", authMiddleware, getPortfolioEarnings);

module.exports = router;
