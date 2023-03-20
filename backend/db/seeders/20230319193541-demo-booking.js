'use strict';

const { Spot, User, Booking } = require('../models');

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

    const users = await User.findAll();
    const userIdMap = {};

    for (let user of users) {
      userIdMap[user.firstName] = user.id;
    }

    options.tableName = 'Bookings';
    return queryInterface.bulkInsert(options, [
      {
        spotId: spotIdMap['Rocks Landing'],
        userId: userIdMap['Dirk'],
        startDate: '2023-09-14',
        endDate: '2023-10-03'
      },
      {
        spotId: spotIdMap['Pearl overlook'],
        userId: userIdMap['John'],
        startDate: '2023-12-14',
        endDate: '2023-12-29'
      },
      {
        spotId: spotIdMap['Black Bear Cove'],
        userId: userIdMap['Carrie'],
        startDate: '2023-10-04',
        endDate: '2023-10-20'
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Bookings';
    const Op = Sequelize.Op;

    const bookings = await Booking.findAll();
    const bookingIds = bookings.map(booking => booking.id); // array of ids

    return queryInterface.bulkDelete(options, {
      id: { [Op.in]: bookingIds }
    }, {});
  }
};
