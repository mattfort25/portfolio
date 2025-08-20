// server/models/Sources.js

const { Sequelize, DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");
const Asset = require("./Asset");

const Sources = sequelize.define(
  "Sources",
  {
    source_id: {
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
    source_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    source_desc: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    source_link: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = News;
