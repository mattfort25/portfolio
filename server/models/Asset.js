// server/models/Asset.js
require("sequelize");
const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const Asset = sequelize.define(
  "Asset",
  {
    asset_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ticker: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    asset_type: {
      type: DataTypes.ENUM("stock", "crypto", "ETF"),
      allowNull: false,
    },
    currency: {
      type: DataTypes.STRING(3),
      allowNull: false,
    },
    current_price: {
      type: DataTypes.DECIMAL(18, 4),
      allowNull: true,
    },
  },
  {
    timestamps: true,
    updatedAt: "updated_at",
    createdAt: "created_at",
  }
);

module.exports = Asset;
