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

        // SPOT: 3 IMAGES
        {
          url: 'https://res.cloudinary.com/dikyl7t9p/image/upload/v1706337560/The%20Sun%20Disc%20hotel/file-IftjJZq0ft15qamQTVk1xHIk_lhnkqt.webp',
          preview: true,
          imageableId: 3,
          imageableType: 'Spot'
        },
        {
          url: 'https://res.cloudinary.com/dikyl7t9p/image/upload/v1706337556/The%20Sun%20Disc%20hotel/file-HS9rgNL7x5AItlsbb3OGdyPf_xj5bt9.webp',
          preview: true,
          imageableId: 3,
          imageableType: 'Spot'
        },
        {
          url: 'https://res.cloudinary.com/dikyl7t9p/image/upload/v1706337530/The%20Sun%20Disc%20hotel/file-RqHrLBnaTEZCdWLoaeGBTyzq_geghml.webp',
          preview: true,
          imageableId: 3,
          imageableType: 'Spot'
        },
        {
          url: 'https://res.cloudinary.com/dikyl7t9p/image/upload/v1706337535/The%20Sun%20Disc%20hotel/file-JpIMc6qjyH5KRbRFFS72Rkbd_mgqvny.webp',
          preview: true,
          imageableId: 3,
          imageableType: 'Spot'
        },

        // REVIEW: 3 IMAGES
        {
          url: 'https://res.cloudinary.com/dikyl7t9p/image/upload/v1706337543/The%20Sun%20Disc%20hotel/file-f4qW2b9x8AldjohG4xin0WHi_jkg973.webp',
          preview: true,
          imageableId: 3,
          imageableType: 'Review'
        }, 
        {
          url: 'https://res.cloudinary.com/dikyl7t9p/image/upload/v1706337539/The%20Sun%20Disc%20hotel/file-20NmBxsEZ4eg8yVZPfO2V2Qw_pxzkiv.webp',
          preview: true,
          imageableId: 3,
          imageableType: 'Review'
        }, 

        // SPOT: 4 IMAGES
        {
          url: 'https://res.cloudinary.com/dikyl7t9p/image/upload/v1706337764/Lights%20and%20shadows%20hotel/file-swoqYow6na9JLUy4nF5phpeX_bbnoom.webp',
          preview: true,
          imageableId: 4,
          imageableType: 'Spot'
        },
        {
          url: 'https://res.cloudinary.com/dikyl7t9p/image/upload/v1706337994/Lights%20and%20shadows%20hotel/file-XahQASDJ0RDKxoLVCZrW4MEE_sk6phj.webp',
          preview: true,
          imageableId: 4,
          imageableType: 'Spot'
        },
        {
          url: 'https://res.cloudinary.com/dikyl7t9p/image/upload/v1706337939/Lights%20and%20shadows%20hotel/file-o3T58wrbhRnftNtK1PzFuiT9_fpqvxh.webp',
          preview: true,
          imageableId: 4,
          imageableType: 'Spot'
        },
        {
          url: 'https://res.cloudinary.com/dikyl7t9p/image/upload/v1706337890/Lights%20and%20shadows%20hotel/file-N4IW6TFNk6qgwHmwLa9PFSAb_u8evrm.webp',
          preview: true,
          imageableId: 4,
          imageableType: 'Spot'
        },

        // REVIEW: 4 IMAGES
        {
          url: 'https://res.cloudinary.com/dikyl7t9p/image/upload/v1706337804/Lights%20and%20shadows%20hotel/file-ZDrbKwMWZnB1IZ5t1dlbdysO_ffcfyt.webp',
          preview: true,
          imageableId: 4,
          imageableType: 'Review'
        },  

        // SPOT: 5 IMAGES
        {
          url: 'https://res.cloudinary.com/dikyl7t9p/image/upload/v1706338063/The%20Placidium%20of%20Navori/file-Ysqe5poYwaaULgS9tKgjoAjL_nilscx.webp',
          preview: true,
          imageableId: 5,
          imageableType: 'Spot'
        },
        {
          url: 'https://res.cloudinary.com/dikyl7t9p/image/upload/v1706338106/The%20Placidium%20of%20Navori/file-8ZjYTP8uHQWnnJxpWUa64UkB_ymmjoc.webp',
          preview: true,
          imageableId: 5,
          imageableType: 'Spot'
        },
        {
          url: 'https://res.cloudinary.com/dikyl7t9p/image/upload/v1706338150/The%20Placidium%20of%20Navori/file-bhiq4LbGzIQGmeLiHwXyqsP3_l6tsqw.webp',
          preview: true,
          imageableId: 5,
          imageableType: 'Spot'
        },
        {
          url: 'https://res.cloudinary.com/dikyl7t9p/image/upload/v1706338205/The%20Placidium%20of%20Navori/file-OrKCGIBxCCezxYDygQtbUQCf_yjiuln.webp',
          preview: true,
          imageableId: 5,
          imageableType: 'Spot'
        },

        // REVIEW: 5 IMAGES
        {
          url: 'https://res.cloudinary.com/dikyl7t9p/image/upload/v1706340859/The%20Placidium%20of%20Navori/file-orcU2U0h6ZKOPjmbF4Fl1foB_mvu8bw.webp',
          preview: true,
          imageableId: 5,
          imageableType: 'Review'
        }
      ])
    } catch(e) {console.log(e)}
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete(options, null, {})
  }
};
