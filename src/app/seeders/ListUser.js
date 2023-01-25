"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "ListUsers",
      [
        {
          workId: "1",
          userId: "B2014754",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          workId: "2",
          userId: "B2014754",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          workId: "3",
          userId: "B2014754",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          workId: "4",
          userId: "B2014754",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          workId: "4",
          userId: "user1",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          workId: "2",
          userId: "user2",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          workId: "1",
          userId: "user2",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          workId: "3",
          userId: "B2014755",
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
