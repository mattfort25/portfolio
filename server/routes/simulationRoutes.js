// server/routes/simulationRoutes.js

const express = require("express");
const router = express.Router();
const simulationController = require("../controllers/simulationController");
const authMiddleware = require("../middlewares/authMiddleware");

router.post(
  "/simple",
  authMiddleware,
  simulationController.runSimpleSimulation
);

module.exports = router;
