'use strict';

const bcrypt = require('bcryptjs');

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; 
}

options.tableName = 'Users' 

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(options, [
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
    await queryInterface.bulkDelete(options, null, {})
  }
};
