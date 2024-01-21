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
        spotId: 2,
        userId: 1,
        review: 'Everything looks new here. Would definitely come back!',
        stars: 5
      },
      {
        spotId: 3,
        userId: 2,
        review: 'Very scenic if you can stand the heat and sand',
        stars: 4
      },
      {
        spotId: 4,
        userId: 3,
        review: 'Place was way too dirty and expensive',
        stars: 2
      },
      {
        spotId: 1,
        userId: 4,
        review: 'Place was really cool, literally!',
        stars: 5
      }
    ], {})
  },

  async down (queryInterface, Sequelize) {
   
     await queryInterface.bulkDelete(options, null, {});
   
  }
};
