// server/server.js
require("dotenv").config();
const { sequelize, connectDB } = require("./config/db");
const express = require("express");
const { REDIRECT_URL } = require("./utils/general");
const cors = require("cors");
const test = require("./routes/testRoutes");
const app = express();

app.use(
  cors({ origin: REDIRECT_URL || "http://localhost:3000", credentials: true })
);

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true })); //  To parse the request body for req.body

// Conncting to database
connectDB();

sequelize
  .sync()
  .then(() => console.log("Database synchronized successfully."))
  .catch((err) => console.error("Error synchronizing database:", err));

// Routes
app.use("/api/test", test);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
