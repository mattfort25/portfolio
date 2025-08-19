// server/controllers/authController.js
const bcrypt = require("bcryptjs");
const User = require("../models/User");

exports.signup = async (req, res) => {
  const { name, email, password, subscriptionPlan } = req.body;

  try {
    // 1. check if user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "Email already registered." });
    }

    // 2. hash the password
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    // 3. create the new user
    const newUser = await User.create({
      name,
      email,
      password_hash: passwordHash,
      subscription_plan: subscriptionPlan,
      // subscription_expiry for future use
    });

    // 4. send success response (excluding password hash)
    res.status(201).json({
      success: true,
      message: "User registered successfully!",
      user: {
        user_id: newUser.user_id,
        name: newUser.name,
        email: newUser.email,
        subscription_plan: newUser.subscription_plan,
      },
    });
  } catch (error) {
    console.error("Error during signup:", error);
    res
      .status(500)
      .json({ success: false, message: "Server error during registration." });
  }
};
