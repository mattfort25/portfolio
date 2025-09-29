// server/config/db.js
const Sequelize = require("sequelize");
require("dotenv").config();

const dbUrl = process.env.DATABASE_URL;

const sequelize = dbUrl
  ? new Sequelize(dbUrl, {
      dialect: "postgres",
      // SSL is required for Neon database connections.
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        },
      },
      logging: console.log,
      // Connection pool configuration
      pool: {
        max: 10,
        min: 0,
        acquire: 30000,
        idle: 10000,
        evict: 1000,
      },
      retry: {
        max: 3,
        timeout: 5000,
      },
    })
  : new Sequelize(
      process.env.DB_NAME,
      process.env.DB_USER,
      process.env.DB_PASSWORD,
      {
        host: process.env.DB_HOST,
        dialect: "postgres",
        port: 5432,
        dialectOptions: {
          ssl: { rejectUnauthorized: false },
        },
        logging: console.log,
        pool: {
          max: 10,
          min: 0,
          acquire: 30000,
          idle: 10000,
          evict: 1000,
        },
        retry: {
          max: 3,
          timeout: 5000,
        },
      }
    );

// test the database connection
const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log(
      "Connection to the database has been established successfully."
    );
    console.log("Database connection pool configured with:", {
      max: sequelize.options.pool.max,
      min: sequelize.options.pool.min,
      acquire: sequelize.options.pool.acquire,
      idle: sequelize.options.pool.idle,
    });
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    // It's good practice to exit the process on critical failures.
    process.exit(1);
  }
};

// Function to check and reconnect if needed
const checkConnection = async () => {
  try {
    await sequelize.authenticate();
    return true;
  } catch (error) {
    console.error("Database connection check failed:", error.message);
    return false;
  }
};

module.exports = {
  sequelize,
  connectDB,
  checkConnection,
};
