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
      {
        spotId: spotIdMap['Scatwell Manor'],
        url: 'https://a0.muscache.com/im/pictures/65bbebc6-a897-4d58-a42b-0569133d6389.jpg',
        preview: true
      },
      {
        spotId: spotIdMap['Scatwell Manor'],
        url: 'https://a0.muscache.com/im/pictures/1db4b74e-933e-4794-930e-3eeba23267bd.jpg',
        preview: false
      },
      {
        spotId: spotIdMap['Scatwell Manor'],
        url: 'https://a0.muscache.com/im/pictures/80ca5709-125d-4612-922a-ec8a4b74a5f0.jpg',
        preview: false
      },
      {
        spotId: spotIdMap['Scatwell Manor'],
        url: 'https://a0.muscache.com/im/pictures/2d22b361-3bfc-443b-95dd-d14e08fbcba8.jpg',
        preview: false
      },
      {
        spotId: spotIdMap['Scatwell Manor'],
        url: 'https://a0.muscache.com/im/pictures/76772dc0-a917-4051-b0a1-86bdb716099d.jpg?im_w=720',
        preview: false
      },
      {
        spotId: spotIdMap['Cabin Oasis'],
        url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-553724453830698306/original/32a46b55-fee1-4553-bdba-a7a1c84b2bdd.jpeg',
        preview: true
      },
      {
        spotId: spotIdMap['Cabin Oasis'],
        url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-553724453830698306/original/bc192c28-9a78-47e2-b533-643e856006cd.jpeg',
        preview: false
      },
      {
        spotId: spotIdMap['Cabin Oasis'],
        url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-553724453830698306/original/4ffdbc06-d624-484e-9505-8b534685c14a.jpeg',
        preview: false
      },
      {
        spotId: spotIdMap['Cabin Oasis'],
        url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-553724453830698306/original/0eea157f-eeb0-4f6f-a3bc-9ab18dd1fc4e.jpeg',
        preview: false
      },
      {
        spotId: spotIdMap['Cabin Oasis'],
        url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-553724453830698306/original/ac322ca8-d799-44a6-badf-d36a3ae158b6.jpeg',
        preview: false
      },
      {
        spotId: spotIdMap['Waterfront Paradise'],
        url: 'https://a0.muscache.com/im/pictures/83c7dd43-2069-48aa-a580-fcce551c8518.jpg',
        preview: true
      },
      {
        spotId: spotIdMap['Waterfront Paradise'],
        url: 'https://a0.muscache.com/im/pictures/c1fbc8b8-5f47-4c1a-ac54-1e5ea43d6ed9.jpg',
        preview: false
      },
      {
        spotId: spotIdMap['Waterfront Paradise'],
        url: 'https://a0.muscache.com/im/pictures/cc94f0ad-cb8f-4fe2-aebd-89cce7a26895.jpg',
        preview: false
      },
      {
        spotId: spotIdMap['Waterfront Paradise'],
        url: 'https://a0.muscache.com/im/pictures/1664dee0-e9c1-48cd-a37f-e2e4d816c071.jpg',
        preview: false
      },
      {
        spotId: spotIdMap['Waterfront Paradise'],
        url: 'https://a0.muscache.com/im/pictures/da4e966f-0f8d-4bda-9a14-9054437211dd.jpg',
        preview: false
      },
      {
        spotId: spotIdMap['Bird Haven'],
        url: 'https://a0.muscache.com/im/pictures/0ec4272c-06df-46cd-ac78-c8f94eaced85.jpg',
        preview: true
      },
      {
        spotId: spotIdMap['Bird Haven'],
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-35711829/original/672ee961-bc4f-4848-bc75-df5b860847ca.jpeg',
        preview: false
      },
      {
        spotId: spotIdMap['Bird Haven'],
        url: 'https://a0.muscache.com/im/pictures/6b6ebc54-bd6f-4327-b175-3469b2f6f27b.jpg',
        preview: false
      },
      {
        spotId: spotIdMap['Bird Haven'],
        url: 'https://a0.muscache.com/im/pictures/92b9bfe5-e21a-432a-87a0-887391196467.jpg',
        preview: false
      },
      {
        spotId: spotIdMap['Bird Haven'],
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-35711829/original/76319a96-58af-4487-94f6-3d6ba3080f4a.jpeg',
        preview: false
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
