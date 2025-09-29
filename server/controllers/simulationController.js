// server/controllers/simulationController.js

const axios = require("axios");

exports.runSimpleSimulation = async (req, res) => {
  try {
    const { portfolio, horizon_days, iterations } = req.body;

    if (!portfolio || !horizon_days || !iterations) {
      return res.status(400).json({
        success: false,
        message:
          "Missing required parameters: portfolio, horizon_days, and iterations.",
      });
    }

    const externalApiUrl = "https://api.fortitudenorth.com/simulate/simple";
    const requestBody = { portfolio, horizon_days, iterations };

    const response = await axios.post(externalApiUrl, requestBody, {
      headers: { "Content-Type": "application/json" },
    });

    return res.status(200).json(response.data);
  } catch (error) {
    console.error("Error in simulation API call:", error.message);
    return res.status(500).json({
      success: false,
      message:
        "Failed to run simulation. Please check the request body and external API availability.",
      error: error.message,
    });
  }
};
