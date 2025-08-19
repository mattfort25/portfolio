const { Sequelize, DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");
const Asset = require("./Asset");

const HistoricalPrice = sequelize.define(
  "HistoricalPrice",
  {
    price_id: {
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
    },
    date: {
      type: DataTypes.DATEONLY, // DATEONLY for just the date without time
      allowNull: false,
    },
    open_price: {
      type: DataTypes.DECIMAL(18, 4),
      allowNull: false,
    },
    close_price: {
      type: DataTypes.DECIMAL(18, 4),
      allowNull: false,
    },
    high_price: {
      type: DataTypes.DECIMAL(18, 4),
      allowNull: false,
    },
    low_price: {
      type: DataTypes.DECIMAL(18, 4),
      allowNull: false,
    },
    volume: {
      type: DataTypes.BIGINT,
      allowNull: true,
    },
  },
  {
    timestamps: false,
  }
);

// // Associations
// Asset.hasMany(HistoricalPrice, { foreignKey: "asset_id" });
// HistoricalPrice.belongsTo(Asset, { foreignKey: "asset_id" });

module.exports = HistoricalPrice;
