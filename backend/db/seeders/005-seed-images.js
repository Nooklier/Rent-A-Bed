'use strict';

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; 
}

options.tableName = 'Images' 

module.exports = {
  async up (queryInterface, Sequelize) {
    try {

      await queryInterface.bulkInsert(options, [
        {
          url: 'https://res.cloudinary.com/dikyl7t9p/image/upload/v1701302677/283163011_tij7ks.jpg',
          preview: true,
          imageableId: 1,
          imageableType: 'Spot'
        },
        {
          url: "https://res.cloudinary.com/dikyl7t9p/image/upload/v1701947123/shame.png",
          preview: true,
          imageableId: 1,
          imageableType: 'Review'
        }
      ])
    } catch(e) {console.log(e)}
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete(options, null, {})
  }
};
