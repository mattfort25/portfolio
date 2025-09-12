// server/models/Stock.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Stock = sequelize.define("Stock", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    unique: true,
  },
  displayName: DataTypes.STRING,
  shortName: DataTypes.STRING,
  longName: DataTypes.STRING,
  ticker: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  address1: DataTypes.STRING,
  city: DataTypes.STRING,
  state: DataTypes.STRING,
  zip: DataTypes.STRING,
  country: DataTypes.STRING,
  industry: DataTypes.STRING,
  sector: DataTypes.STRING,
  longBusinessSummary: DataTypes.TEXT,
  website: DataTypes.STRING,
  regularMarketPrice: DataTypes.FLOAT,
  regularMarketChangePercent: DataTypes.FLOAT,
  fiftyTwoWeekLow: DataTypes.FLOAT,
  fiftyTwoWeekHigh: DataTypes.FLOAT,
  trailingPE: DataTypes.FLOAT,
  forwardPE: DataTypes.FLOAT,
  marketCap: DataTypes.BIGINT,
  volume: DataTypes.BIGINT,
  last_updated: {
    type: DataTypes.DATE,
    allowNull: false,
  },
});

module.exports = Stock;
