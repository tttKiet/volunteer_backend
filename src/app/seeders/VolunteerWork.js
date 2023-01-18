"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "VolunteerWorks",
      [
        {
          id: "1",
          name: "Hiến máu tình nguyện khoa CNTT",
          startDate: new Date(2023, 12, 12),
          maxStudent: 30,
          pointPlus: 3,
          workPlace: "Sau nhà thi đấu DH Cần Thơ.",
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
