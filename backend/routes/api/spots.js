const express = require('express');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { requireAuth } = require('../../utils/auth');
const { Spot, Review, SpotImage, ReviewImage, sequelize, User, Booking } = require('../../db/models');

const router = express.Router();

// Get all spots
router.get('/', async(req, res) => {

    const page = req.query.page === undefined ? 1 : parseInt(req.query.page);
    const size = req.query.size === undefined ? 5 : parseInt(req.query.size);

    const offset = size * (page - 1);

    const pagination = {};
    if (page >= 1 && size >= 1) {
        pagination.limit = size;
        pagination.offset = offset;
    }


    const spots = await Spot.findAll({ raw: true, ...pagination });

    for (let spot of spots) {

        const spotReviews = await Review.findOne({
            attributes: [[sequelize.fn("AVG", sequelize.col("stars")), "avgRating"]],
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

    return res.status(200).json({ Spots: spots, page: page, size: size });
});


// Get all Spots owned by the Current User
router.get('/current', requireAuth, async(req, res) => {

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
router.get('/:spotId', async(req, res, next) => {

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
        handleValidationErrors
];

// Create a Spot
router.post('/', requireAuth, validateCreateSpot, async(req, res) => {
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
router.post('/:spotId/images', requireAuth, async(req, res, next) => {
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
router.put('/:spotId', requireAuth, validateCreateSpot, async(req, res, next) => {
    const { spotId } = req.params;

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

    const { address, city, state, country, lat, lng, name, description, price } = req.body;

    if (address) spot.address = address;
    if (city) spot.city = city;
    if (state) spot.state = state;
    if (country) spot.country = country;
    if (lat) spot.lat = lat;
    if (lng) spot.lng = lng;
    if (name) spot.name = name;
    if (description) spot.description = description;
    if (price) spot.price = price;

    await spot.save();

    return res.status(200).json(spot);
})


// Delete a Spot
router.delete('/:spotId', requireAuth, async(req, res, next) => {
    const { spotId } = req.params;

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

    await spot.destroy();

    return res.status(200).json({
        "message": "Successfully deleted"
    })
})


// Get all Reviews by a Spot's id
router.get('/:spotId/reviews', async(req, res, next) => {
    const { spotId } = req.params;

    const spot = await Spot.findByPk(spotId);

    if (!spot) {
        const err = new Error("Spot couldn't be found");
        err.status = 404;
        return next(err);
    }

    const reviews = await Review.findAll({ where: { spotId } });

    const reviewsArray = [];
    reviews.forEach(review => {
        review = review.toJSON();

        reviewsArray.push(review);
    })

    for (let review of reviewsArray) {

        const user = await User.findByPk(review.userId, {
            attributes: ['id', 'firstName', 'lastName']
        });

        review['User'] = user;

        const reviewImgs = await ReviewImage.findAll({
            where: {
                reviewId: review.id
            },
            attributes: ['id', 'url']
        });

        review['ReviewImages'] = reviewImgs;
    }

    return res.status(200).json({ Reviews: reviewsArray });
})


const validateCreateReview = [
    check('review')
        .exists({ checkFalsy: true })
        .withMessage('Review text is required'),
    check('stars')
        .exists({ checkFalsy: true })
        .withMessage('Stars must be an integer from 1 to 5'),
        handleValidationErrors
];

// Create a Review for a Spot based on the Spot's id
router.post('/:spotId/reviews', requireAuth, validateCreateReview, async(req, res, next) => {
    const { spotId } = req.params;

    const spot = await Spot.findByPk(spotId);

    if (!spot) {
        const err = new Error("Spot couldn't be found");
        err.status = 404;
        return next(err);
    }

    const existingReview = await Review.findOne({
        where: {
            spotId,
            userId: req.user.id
        }
    })

    if (existingReview) {
        const err = new Error("User already has a review for this spot");
        err.status = 403;
        return next(err);
    }

    const { review, stars } = req.body;

    const newReview = await Review.create({
        spotId,
        userId: req.user.id,
        review,
        stars
    });

    return res.status(201).json(newReview);
})


// Get all Bookings for a Spot based on the Spot's id
router.get('/:spotId/bookings', requireAuth, async(req, res, next) => {
    const { spotId } = req.params;

    const spot = await Spot.findByPk(spotId);

    if (!spot) {
        const err = new Error("Spot couldn't be found");
        err.status = 404;
        return next(err);
    }


    if (spot.ownerId !== req.user.id) {

        const bookings = await Booking.findAll({
            where: {
                spotId
            },
            attributes: ['spotId', 'startDate', 'endDate']
        });

        const bookingsArray = [];
        bookings.forEach(booking => {
            booking = booking.toJSON();

            bookingsArray.push(booking);
        })

        return res.status(200).json({ "Bookings": bookingsArray });

    } else {

        const bookings = await Booking.findAll({
            where: {
                spotId
            }
        });

        const bookingsArray = [];
        bookings.forEach(booking => {
            booking = booking.toJSON();

            bookingsArray.push(booking);
        })

        for (let booking of bookingsArray) {
            const user = await User.findByPk(booking.userId, {
                attributes: ['id', 'firstName', 'lastName']
            });

            booking['User'] = user;
        }

        return res.status(200).json({ "Bookings": bookingsArray });
    }
})


const validBooking = async(req, res, next) => {

    const { spotId } = req.params;
    const { startDate, endDate } = req.body;

    const newBookingStart = new Date(startDate).getTime();
    const newBookingEnd = new Date(endDate).getTime();

    if (newBookingEnd <= newBookingStart) {
        return res.status(400).json({
            "message": "Bad Request",
            "errors": {
                "endDate": "endDate cannot be on or before startDate"
            }
        });
    }

    const bookings = await Booking.findAll({ where: { spotId } });

    const bookingsArray = [];
    bookings.forEach(booking => {
        booking = booking.toJSON();
        bookingsArray.push(booking);
    });

    const bookingConflict = {
        message: "Sorry, this spot is already booked for the specified dates",
        errors: {}
    };

    for (let booking of bookingsArray) {

        const currBookingStart = new Date(booking.startDate).getTime();
        const currBookingEnd = new Date(booking.endDate).getTime();

        if (newBookingStart >= currBookingStart && newBookingStart <= currBookingEnd) {
            bookingConflict.errors.startDate = "Start date conflicts with an existing booking"
            return res.status(403).json(bookingConflict);
        }

        if (newBookingEnd >= currBookingStart && newBookingEnd <= currBookingEnd) {
            bookingConflict.errors.endDate = "End date conflicts with an existing booking"
            return res.status(403).json(bookingConflict);
        }

    }

    next();
};



// Create a Booking from a Spot based on the Spot's id
router.post('/:spotId/bookings', requireAuth, validBooking, async(req, res, next) => {

    const { spotId } = req.params;
    const spot = await Spot.findByPk(spotId);

    if (!spot) {
        const err = new Error("Spot couldn't be found");
        err.status = 404;
        return next(err);
    }

    if (spot.ownerId === req.user.id) {
        const err = new Error("This spot is your own!");
        err.status = 404;
        return next(err);
    }

    const { startDate, endDate } = req.body;

    const newBooking = await Booking.create({
        spotId,
        userId: req.user.id,
        startDate,
        endDate
    });


    return res.status(200).json(newBooking);
})



module.exports = router;
