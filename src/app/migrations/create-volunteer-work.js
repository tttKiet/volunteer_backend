"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("VolunteerWorks", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING,
      },
      name: {
        type: Sequelize.STRING,
      },
      startDate: {
        type: Sequelize.DATE,
        validate: {
          checkStartDate(value) {
            if (value <= new Date()) {
              throw new Error("Ngày bắt đầu phải là ngày trong tương lai!");
            }
          },
        },
      },
      maxStudent: {
        type: Sequelize.INTEGER,
      },
      curStudent: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        validate: {
          checkCurStudent(value) {
            if (value > this.maxStudent) {
              throw new Error("Số lượng hiện tại đã đạt tối đa!");
            }
          },
        },
      },
      pointPlus: {
        type: Sequelize.INTEGER,
      },
      workPlace: {
        type: Sequelize.TEXT,
      },
      note: {
        type: Sequelize.TEXT,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("VolunteerWorks");
  },
};
