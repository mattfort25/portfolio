// server/controllers/sandboxController.js
const SandboxAsset = require("../models/SandboxAsset");
const Asset = require("../models/Asset");
const { getStockDetailsFromAPI } = require("../utils/stockApi");

// Function to fetch the user's sandbox portfolio
exports.getSandboxPortfolio = async (req, res) => {
  try {
    const userId = req.user.id; // User ID from auth middleware
    const sandboxAssets = await SandboxAsset.findAll({
      where: { user_id: userId },
      include: [
        {
          model: Asset,
          attributes: ["asset_id", "name", "ticker"],
        },
      ],
    });

    const portfolioWithPrices = await Promise.all(
      sandboxAssets.map(async (item) => {
        try {
          // Fetch current price and daily change from a stock API
          const stockData = await getStockDetailsFromAPI(item.Asset.ticker);

          return {
            id: item.sandbox_asset_id,
            name: item.Asset.name,
            ticker: item.Asset.ticker,
            shares: item.quantity,
            price: stockData.regularMarketPrice,
            dailyChange: stockData.regularMarketChangePercent,
          };
        } catch (apiError) {
          console.error(
            `Error fetching data for ${item.Asset.ticker}:`,
            apiError.message
          );
          return {
            id: item.sandbox_asset_id,
            name: item.Asset.name,
            ticker: item.Asset.ticker,
            shares: item.quantity,
            price: null,
            dailyChange: null,
          };
        }
      })
    );

    return res.status(200).json({
      success: true,
      data: portfolioWithPrices,
      message: "Sandbox portfolio fetched successfully.",
    });
  } catch (error) {
    console.error("Error fetching sandbox portfolio:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch sandbox portfolio.",
    });
  }
};

// Function to add an asset to the sandbox
exports.addSandboxAsset = async (req, res) => {
  try {
    const { ticker, name, quantity } = req.body;
    const userId = req.user.id;

    const [asset, created] = await Asset.findOrCreate({
      where: { ticker },
      defaults: { name, ticker, asset_type: "stock", currency: "USD" },
    });

    // Check for existing asset in the user sandbox portfolio
    const existingEntry = await SandboxAsset.findOne({
      where: { user_id: userId, asset_id: asset.asset_id },
    });

    if (existingEntry) {
      existingEntry.quantity += quantity;
      await existingEntry.save();
      return res.status(200).json({
        success: true,
        message: "Asset quantity updated in sandbox.",
      });
    } else {
      // If it does not exist, create a new
      await SandboxAsset.create({
        user_id: userId,
        asset_id: asset.asset_id,
        quantity,
      });
      return res.status(201).json({
        success: true,
        message: "Asset added to sandbox.",
      });
    }
  } catch (error) {
    console.error("Error adding asset to sandbox:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to add asset to sandbox.",
    });
  }
};

// Function to remove an asset from the sandbox
exports.removeSandboxAsset = async (req, res) => {
  try {
    const { sandboxAssetId } = req.params;
    const userId = req.user.id;

    const result = await SandboxAsset.destroy({
      where: {
        sandbox_asset_id: sandboxAssetId,
        user_id: userId,
      },
    });

    if (result > 0) {
      return res.status(200).json({
        success: true,
        message: "Asset removed from sandbox successfully.",
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "Asset not found in sandbox or not authorized.",
      });
    }
  } catch (error) {
    console.error("Error removing asset from sandbox:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to remove asset from sandbox.",
    });
  }
};

// Function to update sandbox assets
exports.updateSandboxAssetShares = async (req, res) => {
  try {
    const { sandboxAssetId } = req.params;
    const { quantity } = req.body;
    const userId = req.user.id;

    if (!quantity || isNaN(quantity) || parseInt(quantity, 10) <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid quantity provided.",
      });
    }

    const asset = await SandboxAsset.findOne({
      where: {
        sandbox_asset_id: sandboxAssetId,
        user_id: userId,
      },
    });

    if (!asset) {
      return res.status(404).json({
        success: false,
        message: "Asset not found or not authorized.",
      });
    }

    asset.quantity = quantity;
    await asset.save();

    return res.status(200).json({
      success: true,
      message: "Shares updated successfully.",
    });
  } catch (error) {
    console.error("Error updating shares:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to update shares.",
    });
  }
};
