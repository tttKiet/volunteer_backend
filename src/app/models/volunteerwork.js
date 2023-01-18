"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class VolunteerWork extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      VolunteerWork.hasMany(models.ListUser, {
        foreignKey: "workId",
      });
    }
  }
  VolunteerWork.init(
    {
      name: DataTypes.STRING,
      startDate: DataTypes.DATE,
      maxStudent: DataTypes.INTEGER,
      curStudent: DataTypes.INTEGER,
      pointPlus: DataTypes.INTEGER,
      workPlace: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "VolunteerWork",
    }
  );
  return VolunteerWork;
};
