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
        description: 'Welcome to the Enchanted Abyss Hotel, a mesmerizing retreat where the mystical world of fantasy meets the pinnacle of luxury. Nestled in a breathtaking icy landscape, inspired by the legendary Howling Abyss, our hotel offers an experience unlike any other. Luxurious Accommodations: Each of our rooms and suites is a masterpiece, featuring elegant decor that weaves in elements of the icy abyss. Enjoy unparalleled comfort with state-of-the-art amenities, plush furnishings, and windows that open to stunning, frost-kissed vistas. Gastronomic Delights: Our gourmet restaurants serve a fusion of local and exotic cuisines, crafted by world-class chefs. Dine under the shimmering light of ice chandeliers, or enjoy a private, magical meal set against the backdrop of ancient ruins. Exclusive Spa Experience: Indulge in our ice-themed spa, where wellness and magic unite. Rejuvenate with unique treatments that blend traditional relaxation techniques with the mystical energies of the Abyss.',
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
        description: 'Welcome to the Majestic Valor Hotel, a Luxurious Escape Inspired by the Famed Hall of Valor from League of Legends! Nestled amidst breathtaking mountainous landscapes, the Majestic Valor Hotel is a grandiose destination where medieval fantasy meets modern luxury. Our castle-like exterior, complete with towering spires and intricate stonework, promises an experience like no other. Step through our massive arched entrance and be transported into a world of opulence. The lobby, with its high vaulted ceilings, chandeliers, and medieval-inspired decor, offers a grand welcome. Our friendly staff are at your service, ensuring a seamless check-in to start your extraordinary stay. Our rooms, each uniquely themed, blend comfort with the allure of a bygone era. Enjoy the modern amenities, plush bedding, and breathtaking views of the mystical surroundings.',
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
        description: "Discover the Splendor of the Sun Disc Hotel: Where Ancient Mystique Meets Modern Luxury. Nestled in a serene setting, our hotel is a masterpiece inspired by the legendary Sun Disc from League of Legends. Experience grandeur in every detail, from the majestic golden-hued exterior with its towering spires to the opulent interiors adorned with intricate designs. Luxuriate in our sumptuously appointed rooms, dine in our exquisite restaurants where culinary delights await, and unwind in our tranquil pool area. The Sun Disc Hotel is not just a stay, it's an enchanting journey into a realm of unparalleled luxury and mystical charm. Book your magical escape now and immerse yourself in an experience like no other.",
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
        description: "Discover the Enigmatic Allure of the Zaun Hotel: A League of Legends-Inspired Retreat! Immerse yourself in the captivating world of Zaun, inspired by the popular universe of League of Legends. Our hotel offers an unforgettable experience that merges the rustic charm of steampunk with a touch of modern luxury. Each detail of our establishment, from the high-tech, neon-lit exteriors to the dark, industrial-themed interiors, is designed to transport you into a realm of fantasy and adventure. Step into our lobby, where the fusion of exposed pipes, metal beams, and cogwheels create an ambiance straight out of a futuristic fantasy. Our rooms, each a masterpiece of design, offer the ultimate comfort with a twist of Zaun's unique aesthetic—featuring ambient neon lighting, luxurious bedding, and thematic artwork that tells a story at every glance." ,
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
        description: "Escape to Elegance - Discover the Enchantment of Ionian Splendor! Welcome to our luxurious hotel, an exquisite retreat where the mystical beauty of Ionia from the world-renowned League of Legends comes to life. Nestled in a breathtaking, serene landscape, our hotel offers an unrivaled experience of harmony and tranquility. As you step into our grand lobby, you're greeted by the fusion of traditional Ionian architecture and modern luxury. The vibrant colors, intricate patterns, and stunning murals transport you to a world of elegance and charm. Our spacious, well-appointed rooms offer a sanctuary of comfort and peace, each designed with Ionian-inspired décor, offering panoramic views of the mystical Ionian landscapes.",
        price: 500
      }
    ], {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete(options, null, {})
  }
};
