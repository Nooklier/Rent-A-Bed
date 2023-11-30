'use strict';

const bcrypt = require('bcryptjs');

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [
      {
      firstName: 'Frankie',
      lastName: 'Mermaid',
      username: 'swimminInBtchs',
      hashedPassword: bcrypt.hashSync('frankie_password'),
      email: 'frankie.mermaid@gmail.com'
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {})
  }
};
