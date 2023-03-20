const express = require('express');
const { Spot, Review } = require('../../db/models');

const router = express.Router();


router.get('/', async (req, res) => {
    const spotsObj = {}; // initialize a new object
    const spotsArray = await Spot.findAll(); // to get an array of spot objects

    for (let spot of spotsArray) {

        const reviews = await Review.findAll({
            where: {
                spotId: spot.id // find all of the reviews that correspond to the spot
            }
        });

        let totalStars = 0;
        for (let review of reviews) {
            totalStars += review.stars;
        }
        spot.avgRating = totalStars / reviews.length;
        // total of all of the review.stars / divided by reviews.length
    }

    spotsObj['Spots'] = spotsArray; // set a key of 'Spots' to the array of spots

    return res.status(200).json(spotsObj);
});


module.exports = router;
