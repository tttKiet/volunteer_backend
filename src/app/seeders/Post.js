"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Posts",
      [
        {
          userId: "B2014754",
          title: "Hiến máu tình nguyện khoa CNTT",
          descrtiption:
            "Ngày 18/01/2023 khoa công nghệ thông tin tổ chức chiến dịch hiến máu tình nguyện dành cho các bạn sv..",
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
