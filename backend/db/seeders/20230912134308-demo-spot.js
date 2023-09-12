'use strict';

const { User } = require('../models');
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  
}

module.exports = {
  async up (queryInterface, Sequelize) {
   
    await queryInterface.bulkInsert('Spots', [
      {
        ownerId: 1,
        address: '8 Fremont St',
        city: 'Las Vegas',
        state: 'Nevada',
        country: 'United States',
        lat: -17.78390,
        lng: 150.47946,
        name: 'Circa Hotel & Casino',
        description: 'Brand new luxery hotel within Downtown, Las Vegas!',
        price: 250
      }
    ], { validate: true });
    
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Spots';
    return queryInterface.bulkDelete(options, {
      name: 'Circa Hotel & Casino'
    })
  }
};
