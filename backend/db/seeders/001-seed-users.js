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
          firstName: 'Geren',
          lastName: 'Demacia',
          username: 'Geren',
          hashedPassword: bcrypt.hashSync('gerenpassword'),
          email: 'lux.demacia@gmail.com'
        },
        {
          firstName: 'Azir',
          lastName: 'Shurima',
          username: 'Azir',
          hashedPassword: bcrypt.hashSync('azirpassword'),
          email: 'azir.shurima@gmail.com'
        },
        {
          firstName: 'Jinx',
          lastName: 'Zaun',
          username: 'Jinx',
          hashedPassword: bcrypt.hashSync('jinxpassword'),
          email: 'jinx.zaun@gmail.com'
        }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete(options, null, {})
  }
};
