'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Reviews', [
      {
        spotId: 1,
        userId: 1,
        review: 'Best casino ever! So many great places to eat!',
        stars: 5
      }
    ], {})
  },

  async down (queryInterface, Sequelize) {
   
     await queryInterface.bulkDelete('Reviews', null, {});
   
  }
};
