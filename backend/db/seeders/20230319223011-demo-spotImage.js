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
        url: 'https://architizer-prod.imgix.net/mediadata/projects/072013/3be8c875.jpg?fit=max&w=1680&q=60&auto=format&auto=compress&cs=strip',
        preview: true
      },
      {
        spotId: spotIdMap['Black Bear Cove'],
        url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBr0I2GtIyhn4bmQpjyvqIQzeA6GsBzNwsfg&usqp=CAU',
        preview: false
      },
      {
        spotId: spotIdMap['Pearl overlook'],
        url: 'https://www.territorysupply.com/wp-content/uploads/2021/08/fl2-min.jpg',
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
