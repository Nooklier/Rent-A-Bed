'use strict';

const { User } = require('../models');
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  
}

module.exports = {
  async up (queryInterface, Sequelize) {
    await User.bulkCreate([
      {
        email: 'pettyqueen@aol.com',
        username: 'PettyQueen',
        hashedPassword: bcrypt.hashSync('password'),
        firstName: 'Petty',
        lastName: 'Queen'
      },
      {
        email: 'frankiemermaid@yahoo.com',
        username: 'FrankieMermaid',
        hashedPassword: bcrypt.hashSync('password2'),
        firstName: 'Frankie',
        lastName: 'Mermaid'
      },
      {
        email: 'sassypants@gmail.com',
        username: 'McSassy',
        hashedPassword: bcrypt.hashSync('password3'),
        firstName: 'Sassy',
        lastName: 'Pants'
      }
    ], { validate: true });
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Users';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      username: { [Op.in]: ['PettyQueen', 'FrakieMermaid', 'McSassy'] }
    }, {});
  }
};