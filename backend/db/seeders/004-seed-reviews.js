'use strict';

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; 
}

options.tableName = 'Reviews' 

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(options, [
      {
        spotId: 1,
        userId: 1,
        review: 'Best casino ever! So many great places to eat!',
        stars: 5
      }
    ], {})
  },

  async down (queryInterface, Sequelize) {
   
     await queryInterface.bulkDelete(options, null, {});
   
  }
};
