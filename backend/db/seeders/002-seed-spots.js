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
        description: 'An ancient stronghold built to watch over the dark chasm of the Howling Abyss, the Citadel also houses many of the Freljord hidden treasures and historical records.',
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
        description: 'The throne of Demacia resides in the Hall of Valor. Here, the deeds of the noble and mighty are honored beneath the radiance of marble and sunlight.',
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
        description: 'The empire of Shurima was once a thriving civilization that spanned a vast desert. After an era of growth and prosperity, the fall of its gleaming capital left the empire in ruins. Over the millennia, tales of Shurima glorious capital became myth and relation amongst the descendants of the scattered survivors.',
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
        description: 'Most of Zaun structures are crafted from lattice ironwork, either forged in the many seething foundries or wrought from scavenged material discarded from above.',
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
        description: 'Situated at the heart of the continent, the Placidium is one of Ionia’s most sacred places. Many have journeyed here to study at renowned schools, or meditate in its wild, magical gardens.',
        price: 500
      }
    ], {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete(options, null, {})
  }
};
