const express = require('express');
const { Spot, Review, SpotImage, sequelize, User } = require('../../db/models');

const router = express.Router();

// Get all spots
router.get('/', async (req, res) => {
    const spotsObj = {}; // initialize a new object
    const spotsArray = await Spot.findAll({
        include: [{
            model: Review, // this is imported above
            as: 'Reviews',
            attributes: [] // need this because I don't want to include any attributes from the review model
        },
        {
            model: SpotImage, // this is imported above
            as: 'SpotImages',
            attributes: [] // need this because I don't want to include any attributes from the SpotImage model
        }],

        attributes: { // attributes to include in my query/response
            include: [ // include here to add new columns on top of everything that spot has
            [sequelize.fn('AVG', sequelize.col('Reviews.stars')), 'avgRating'],
            [sequelize.col('SpotImages.url'), 'previewImage'] // .url is a string
            ]
        },
        group: ['Spot.id', 'SpotImages.url'] // tells sql how I want the data split up (per spot)
    });

    spotsObj['Spots'] = spotsArray; // set a key of 'Spots' to the array of spots
    return res.status(200).json(spotsObj);
});


// Get all Spots owned by the Current User
router.get('/current', async (req, res) => {
    const currentUserSpotsObj = {}; // initialize a new object
    const currentUserId = req.user.id;
    const currentUser = await User.findByPk(currentUserId);

    const spotsArray = await currentUser.getSpots({
        include: [{
            model: Review, // this is imported above
            as: 'Reviews',
            attributes: [] // need this because I don't want to include any attributes from the review model
        },
        {
            model: SpotImage, // this is imported above
            as: 'SpotImages',
            attributes: [] // need this because I don't want to include any attributes from the SpotImage model
        }],

        attributes: { // attributes to include in my query/response
            include: [ // include here to add new columns on top of everything that spot has
            [sequelize.fn('AVG', sequelize.col('Reviews.stars')), 'avgRating'],
            [sequelize.col('SpotImages.url'), 'previewImage'] // .url is a string
            ]
        },
        group: ['Spot.id', 'SpotImages.url'] // tells sql how I want the data split up (per spot)
    });

    currentUserSpotsObj['Spots'] = spotsArray; // set a key of 'Spots' to the array of spots owned by the current user
    return res.status(200).json(currentUserSpotsObj);
})


// Get details of a Spot from an id
router.get('/:spotId', async (req, res) => {
    const { spotId } = req.params;
    const spot = await Spot.findByPk(spotId, {
        include: [{
            model: Review, // this is imported above
            as: 'Reviews',
            attributes: [] // need this because I don't want to include any attributes from the review model
        },
        {
            model: SpotImage, // this is imported above
            as: 'SpotImages',
            attributes: ['id', 'url', 'preview']
        },
        {
            model: User, // this is imported above
            as: 'Owner',
            attributes: ['id', 'firstName', 'lastName']
        }],

        attributes: { // attributes to include in my query/response
            include: [ // include here to add new columns on top of everything that spot has
            [sequelize.fn('COUNT'), 'numReviews'],
            [sequelize.fn('AVG', sequelize.col('Reviews.stars')), 'avgStarRating']
            ]
        },
    });

    if (!spot.id) { // error handling for the instance that a spot with the passed in id does not exist
        return res.status(404).json({
            "message": "Spot couldn't be found"
        })
    }

    return res.status(200).json(spot);
})



module.exports = router;
