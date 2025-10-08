// server/controllers/newsController.js

const { fetchExternalNews } = require("../utils/newsFetch");

const getGlobalNews = async (req, res) => {
  try {
    // Call the utility function to fetch news from the external API
    const result = await fetchExternalNews();

    if (result.success) {
      return res.status(200).json({
        success: true,
        message: "Global news fetched successfully.",
        data: result.data,
      });
    } else {
      return res.status(500).json({
        success: false,
        message: result.error || "Failed to fetch news from external source.",
      });
    }
  } catch (error) {
    console.error("Error in getGlobalNews controller:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error while fetching news.",
    });
  }
};

module.exports = {
  getGlobalNews,
};
