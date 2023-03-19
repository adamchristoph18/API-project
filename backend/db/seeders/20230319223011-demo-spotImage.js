'use strict';
const bcrypt = require("bcryptjs");

const { Spot, SpotImage } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  up: async (queryInterface, Sequelize) => {

    const spots = await Spot.findAll();
    // // console.log(spots);
    const spotIdMap = {};
    for (let spot of spots) {
      spotIdMap[spot.name] = spot.id;
    }


    options.tableName = 'SpotImages';
    return queryInterface.bulkInsert(options, [
      {
        spotId: spotIdMap['Rocks Landing'],
        url: 'rockyRoad.url',
        preview: true
      },
      {
        spotId: spotIdMap['Black Bear Cove'],
        url: 'alaskanbear.url',
        preview: false
      },
      {
        spotId: spotIdMap['Pearl overlook'],
        url: 'pearlygates.url',
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
