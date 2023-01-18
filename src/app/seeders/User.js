"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          id: "B2014754",
          password: "123",
          name: "Bùi Tuấn Kiệt",
          email: "kietb2014754@student.ctu.edu.vn",
          faculty: "CNTT & TT",
          className: "20V7A3",
          type: "admin",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "B2014755",
          password: "123",
          name: "Bùi Tuấn Kiệt 2",
          email: "kietb2014754@student.ctu.edu.vn",
          faculty: "CNTT & TT",
          className: "20V7A3",
          type: "admin",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "user1",
          password: "123",
          name: "Bùi Tuấn Kiệt 2",
          email: "kietb2014754@student.ctu.edu.vn",
          faculty: "CNTT & TT",
          className: "20V7A3",
          type: "user",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
