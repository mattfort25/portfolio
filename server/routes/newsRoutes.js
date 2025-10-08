// server/routes/newsRoutes.js

const express = require("express");
const router = express.Router();
const { getGlobalNews } = require("../controllers/newsController");

// Public route for global news
router.get("/global", getGlobalNews);

module.exports = router;
