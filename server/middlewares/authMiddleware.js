// server/middlewares/authMiddleware.js
const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  let token = req.header("x-auth-token");

  // If no token is provided, no authorization
  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "No token, authorization denied" });
  }

  try {
    const decodedUser = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded user in authMiddleware:", decodedUser);

    req.user = { id: decodedUser.id, email: decodedUser.email };
    next();
  } catch (err) {
    res.status(401).json({ message: "Token is not valid" });
  }
};

module.exports = authMiddleware;
