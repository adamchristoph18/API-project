'use strict';

const { Spot, User } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  up: async (queryInterface, Sequelize) => {

    const users = await User.findAll();
    const userIdMap = {};

    for (let user of users) {
      userIdMap[user.firstName] = user.id;
    }

    options.tableName = 'Spots';
    return queryInterface.bulkInsert(options, [
      {
        ownerId: userIdMap.John,
        address: '126 Beach Rd',
        city: 'Coral',
        state: 'Virginia',
        country: 'United States of America',
        lat: 78.5840543,
        lng: 83.6932054,
        name: 'Beaver Island Cove',
        description:'You are invited to be our guest at the "Luxurious Private Vineyard Estate in Temecula Valley”.',
        price: 640
      },
      {
        ownerId: userIdMap['Carrie'],
        address: '133 Homp Dr',
        city: 'Destin',
        state: 'Florida',
        country: 'United States of America',
        lat: 90.5864543,
        lng: 49.6932674,
        name: 'Pearl overlook',
        description:'NEW CONST 5-STAR LUXURY OCEANFRONT 4-STORY, Elevator, 5 Bed,4.5 Bath SLEEPS 14 PEOPLE Located on "Millionaires Row".',
        price: 1290
      },
      {
        ownerId: userIdMap['Dirk'],
        address: '195 Twin Lakes Rd',
        city: 'Lac-Beauport',
        state: 'Quebec',
        country: 'Canada',
        lat: 99.7214543,
        lng: 73.8872674,
        name: 'Black Bear Cove',
        description:'The "MICA", high-end micro-hosting located in the heart of the boreal forest.',
        price: 790
      },
      {
        ownerId: userIdMap['Dirk'],
        address: '593 Copperstone Dr',
        city: 'Superior',
        state: 'Montana',
        country: 'United States of America',
        lat: 39.7243243,
        lng: 66.8936274,
        name: 'Copper Sopper Beach House',
        description:'Come enjoy the beauty, privacy and seclusion of Mountain View Villa at Alpine Falls Ranch.',
        price: 4420
      },
      {
        ownerId: userIdMap['Dirk'],
        address: '741 Murwil Ct',
        city: 'Beverly Hills',
        state: 'California',
        country: 'United States of America',
        lat: 85.7283243,
        lng: 24.8936233,
        name: 'The Eagles Nest',
        description:'Private, gated French country chateau-inspired home sits at the end of a cul de sac.',
        price: 430
      },
      {
        ownerId: userIdMap.John,
        address: '444 Timberview Rd',
        city: 'Las Vegas',
        state: 'Nevada',
        country: 'United States of America',
        lat: 38.5940341,
        lng: 61.6932674,
        name: 'Mountain Valley View',
        description:'Spending the night in a castle? You can! You are staying in a quiet, fairy tale environment.',
        price: 9240
      },
      {
        ownerId: userIdMap.Dirk,
        address: '471 Abbey Rd',
        city: 'Muir of Ord',
        state: 'Scotland',
        country: 'United Kingdom',
        lat: 78.5958941,
        lng: 61.6933244,
        name: 'Scatwell Manor',
        description:'Scatwell House is the perfect place to rest and enjoy complete relaxation, located 10 km northwest of Marybank.',
        price: 1340
      },
      {
        ownerId: userIdMap.Dirk,
        address: '9909 Corner Dr',
        city: 'Breckenridge',
        state: 'Colorado',
        country: 'United States of America',
        lat: 44.5954241,
        lng: 61.6933270,
        name: 'Cabin Oasis',
        description:'With meticulous attention to detail and designed to deliver an epic experience.',
        price: 2159
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Spots';
    const Op = Sequelize.Op;

    const spots = await Spot.findAll();
    const spotIds = spots.map(spot => spot.id); // array of ids

    return queryInterface.bulkDelete(options, {
      id: { [Op.in]: spotIds }
    }, {});
  }
};
