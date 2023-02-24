"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          id: "CB224",
          password: "123",
          name: "Admin CB224",
          email: "admincb224@student.ctu.edu.vn",
          faculty: "CNTT & TT",
          className: "20V7A3",
          type: "admin",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "CB112",
          password: "123",
          name: "Admin CB112",
          email: "admincb112@student.ctu.edu.vn",
          faculty: "Thủy sản",
          className: "20V7A1",
          type: "admin",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "B2014754",
          password: "123",
          name: "Bùi Tuấn Kiệt",
          email: "kietb2014754@student.ctu.edu.vn",
          faculty: "CNTT & TT",
          className: "20V7A3",
          type: "user",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "B2014730",
          password: "123",
          name: "Phan Đài Cát",
          email: "catb2014730@student.ctu.edu.vn",
          faculty: "CNTT & TT",
          className: "20V7A3",
          type: "user",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "B2014664",
          password: "123",
          name: "Bùi Văn Tiền",
          email: "tienb2014730@student.ctu.edu.vn",
          faculty: "CNTT & TT",
          className: "20V7A3",
          type: "user",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "B2014742",
          password: "123",
          name: "Lại Thế Văn",
          email: "vanb2014756@student.ctu.edu.vn",
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
