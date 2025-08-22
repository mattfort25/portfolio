// server/controllers/userController.js
const User = require("../models/User");

const getUserProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    // Find the user by id, wihtout expossing the password
    const user = await User.findByPk(userId, {
      attributes: { exclude: ["password_hash"] },
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found or token invalid.",
      });
    }

    res.json({
      success: true,
      data: user.toJSON(),
    });
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};

module.exports = { getUserProfile };
