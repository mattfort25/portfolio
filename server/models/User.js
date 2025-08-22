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

// hooks
// User.beforeCreate(async (user) => {
//   if (user.password) {
//     user.password = await bcrypt.hash(user.password, 10);
//   }
// });

// User.beforeUpdate(async (user, options) => {
//   if (user.changed("password")) {
//     user.password = await bcrypt.hash(user.password, 10);
//   }
// });

// User.prototype.verifyPassword = async function (password) {
//   return await bcrypt.compare(password, this.password);
// };

module.exports = User;
