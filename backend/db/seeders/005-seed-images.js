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
        // SPOT: 1 IMAGES
        {
          url: 'https://res.cloudinary.com/dikyl7t9p/image/upload/v1706270034/The%20Howling%20Abyss%20Hotel/file-gY89fOfzVhlDgHThIirTZaNr_uulj7a.webp',
          preview: true,
          imageableId: 1,
          imageableType: 'Spot'
        },
        {
          url: 'https://res.cloudinary.com/dikyl7t9p/image/upload/v1706270108/The%20Howling%20Abyss%20Hotel/file-uXtw8uQMX2zHkIBuy4XkChKL_yt1dq4.webp',
          preview: true,
          imageableId: 1,
          imageableType: 'Spot'
        },
        {
          url: 'https://res.cloudinary.com/dikyl7t9p/image/upload/v1706270031/The%20Howling%20Abyss%20Hotel/file-IaqkooNELRph8ZzqD6u0jUiA_gb0xyv.webp',
          preview: true,
          imageableId: 1,
          imageableType: 'Spot'
        },

        // REVIEW: 1 IMAGES
        {
          url: 'https://res.cloudinary.com/dikyl7t9p/image/upload/v1706270178/The%20Howling%20Abyss%20Hotel/file-lka4zmJivrr8GXdE5YTELHcP_dk1b5i.webp',
          preview: true,
          imageableId: 1,
          imageableType: 'Review'
        },
        {
          url: 'https://res.cloudinary.com/dikyl7t9p/image/upload/v1706270257/The%20Howling%20Abyss%20Hotel/file-cyA8XQaE0LdWlPeqR4Vuif2A_ghifyn.webp',
          preview: true,
          imageableId: 1,
          imageableType: 'Review'
        },
        {
          url: 'https://res.cloudinary.com/dikyl7t9p/image/upload/v1706270459/The%20Howling%20Abyss%20Hotel/file-jZsLXNFlGx8j7jNAw717sQJh_wu9njd.webp',
          preview: true,
          imageableId: 1,
          imageableType: 'Review'
        },

        // SPOT: 2 IMAGES
        {
          url: 'https://res.cloudinary.com/dikyl7t9p/image/upload/v1706271581/Hall%20of%20Valor%20Hotel/file-uC3YnNIlgfKkRs01ZbkeEqPU_iois12.webp',
          preview: true,
          imageableId: 2,
          imageableType: 'Spot'
        },
        {
          url: 'https://res.cloudinary.com/dikyl7t9p/image/upload/v1706271692/Hall%20of%20Valor%20Hotel/file-IIhHYhfpeA8IW6kQCxuTBddX_jzyrs0.webp',
          preview: true,
          imageableId: 2,
          imageableType: 'Spot'
        },
        {
          url: 'https://res.cloudinary.com/dikyl7t9p/image/upload/v1706271875/Hall%20of%20Valor%20Hotel/file-9kpza6TAb9ecYsmQPFu7kYq0_gttpjy.webp',
          preview: true,
          imageableId: 2,
          imageableType: 'Spot'
        },

        // REVIEW: 2 IMAGES

        {
          url: 'https://res.cloudinary.com/dikyl7t9p/image/upload/v1706271968/Hall%20of%20Valor%20Hotel/file-S9hp5xIjWXSP9rIo4p5cOY9R_xarcqh.webp',
          preview: true,
          imageableId: 2,
          imageableType: 'Review'
        },
        {
          url: 'https://res.cloudinary.com/dikyl7t9p/image/upload/v1706271787/Hall%20of%20Valor%20Hotel/file-uZVffQLaG9Blkfh7YQnivMOV_qb6xer.webp',
          preview: true,
          imageableId: 2,
          imageableType: 'Review'
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
