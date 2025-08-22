// server/utils/jwtUtils.js
const jwt = require("jsonwebtoken");

const generateAccessToken = (user) => {
  const payload = {
    id: user.user_id,
    email: user.email,
  };
  // Token expires in 1 hour
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });
};

const generateRefreshToken = (user) => {
  const payload = {
    id: user.user_id,
    email: user.email,
  };
  // Token expires in 7 days
  return jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: "7d" });
};

module.exports = { generateAccessToken, generateRefreshToken };
