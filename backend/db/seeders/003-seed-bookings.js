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
      userId: 2,
      startDate: new Date('2024-02-01'),
      endDate: new Date('2024-02-10')
    },
    {
      spotId: 2,
      userId: 3,
      startDate: new Date('2024-03-01'),
      endDate: new Date('2024-03-10')
    },
    {
      spotId: 3,
      userId: 4,
      startDate: new Date('2024-04-01'),
      endDate: new Date('2024-04-10')
    },
    {
      spotId: 4,
      userId: 1,
      startDate: new Date('2024-05-01'),
      endDate: new Date('2024-05-10')
    },
    {
      spotId: 5,
      userId: 4,
      startDate: new Date('2024-06-01'),
      endDate: new Date('2024-06-10')
    }
   ], {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete(options, null, {})
  }
};
