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
      }
    );

// test the database connection
const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log(
      "Connection to the database has been established successfully."
    );
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    process.exit(1);
  }
};

module.exports = {
  sequelize,
  connectDB,
};
