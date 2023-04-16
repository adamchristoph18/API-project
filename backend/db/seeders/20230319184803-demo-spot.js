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
        description:'You are invited to be our guest at the "Luxurious Private Vineyard Estate in Temecula Valley”. Come and enjoy one of the largest most accommodating properties in Temecula Valley. Situated on 5 acres, this 8 bedroom 6.5 bath vineyard estate can accommodate your group with ease. Bordered with a picturesque 1 acre vineyard and half acre 75+ treed orchard this operating winery provides privacy and peace during your stay.',
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
        description:'NEW CONST 5-STAR LUXURY OCEANFRONT 4-STORY, Elevator, 5 Bed,4.5 Bath SLEEPS 14 PEOPLE Located on "Millionaires Row" Heated Pool,Jacuzzi,Pizza Oven,Beach Chairs & Umbrella,Game Room,Basketball,Gym,Games,Computer & Printer, 70"TV,Art,Gourmet Kitchen seats 22 people.Stainless Steel Appliances, Gas Oven & Range,Fully Stocked Kitchen:Cooking Utensils, Plates, pots & pans, regular & Keurig K Pods. Dishwasher, High-Speed Internet ROKU,NETFLIX Capability,Washing & Dryer. CPI Security System throughout.',
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
        description:'The "MICA", high-end micro-hosting located in the heart of the boreal forest. Live the immersive experience of nature just 25 minutes from Old Quebec. Enjoy panoramic views of Laurentian Park and breathtaking sunsets at the highest peak of Beauport Lake.',
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
        description:'Come enjoy the beauty, privacy and seclusion of Mountain View Villa at Alpine Falls Ranch, adjacent to the LoLo National Forest and steps away from the Clark Fork river. Ranch Manager and housekeeping on site, catering available upon request. The ranch includes horse facilities, a riding arena, gym, theater and trap/skeet for entertaining or parties. 50 minutes to Missoula, 90 miles to Coeur dAlene. Unlimited hiking, hunting, fishing, floating and adventure opportunities await.',
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
        description:'Private, gated French country chateau-inspired home sits at the end of a cul de sac on nearly 2 acres of land and is surrounded by stately trees, mature landscaping, and verdant canyon views. Beautifully living room with fireplace, formal dining room, large kitchen, and light-filled breakfast area. Spectacular canyon views from every room and nearby access to Beverly Hills, and the valley. Expansive backyard and pool area.',
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
        description:'Spending the night in a castle? You can! You are staying in a quiet, fairy tale environment. The 8-bedroom, 7-bathroom vacation home with all modern comforts is an ideal base where up to 22 guests can stay in a group. The authentic style was preserved with respect for the past, while our interpretation is completely contemporary. In a birds-eye view, our private domain is 7 kilometers away from Bruges. But the fairy-tale Damme and the seaside town of Knokke are also within easy reach.',
        price: 9240
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
