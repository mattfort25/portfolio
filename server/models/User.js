const { Sequelize, DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const User = sequelize.define(
  "User",
  {
    user_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password_hash: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    subscription_plan: {
      type: DataTypes.ENUM("free", "premium"),
      allowNull: false,
      defaultValue: "free",
    },
    subscription_expiry: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

// Associations (add these in a separate file if you prefer)
// User.hasMany(UserAsset, { foreignKey: 'user_id' });
// User.hasMany(Subscription, { foreignKey: 'user_id' });

module.exports = User;
