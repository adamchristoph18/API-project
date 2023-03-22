const express = require('express');
const { check } = require('express-validator');
const { handleValidationErrorsSpots } = require('../../utils/validation');
const { requireAuth } = require('../../utils/auth');
const { Spot, Review, SpotImage, ReviewImage, sequelize, User, Booking } = require('../../db/models');

const router = express.Router();


// Get all Reviews of the Current User
router.get('/current', requireAuth, async(req, res) => {
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


// Add an Image to a Review based on the Review's id
router.post('/:reviewId/images', requireAuth, async(req, res, next) => {
    const { reviewId } = req.params;
    const { url: imageUrl } = req.body;

    const review = await Review.findByPk(reviewId);

    if (!review) {
        const err = new Error("Review couldn't be found");
        err.status = 404;
        return next(err);
    }

    if (review.userId !== req.user.id) {
        const err = new Error("Forbidden");
        err.status = 404;
        return next(err);
    }

    const currentReviewImages = await review.getReviewImages();

    if (currentReviewImages.length >= 10) {
        const err = new Error("Maximum number of images for this resource was reached");
        err.status = 404;
        return next(err);
    }

    const newReviewImage = await ReviewImage.create({
        reviewId: review.id,
        url: imageUrl
    });

    const { id, url } = newReviewImage.toJSON();

    return res.status(200).json({
        id,
        url
    });
})





module.exports = router;
