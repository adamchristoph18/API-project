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
        spotId: spotIdMap['Beaver Island Cove'],
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-650253907317405565/original/aa941bd1-4c5c-4646-9297-84994160149a.jpeg',
        preview: true
      },
      {
        spotId: spotIdMap['Black Bear Cove'],
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-46695796/original/a0965aa5-3907-466e-b727-0900e2a7e8c7.jpeg',
        preview: true
      },
      {
        spotId: spotIdMap['Pearl overlook'],
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-779486252857801661/original/650a900c-e568-4bba-ad1a-9599bccdc0a7.jpeg',
        preview: true
      },
      {
        spotId: spotIdMap['Copper Sopper Beach House'],
        url: 'https://a0.muscache.com/im/pictures/2bfa9fd4-08cc-4014-b7ec-898f80a24525.jpg',
        preview: true
      },
      {
        spotId: spotIdMap['The Eagles Nest'],
        url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-47354666/original/b92fc905-70ea-449a-aa95-c79ade3ceadb.jpeg?im_w=1200',
        preview: true
      },
      {
        spotId: spotIdMap['Mountain Valley View'],
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-630058522819373033/original/130dec7e-4b9d-4714-86d3-ba10a96303ea.jpeg',
        preview: true
      },
      {
        spotId: spotIdMap['Beaver Island Cove'],
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-650253907317405565/original/b36488f6-cf94-4314-b43c-b0d7e920c09b.jpeg',
        preview: false
      },
      {
        spotId: spotIdMap['Beaver Island Cove'],
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-650253907317405565/original/1933d0d6-b298-42dd-997b-3070a8386fe6.jpeg',
        preview: false
      },
      {
        spotId: spotIdMap['Beaver Island Cove'],
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-650253907317405565/original/f5a5d0df-b08f-468c-a2f0-80ac029378a0.jpeg',
        preview: false
      },
      {
        spotId: spotIdMap['Beaver Island Cove'],
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-650253907317405565/original/0657b1ad-02c8-4831-89d8-f461527a833a.jpeg',
        preview: false
      },
      {
        spotId: spotIdMap['Pearl overlook'],
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-779486252857801661/original/e39d1945-d1e0-44fe-94a0-40cde4051f5e.jpeg',
        preview: false
      },
      {
        spotId: spotIdMap['Pearl overlook'],
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-779486252857801661/original/dd66819c-1adb-4ee2-8056-d65582d7584b.jpeg',
        preview: false
      },
      {
        spotId: spotIdMap['Pearl overlook'],
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-779486252857801661/original/ecbe36d9-9a94-4000-91b1-dddf05c21c30.jpeg',
        preview: false
      },
      {
        spotId: spotIdMap['Pearl overlook'],
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-779486252857801661/original/0ab8311c-c37f-45ef-8d42-8fccf5cc8c8c.jpeg',
        preview: false
      },
      {
        spotId: spotIdMap['Black Bear Cove'],
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-46695796/original/9bd67185-dc83-4473-a191-9486c62aec66.jpeg',
        preview: false
      },
      {
        spotId: spotIdMap['Black Bear Cove'],
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-46695796/original/d01dc3d2-9597-4d88-92f7-3e15a1c0d604.jpeg',
        preview: false
      },
      {
        spotId: spotIdMap['Black Bear Cove'],
        url: 'https://a0.muscache.com/im/pictures/9988b302-b51a-4765-ac74-da9dad0e326a.jpg',
        preview: false
      },
      {
        spotId: spotIdMap['Black Bear Cove'],
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-46695796/original/088a6251-1a8c-459c-9f14-6d131fdb1a68.jpeg',
        preview: false
      },
      {
        spotId: spotIdMap['Copper Sopper Beach House'],
        url: 'https://a0.muscache.com/im/pictures/c73194ba-14af-4304-a600-e1fc26393de8.jpg',
        preview: false
      },
      {
        spotId: spotIdMap['Copper Sopper Beach House'],
        url: 'https://a0.muscache.com/im/pictures/4f599f49-6cf8-4abc-af2e-5bb95bdd3fb8.jpg',
        preview: false
      },
      {
        spotId: spotIdMap['Copper Sopper Beach House'],
        url: 'https://a0.muscache.com/im/pictures/2ba6b606-5455-4cb6-979b-bfe52f305fc9.jpg',
        preview: false
      },
      {
        spotId: spotIdMap['Copper Sopper Beach House'],
        url: 'https://a0.muscache.com/im/pictures/fc13ece6-aa87-488e-9571-79f27d1c0095.jpg',
        preview: false
      },
      {
        spotId: spotIdMap['The Eagles Nest'],
        url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-47354666/original/08d7be05-70aa-4a1d-a964-d9ba526f5562.jpeg?im_w=720',
        preview: false
      },
      {
        spotId: spotIdMap['The Eagles Nest'],
        url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-47354666/original/a2d99008-721a-4153-89e5-c3d251a0389b.jpeg?im_w=720',
        preview: false
      },
      {
        spotId: spotIdMap['The Eagles Nest'],
        url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-47354666/original/5db96c16-21bb-492a-a427-533ef988ccac.jpeg?im_w=720',
        preview: false
      },
      {
        spotId: spotIdMap['The Eagles Nest'],
        url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-47354666/original/62a4b00e-e5d0-45b9-bc6e-0d597e5fc4dc.jpeg?im_w=720',
        preview: false
      },
      {
        spotId: spotIdMap['Mountain Valley View'],
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-630058522819373033/original/88fc1f33-9305-4644-b04e-e3daac3ab524.jpeg?im_w=720',
        preview: false
      },
      {
        spotId: spotIdMap['Mountain Valley View'],
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-630058522819373033/original/b4c44640-c9b9-42c7-a750-7567fc7e0be0.jpeg?im_w=720',
        preview: false
      },
      {
        spotId: spotIdMap['Mountain Valley View'],
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-630058522819373033/original/1fd4a884-562f-4c1d-a2cf-c72dc6a828a1.jpeg?im_w=720',
        preview: false
      },
      {
        spotId: spotIdMap['Mountain Valley View'],
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-630058522819373033/original/4335e754-0d0a-4ae1-bdb0-137bc035748b.jpeg?im_w=720',
        preview: false
      },
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
