// server/models/News.js

const { Sequelize, DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");
const Asset = require("./Asset");

const News = sequelize.define(
  "News",
  {
    news_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    asset_id: {
      type: DataTypes.UUID,
      references: {
        model: "Assets",
        key: "asset_id",
      },
      allowNull: true, // Allow news not related to a specific asset
    },
    headline: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    summary: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    source: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    published_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = News;
