const express = require('express');
const { Spot, Review, SpotImage, sequelize } = require('../../db/models');

const router = express.Router();

// GET ALL SPOTS
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

        attributes: { // attributes to include in my query/response
            include: [ // include here to add new columns on top of everything that spot has
            [sequelize.fn('AVG', sequelize.col('Reviews.stars')), 'avgRating'],
            [sequelize.col('SpotImages.url'), 'previewImage'] // .url is a string
            ]
        },
        group: ['Spot.id'] // tells sql how I want the data split up (per spot)
    });

    spotsObj['Spots'] = spotsArray; // set a key of 'Spots' to the array of spots
    return res.status(200).json(spotsObj);
});


module.exports = router;
