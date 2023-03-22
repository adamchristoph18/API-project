const express = require('express');
const { check } = require('express-validator');
const { handleValidationErrorsSpots } = require('../../utils/validation');
const { requireAuth } = require('../../utils/auth');
const { Spot, Review, SpotImage, sequelize, User } = require('../../db/models');

const router = express.Router();

// Get all spots
router.get('/', async (req, res) => {

    const spots = await Spot.findAll({ raw: true });

    for (let spot of spots) {

        const spotReviews = await Review.findOne({
            attributes: [[sequelize.fn("AVG", sequelize.col("stars")), "avgRating"]], // need to add .toFixed() here?
            where: {
                spotId: spot.id
            },
            raw: true
        });

        const spotImg = await SpotImage.findOne({
            where: {
                preview: true,
                spotId: spot.id
            }
        })

        spot.avgRating = spotReviews.avgRating;
        spot.previewImage = spotImg.url;
    }

    return res.status(200).json({ Spots: spots });
});


// Get all Spots owned by the Current User
router.get('/current', requireAuth, async (req, res) => {

    const spots = await Spot.findAll({ where: { ownerId: req.user.id } });

    const spotsArray = [];
    spots.forEach(spot => {
        spot = spot.toJSON();

        spotsArray.push(spot)
    })

    for (let spot of spotsArray) {

        const spotReviews = await Review.findOne({
            attributes: [[sequelize.fn("AVG", sequelize.col("stars")), "avgRating"]], // need to add .toFixed() here?
            where: {
                spotId: spot.id
            },
            raw: true
        });

        const spotImg = await SpotImage.findOne({
            where: {
                preview: true,
                spotId: spot.id
            }
        })

        if (!spotReviews) {
            spot.avgRating = null;
        } else {
            spot.avgRating = spotReviews.avgRating;
        }

        if (!spotImg) {
            spot.previewImage = null;
        } else {
            spot.previewImage = spotImg.url;
        }

    }

    return res.status(200).json({ Spots: spotsArray });
})


// Get details of a Spot from an id
router.get('/:spotId', async (req, res, next) => {

    const { spotId } = req.params;
    let spot = await Spot.findByPk(spotId, {
        include: [
            {
                model: SpotImage,
                attributes: ['id', 'url', 'preview']
            },
            {
                model: User,
                as: 'Owner',
                attributes: ['id', 'firstName', 'lastName']
            }
        ]
    });

    if (!spot) {
        const err = new Error("Spot couldn't be found");
        err.status = 404;
        return next(err);
    }

    const spotReviews = await Review.findOne({
        attributes: [[sequelize.fn("AVG", sequelize.col("stars")), "avgRating"]], // need to add .toFixed() here?
        where: {
            spotId: spot.id
        },
        raw: true
    });

    const reviews = await spot.getReviews();
    const totalReviews = reviews.length;
    spot = spot.toJSON();

    if (!spotReviews) {
        spot['avgStarRating'] = null;
    } else {
        spot['avgStarRating'] = spotReviews.avgRating;
    }

    spot['numReviews'] = totalReviews; // this property is showing up at the very bottom (order of properties does not matter)

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
router.post('/:spotId/images', requireAuth, async (req, res, next) => {
    const { spotId } = req.params;
    const { url: imageUrl, preview: imagePreview } = req.body;
    // Require proper authorization: Spot must belong to the current user ??
    const spot = await Spot.findByPk(spotId);

    if (!spot) {
        const err = new Error("Spot couldn't be found");
        err.status = 404;
        return next(err);
    }

    if (spot.ownerId !== req.user.id) {
        const err = new Error("Forbidden");
        err.status = 404;
        return next(err);
    }

    const newSpotImage = await spot.createSpotImage({
        spotId: req.user.id,
        url: imageUrl,
        preview: imagePreview
    });

    const { id, url, preview } = newSpotImage.toJSON();

    return res.status(200).json({
        id,
        url,
        preview
    });
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


// Delete a Spot
router.delete('/:spotId', requireAuth, async (req, res) => {
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

    await currentSpot.destroy();

    return res.status(200).json({
        "message": "Successfully deleted"
    })
})


module.exports = router;
