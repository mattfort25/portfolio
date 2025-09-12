// server/routes/sandboxRoutes.js
const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");

const {
  getSandboxPortfolio,
  addSandboxAsset,
  removeSandboxAsset,
  updateSandboxAssetShares,
} = require("../controllers/sandboxController");

const router = express.Router();

router.get("/", authMiddleware, getSandboxPortfolio);
router.post("/add", authMiddleware, addSandboxAsset);
router.delete("/remove/:sandboxAssetId", authMiddleware, removeSandboxAsset);
router.put(
  "/update-shares/:sandboxAssetId",
  authMiddleware,
  updateSandboxAssetShares
);
module.exports = router;
