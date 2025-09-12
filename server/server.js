// server/server.js
require("dotenv").config();
const { sequelize, connectDB } = require("./config/db");
const express = require("express");
const { REDIRECT_URL } = require("./utils/general");
const cors = require("cors");

// Importing routes
const test = require("./routes/testRoutes");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const stockRoutes = require("./routes/stockRoutes");
const sandboxRoutes = require("./routes/sandboxRoutes");
const stockHistoryRoutes = require("./routes/stockHistoryRoutes");
const stockNewsRoutes = require("./routes/stockNewsRoutes");

// Importing models
const User = require("./models/User");
const Asset = require("./models/Asset");
const UserAsset = require("./models/UserAsset");
const Subscription = require("./models/Subscription");
const HistoricalPrice = require("./models/HistoricalPrice");
const News = require("./models/News");
const app = express();

// Importing association
const defineAssociations = require("./models/associations");

app.use(
  cors({ origin: REDIRECT_URL || "http://localhost:3000", credentials: true })
);

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true })); //  To parse the request body for req.body

// Conncting to database
connectDB();

// Define all associations
defineAssociations(sequelize);

sequelize
  .sync({ alter: true }) // attempts to make necessary changes to the existing tables to match the model definitions, without dropping and recreating them _ in production level caution required
  .then(() => console.log("Database synchronized successfully."))
  .catch((err) => console.error("Error synchronizing database:", err));

// Routes
app.use("/api/test", test);
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/stocks", stockRoutes);
app.use("/api/sandbox", sandboxRoutes);
app.use("/api/stocks", stockHistoryRoutes);
app.use("/api/stocks", stockNewsRoutes);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
