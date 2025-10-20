// server/server.js
require("dotenv").config();
const { sequelize, connectDB, checkConnection } = require("./config/db");
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
const simulationRoutes = require("./routes/simulationRoutes");
const newsRoutes = require("./routes/newsRoutes");
const reportingRoutes = require("./routes/reportingRoutes");
const earningsRoutes = require("./routes/earningsRoutes");
const subscriberRoutes = require("./routes/subscriberRoutes");

const app = express();

// Importing association
const defineAssociations = require("./models/associations");

// Cors origin setup
const allowedOrigins = process.env.CORS_ORIGIN
  ? process.env.CORS_ORIGIN.split(",").map((o) => o.trim())
  : [REDIRECT_URL || "http://localhost:3000"];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps, curl)
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.error("Blocked by CORS:", origin);
        callback(new Error("Not allowed by CORS: " + origin));
      }
    },
    credentials: true,
  })
);
// app.use(
//   cors({ origin: REDIRECT_URL || "http://localhost:3000", credentials: true })
// );

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
app.use("/api/simulate", simulationRoutes);
app.use("/api/news", newsRoutes);
app.use("/api/reporting", reportingRoutes);
app.use("/api/earnings", earningsRoutes);
app.use("/api", subscriberRoutes);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

// Periodic database connection health check
setInterval(async () => {
  const isConnected = await checkConnection();
  if (!isConnected) {
    console.error("Periodic health check: Database connection is down");
  } else {
    console.log("Periodic health check: Database connection is healthy");
  }
}, 300000);
