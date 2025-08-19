const { Sequelize, DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");
const User = require("./User");

const Subscription = sequelize.define(
  "Subscription",
  {
    subscription_id: {
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
    plan: {
      type: DataTypes.ENUM("free", "monthly", "yearly"),
      allowNull: false,
    },
    start_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    end_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    amount_paid: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    payment_status: {
      type: DataTypes.ENUM("success", "failed", "pending"),
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

// Associations
// User.hasMany(Subscription, { foreignKey: "user_id" });
// Subscription.belongsTo(User, { foreignKey: "user_id" });

module.exports = Subscription;
