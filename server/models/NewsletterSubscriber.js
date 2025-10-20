// server/models/NewsletterSubscriber.js
const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const NewsletterSubscriber = sequelize.define(
  "NewsletterSubscriber",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
  },
  {
    timestamps: true,
    tableName: "newsletter_subscribers",
  }
);

module.exports = NewsletterSubscriber;
