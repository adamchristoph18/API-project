'use strict';

const { Spot, SpotImage } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  up: async (queryInterface, Sequelize) => {

    const spots = await Spot.findAll();
    const spotIdMap = {};

    for (let spot of spots) {
      spotIdMap[spot.name] = spot.id;
    }

    options.tableName = 'SpotImages';
    return queryInterface.bulkInsert(options, [
      {
        spotId: spotIdMap['Rocks Landing'],
        url: 'https://a0.muscache.com/im/pictures/c5332d51-e60d-4044-8090-e39aeaf929a5.jpg?im_w=1200',
        preview: true
      },
      {
        spotId: spotIdMap['Black Bear Cove'],
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-52288428/original/059cc00a-1c12-4531-a119-9eab7260d3d9.jpeg?im_w=1200',
        preview: true
      },
      {
        spotId: spotIdMap['Pearl overlook'],
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-779486252857801661/original/650a900c-e568-4bba-ad1a-9599bccdc0a7.jpeg',
        preview: true
      },
      {
        spotId: spotIdMap['Copper Sopper Beach House'],
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-801458664154162658/original/d9e9c8c4-63a0-4c24-9863-2ee5db2cd660.jpeg',
        preview: true
      },
      {
        spotId: spotIdMap['The Eagles Nest'],
        url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-49457568/original/7be97498-45f6-413d-9d05-84c60da2cdba.jpeg',
        preview: true
      },
      {
        spotId: spotIdMap['Mountain Valley View'],
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-630058522819373033/original/130dec7e-4b9d-4714-86d3-ba10a96303ea.jpeg',
        preview: true
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'SpotImages';
    const Op = Sequelize.Op;

    const spotImages = await SpotImage.findAll();
    const spotImagesIds = spotImages.map(spotImage => spotImage.id); // array of ids

    return queryInterface.bulkDelete(options, {
      id: { [Op.in]: spotImagesIds }
    }, {});
  }
};
