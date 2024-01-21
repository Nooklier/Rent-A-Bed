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
        firstName: 'Lissandra',
        lastName: 'Frelord',
        username: 'Lissandra',
        hashedPassword: bcrypt.hashSync('lissandra'),
        email: 'lissandra.frelord@gmail.com'
        },
        {
          firstName: 'Lux',
          lastName: 'Demacia',
          username: 'Lux',
          hashedPassword: bcrypt.hashSync('lux'),
          email: 'lux.demacia@gmail.com'
        },
        {
          firstName: 'Azir',
          lastName: 'Shurima',
          username: 'Azir',
          hashedPassword: bcrypt.hashSync('azir'),
          email: 'azir.shurima@gmail.com'
        },
        {
          firstName: 'Jinx',
          lastName: 'Zaun',
          username: 'Jinx',
          hashedPassword: bcrypt.hashSync('jinx'),
          email: 'jinx.zaun@gmail.com'
        }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete(options, null, {})
  }
};
