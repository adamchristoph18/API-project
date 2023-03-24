const express = require('express');
const { requireAuth } = require('../../utils/auth');
const { Review, ReviewImage } = require('../../db/models');

const router = express.Router();


router.delete('/:imageId', requireAuth, async(req, res, next) => {

    const { imageId } = req.params;

    const reviewImage = await ReviewImage.findByPk(imageId);

    if (!reviewImage) {
        const err = new Error("Review Image couldn't be found");
        err.status = 404;
        return next(err);
    }

    const currUserId = req.user.id;
    const review = await Review.findByPk(reviewImage.reviewId);

    if (review.userId !== currUserId) {
        const err = new Error("Forbidden");
        err.status = 404;
        return next(err);
    }


    await reviewImage.destroy();

    return res.status(200).json({
        "message": "Successfully deleted"
    });

})



module.exports = router;
