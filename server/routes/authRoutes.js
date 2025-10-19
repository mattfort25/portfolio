// server/routes/authRoutes.js
const express = require("express");
const router = express.Router();
const {
  signup,
  login,
  refreshToken,
} = require("../controllers/authController");
const authMiddleware = require("../middlewares/authMiddleware");

// Define API routes for authentication
router.post("/demo-signup", signup);
router.post("/login", login);
router.post("/token/refresh", refreshToken);

module.exports = router;
