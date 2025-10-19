// server/controllers/authController.js
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../utils/jwtUtils");

// User sign up
const demoSignup = async (req, res) => {
  try {
    // 🚨 Extract all fields along with name, email, and password
    const {
      name,
      email,
      password, // temporary password from the frontend
      organization,
      role,
      phone,
      primaryInterest,
      regions,
      demoFormat,
      message,
    } = req.body;

    // Validate required fields
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Full Name, Work Email, and Password are required.",
      });
    }

    // if (password.length < 8) {
    //   return res.status(400).json({ ... });
    // }

    // Check if user with this email already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "An account with this email already exists.",
      });
    }

    // Hash the password for security
    const salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash(password, salt);

    // Create the new user with all fields
    const newUser = await User.create({
      name,
      email,
      password_hash,
      subscription_plan: "silver", // Default to silver for demo
      is_demo_user: true, // Flag this user as a demo user
      organization,
      role,
      phone,
      primary_interest: primaryInterest,
      regions_of_interest: regions,
      demo_format: demoFormat,
      message,
    });

    // Generate JWTs (access and refresh Tokens)
    const accessToken = generateAccessToken(newUser);
    const refreshToken = generateRefreshToken(newUser);

    res.status(201).json({
      success: true,
      message:
        "Demo request received and temporary account created! Check your account with your email and password created.",
      accessToken,
      refreshToken,
      user: {
        user_id: newUser.user_id,
        name: newUser.name,
        email: newUser.email,
        subscription_plan: newUser.subscription_plan,
        is_demo_user: newUser.is_demo_user,
      },
    });
  } catch (error) {
    console.error("Error during demoSignup:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error during demo request. Please try again.",
    });
  }
};

// User login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("Attempting login for email:", email);

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required.",
      });
    }

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "No user found with this email and password, please register.",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password_hash);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    res.json({
      success: true,
      message: "Login successful.",
      accessToken,
      refreshToken,
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error during login. Please try again.",
    });
  }
};

const refreshToken = async (req, res) => {
  const { refreshToken: incomingRefreshToken } = req.body;

  if (!incomingRefreshToken) {
    return res
      .status(401)
      .json({ success: false, message: "No refresh token provided." });
  }

  try {
    const decoded = jwt.verify(
      incomingRefreshToken,
      process.env.JWT_REFRESH_SECRET
    );

    const user = await User.findByPk(decoded.id);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid refresh token. User not found.",
      });
    }

    // Generate a new access token
    const newAccessToken = generateAccessToken(user);
    res.status(200).json({ success: true, accessToken: newAccessToken });
  } catch (error) {
    console.error("Error refreshing token:", error);
    // If refresh token is invalid or expired
    return res.status(403).json({
      success: false,
      message: "Invalid or expired refresh token. Please log in again.",
    });
  }
};

module.exports = {
  signup: demoSignup,
  login,
  refreshToken,
};
