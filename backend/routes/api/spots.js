const express = require('express');
const { check } = require('express-validator');
const { handleValidationErrorsSpots } = require('../../utils/validation');
const { requireAuth } = require('../../utils/auth');
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
router.get('/current', requireAuth, async (req, res) => {
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

const validateCreateSpot = [
    check('address')
        .exists({ checkFalsy: true })
        .withMessage('Street address is required'),
    check('city')
        .exists({ checkFalsy: true })
        .withMessage('City is required'),
    check('state')
        .exists({ checkFalsy: true })
        .withMessage('State is required'),
    check('country')
        .exists({ checkFalsy: true })
        .withMessage('Country is required'),
    check('lat')
        .exists({ checkFalsy: true })
        .withMessage('Latitude is not valid'),
    check('lng')
        .exists({ checkFalsy: true })
        .withMessage('Longitude is not valid'),
    check('name')
        .exists({ checkFalsy: true })
        .withMessage('Name must be less than 50 characters'),
    check('description')
        .exists({ checkFalsy: true })
        .withMessage('Description is required'),
    check('price')
        .exists({ checkFalsy: true })
        .withMessage('Price per day is required'),
    handleValidationErrorsSpots
];

// Create a Spot
router.post('/', requireAuth, validateCreateSpot, async (req, res) => {
    const currentUser = req.user;
    const { address, city, state, country, lat, lng, name, description, price } = req.body;

    const newSpot = await Spot.create({
        ownerId: currentUser.id,
        address,
        city,
        state,
        country,
        lat,
        lng,
        name,
        description,
        price
    });

    return res.status(201).json(newSpot);
})


// Add an Image to a Spot based on the Spot's id
router.post('/:spotId/images', requireAuth, async (req, res) => {
    const { spotId } = req.params;
    const { url, preview } = req.body;
    // Require proper authorization: Spot must belong to the current user ??
    const currentSpot = await Spot.findOne({
        where: {
            id: spotId,
            ownerId: req.user.id
        }
    });

    if (!currentSpot) {
        return res.status(404).json({
            "message": "Spot couldn't be found"
        })
    }

    const newSpotImage = await SpotImage.create({
        spotId: currentSpot.id,
        url,
        preview
    });

    return res.status(200).json(newSpotImage);
})


// Edit a Spot
router.put('/:spotId', requireAuth, validateCreateSpot, async (req, res) => {
    const { spotId } = req.params;

    const currentSpot = await Spot.findOne({
        where: {
            id: spotId,
            ownerId: req.user.id
        }
    });

    if (!currentSpot) {
        return res.status(404).json({
            "message": "Spot couldn't be found"
        })
    }

    const { address, city, state, country, lat, lng, name, description, price } = req.body;

    if (address) currentSpot.address = address;
    if (city) currentSpot.city = city;
    if (state) currentSpot.state = state;
    if (country) currentSpot.country = country;
    if (lat) currentSpot.lat = lat;
    if (lng) currentSpot.lng = lng;
    if (name) currentSpot.name = name;
    if (description) currentSpot.description = description;
    if (price) currentSpot.price = price;

    await currentSpot.save();

    return res.status(400).json(currentSpot);
})


module.exports = router;
