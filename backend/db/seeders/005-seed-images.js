'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Images', [
      {
        url: 'https://res.cloudinary.com/dikyl7t9p/image/upload/v1701302677/283163011_tij7ks.jpg',
        preview: true,
        imageableId: 1,
        imageableType: 'Spot'
      },
      {
        url: 'https://res.cloudinary.com/dikyl7t9p/image/upload/v1701303073/The-Venetian-Las-Vegas-Outdoor-area-1_fa2qdx.jpg',
        preview: true,
        imageableId: 1,
        imageableType: 'Review'
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Images', null, {})
  }
};
