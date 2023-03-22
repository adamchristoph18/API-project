const express = require('express');
const { check } = require('express-validator');
const { handleValidationErrorsSpots } = require('../../utils/validation');
const { requireAuth } = require('../../utils/auth');
const { Spot, Review, SpotImage, ReviewImage, sequelize, User, Booking } = require('../../db/models');

const router = express.Router();


// Get all Reviews of the Current User
router.get('/current', requireAuth, async (req, res) => {
    const reviews = await Review.findAll({ where: { userId: req.user.id } });

    const reviewsArray = [];
    reviews.forEach(review => {
        review = review.toJSON();
        reviewsArray.push(review);
    });

    for (let review of reviewsArray) {

        const user = await User.findByPk(review.userId, {
            attributes: ['id', 'firstName', 'lastName']
        });

        review['User'] = user;

        const spot = await Spot.findByPk(review.spotId, {
            attributes: [
                            'id',
                            'ownerId',
                            'address',
                            'city',
                            'state',
                            'country',
                            'lat',
                            'lng',
                            'name',
                            'price'
                        ],
            raw: true
        });

        review['Spot'] = spot;

        const spotImg = await SpotImage.findOne({
            where: {
                preview: true,
                spotId: spot.id
            }
        });

        if (!spotImg) {
            review['Spot'].previewImage = null;
        } else {
            review['Spot'].previewImage = spotImg.url;
        }

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







module.exports = router;
