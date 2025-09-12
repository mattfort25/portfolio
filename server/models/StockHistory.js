const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class StockHistory extends Model {}

  StockHistory.init(
    {
      ticker: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      open: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      high: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      low: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      close: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      volume: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "StockHistory",
      tableName: "StockHistories",
      timestamps: true,
      underscored: true,
    }
  );

  return StockHistory;
};
