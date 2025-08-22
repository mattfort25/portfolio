// server/routes/userRoutes.js
const express = require("express");
const { getUserProfile } = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

// Only logged in users can access to it - protecteed
router.get("/profile", authMiddleware, getUserProfile);

module.exports = router;
