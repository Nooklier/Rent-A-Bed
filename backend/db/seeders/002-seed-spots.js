'use strict';

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; 
}

options.tableName = 'Spots' 

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(options, [
      {
        ownerId: 1,
        address: '1111 Howling Abyss',
        city: 'The Frostguard Citadel',
        state: 'Frelord',
        country: 'Runeterra',
        lat: 11.11,
        lng: 111.11,
        name: 'The Howling Abyss Hotel',
        description: 'Welcome to the Enchanted Abyss Hotel, a mesmerizing retreat where the mystical world of fantasy meets the pinnacle of luxury.',
        price: 100
      },
      {
        ownerId: 2,
        address: '2222 Hall of Valor',
        city: 'The Great City of Demacia',
        state: 'Demacia',
        country: 'Runeterra',
        lat: 22.22,
        lng: 122.22,
        name: 'Hall of Valor Hotel',
        description: 'Welcome to the Majestic Valor Hotel, a Luxurious Escape Inspired by the Famed Hall of Valor from League of Legends!',
        price: 200
      },
      {
        ownerId: 3,
        address: '3333 Sun Disc',
        city: 'The City of The Sun',
        state: 'Shurima',
        country: 'Runeterra',
        lat: 33.33,
        lng: 133.33,
        name: 'The Sun Disc Hotel',
        description: "Discover the Splendor of the Sun Disc Hotel: Where Ancient Mystique Meets Modern Luxury.",
        price: 300
      },
      {
        ownerId: 4,
        address: '4444 Zaun',
        city: 'City of Iron and Glass',
        state: 'Zaun',
        country: 'Runeterra',
        lat: 44.44,
        lng: 144.44,
        name: 'Lights and Shadows Hotel',
        description: "Discover the Enigmatic Allure of the Zaun Hotel: A League of Legends-Inspired Retreat!" ,
        price: 400
      },
      {
        ownerId: 2,
        address: '5555 Placidium ',
        city: 'The Placidium of Navori',
        state: 'Ionia',
        country: 'Runeterra',
        lat: 55.55,
        lng: 155.55,
        name: 'The Great Stand Hotel',
        description: "Escape to Elegance - Discover the Enchantment of Ionian Splendor!",
        price: 500
      }
    ], {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete(options, null, {})
  }
};
