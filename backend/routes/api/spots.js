const express = require('express');
const { Spot, Review, SpotImage, sequelize } = require('../../db/models');

const router = express.Router();


router.get('/', async (req, res) => {
    const spotsObj = {}; // initialize a new object
    const spotsArray = await Spot.findAll({
        include: [{
            model: Review,
            as: 'Reviews',
            attributes: [] // need this because I don't want to include any attributes from the review model
        },
        {
            model: SpotImage,
            as: 'SpotImages',
            attributes: [] // need this because I don't want to include any attributes from the SpotImage model
        }],

        attributes: [ // attributes to include in my query/response
            "id", "ownerId", "address",
            "city", "state", "country",
            "lat", "lng", "name",
            "description", "price", "createdAt", "updatedAt",

            [sequelize.fn('AVG', sequelize.col('Reviews.stars')), 'avgRating'],
            [sequelize.fn('MAX', sequelize.col('SpotImages.url')), 'previewImage'] // 'MAX' here to get 1 or truthy values
        ],
        group: ['Spot.id'] // tells sql how I want the data split up (per spot)
    });

    spotsObj['Spots'] = spotsArray; // set a key of 'Spots' to the array of spots
    return res.status(200).json(spotsObj);
});


module.exports = router;
