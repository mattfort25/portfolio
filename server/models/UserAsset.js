const { Sequelize, DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");
const User = require("./User");
const Asset = require("./Asset");

const UserAsset = sequelize.define(
  "UserAsset",
  {
    user_asset_id: {
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
    },
    asset_id: {
      type: DataTypes.UUID,
      references: {
        model: "Assets", // Name of the table
        key: "asset_id",
      },
    },
    added_at: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.NOW,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.DECIMAL(18, 4),
      allowNull: true,
    },
  },
  {
    timestamps: false,
  }
);

// Associations
// User.hasMany(UserAsset, { foreignKey: "user_id" });
// UserAsset.belongsTo(User, { foreignKey: "user_id" });
// Asset.hasMany(UserAsset, { foreignKey: "asset_id" });
// UserAsset.belongsTo(Asset, { foreignKey: "asset_id" });

module.exports = UserAsset;
