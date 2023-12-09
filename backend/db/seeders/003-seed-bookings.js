'use strict';

const { DATE } = require('sequelize');

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; 
}

options.tableName = 'Bookings' 

module.exports = {
  async up (queryInterface, Sequelize) {
   await queryInterface.bulkInsert(options, [
    {
      spotId: 1,
      userId: 1,
      startDate: new Date('2023-12-12'),
      endDate: new Date('2023-12-15')
    }
   ], {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete(options, null, {})
  }
};
