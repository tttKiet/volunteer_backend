"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ListUser extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      ListUser.belongsTo(models.VolunteerWork, {
        foreignKey: "workId",
        targetKey: "id",
        as: "work",
      });
      ListUser.belongsTo(models.User, {
        foreignKey: "userId",
        targetKey: "id",
        as: "userWork",
      });
    }
  }
  ListUser.init(
    {
      userId: DataTypes.STRING,
      workId: DataTypes.STRING,
      status: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "ListUser",
    }
  );
  return ListUser;
};
