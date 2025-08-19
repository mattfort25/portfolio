// server/models/associations.js

const defineAssociations = (sequelize) => {
  const User = require("./User");
  const Asset = require("./Asset");
  const UserAsset = require("./UserAsset");
  const Subscription = require("./Subscription");
  const HistoricalPrice = require("./HistoricalPrice");
  const News = require("./News");

  // User associations
  User.hasMany(UserAsset, { foreignKey: "user_id", onDelete: "CASCADE" }); // if a user is deleted, their user_assets are also deleted
  User.hasMany(Subscription, { foreignKey: "user_id", onDelete: "CASCADE" });

  // Asset associations
  Asset.hasMany(UserAsset, { foreignKey: "asset_id", onDelete: "CASCADE" });
  Asset.hasMany(HistoricalPrice, {
    foreignKey: "asset_id",
    onDelete: "CASCADE",
  });
  Asset.hasMany(News, { foreignKey: "asset_id", onDelete: "CASCADE" });

  // UserAsset associations (Joining User and Asset)
  UserAsset.belongsTo(User, { foreignKey: "user_id" });
  UserAsset.belongsTo(Asset, { foreignKey: "asset_id" });

  // Subscription associations
  Subscription.belongsTo(User, { foreignKey: "user_id" });

  // HistoricalPrice associations
  HistoricalPrice.belongsTo(Asset, { foreignKey: "asset_id" });

  // News associations
  News.belongsTo(Asset, { foreignKey: "asset_id" });

  console.log("Model associations defined.");
};

module.exports = defineAssociations;
