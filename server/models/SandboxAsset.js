// server/models/SandboxAsset.js
const { Sequelize, DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");
const User = require("./User");
const Asset = require("./Asset");

const SandboxAsset = sequelize.define(
  "SandboxAsset",
  {
    sandbox_asset_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.UUID,
      references: {
        model: "Users",
        key: "user_id",
      },
      allowNull: false,
    },
    asset_id: {
      type: DataTypes.UUID,
      references: {
        model: "Assets",
        key: "asset_id",
      },
      allowNull: false,
    },
    quantity: {
      type: DataTypes.DECIMAL(18, 4),
      allowNull: false,
      defaultValue: 1,
    },
  },
  {
    timestamps: true,
    createdAt: "added_at",
    updatedAt: "updated_at",
    indexes: [
      {
        unique: true,
        fields: ["user_id", "asset_id"],
      },
    ],
  }
);

module.exports = SandboxAsset;
