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
          url: 'https://res.cloudinary.com/dikyl7t9p/image/upload/v1705796131/Howling%20Abyss.png',
          preview: true,
          imageableId: 1,
          imageableType: 'Spot'
        },
        {
          url: 'https://res.cloudinary.com/dikyl7t9p/image/upload/v1705796561/hall%20of%20valor.png',
          preview: true,
          imageableId: 2,
          imageableType: 'Spot'
        },
        {
          url: 'https://res.cloudinary.com/dikyl7t9p/image/upload/v1705796933/Screenshot_2024-01-20_at_4.27.20_PM_v2srmf.png',
          preview: true,
          imageableId: 3,
          imageableType: 'Spot'
        },
        {
          url: 'https://res.cloudinary.com/dikyl7t9p/image/upload/v1705803424/Screenshot_2024-01-20_at_4.30.59_PM_mdkrm3.png',
          preview: true,
          imageableId: 4,
          imageableType: 'Spot'
        },
        {
          url: 'https://res.cloudinary.com/dikyl7t9p/image/upload/v1705803534/Screenshot_2024-01-20_at_6.18.33_PM_sovwxl.png',
          preview: true,
          imageableId: 5,
          imageableType: 'Spot'
        },
        {
          url: 'https://res.cloudinary.com/dikyl7t9p/image/upload/v1705803737/Screenshot_2024-01-20_at_6.22.05_PM_g190bo.png',
          preview: true,
          imageableId: 1,
          imageableType: 'Review'
        },
        {
          url: 'https://res.cloudinary.com/dikyl7t9p/image/upload/v1705803875/Lissandra_34_ttveor.jpg',
          preview: true,
          imageableId: 2,
          imageableType: 'Review'
        },  
        {
          url: 'https://res.cloudinary.com/dikyl7t9p/image/upload/v1705804000/Screenshot_2024-01-20_at_6.26.29_PM_zedtlo.png',
          preview: true,
          imageableId: 3,
          imageableType: 'Review'
        },  
        {
          url: 'https://res.cloudinary.com/dikyl7t9p/image/upload/v1705803424/Screenshot_2024-01-20_at_4.30.59_PM_mdkrm3.png',
          preview: true,
          imageableId: 4,
          imageableType: 'Review'
        }
      ])
    } catch(e) {console.log(e)}
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete(options, null, {})
  }
};
