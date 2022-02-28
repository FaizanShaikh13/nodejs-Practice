'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
     await queryInterface.bulkInsert('users', [{
      name: 'John Doe',
      email:"johndoe@gmail.com",
      password:"passwoadadrd",
      role:"admin"
     },
    {
      name: 'harper',
      email:"harpert@gmail.com",
      password:"paadadrd",
      role:"admin"
    }], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     */
     await queryInterface.bulkDelete('users', null, {});
  }
};
