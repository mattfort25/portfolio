// porfolio/server/models/User.js (Modified)
const { Sequelize, DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");
const bcrypt = require("bcryptjs");

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
      type: DataTypes.ENUM("silver", "gold", "platinum"),
      allowNull: false,
      defaultValue: "silver",
    },
    subscription_expiry: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    organization: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    primary_interest: {
      type: DataTypes.STRING, // Storing the selected interest as a string
      allowNull: true,
    },
    regions_of_interest: {
      type: DataTypes.ARRAY(DataTypes.STRING), // Storing multiple regions as an array of strings
      allowNull: true,
    },

    demo_format: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    is_demo_user: {
      type: DataTypes.BOOLEAN,
      defaultValue: true, // Flag to indicate a user created via the demo flow
    },
  },
  {
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

module.exports = User;
