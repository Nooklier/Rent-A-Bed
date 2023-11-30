'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Spots', [
      {
        ownerId: 1,
        address: '3355 S Las Vegas Blvd',
        city: 'Las Vegas',
        state: 'Nevada',
        country: 'United States',
        lat: 36.17,
        lng: 115.13,
        name: 'Venetian Hotel and Casino',
        description: 'Luxery hotel with over 18 million square feet of space',
        price: 250
      }
    ], {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Spots', null, {})
  }
};
