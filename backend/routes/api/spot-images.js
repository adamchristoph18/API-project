const express = require('express');
const { requireAuth } = require('../../utils/auth');
const { Spot, SpotImage } = require('../../db/models');

const {
    multipleMulterUpload,
    multiplePublicFileUpload
} = require('../../awsS3.js');

const router = express.Router();


router.delete('/:imageId', requireAuth, async(req, res, next) => {

    const { imageId } = req.params;

    const spotImage = await SpotImage.findByPk(imageId);

    if (!spotImage) {
        const err = new Error("Spot Image couldn't be found");
        err.status = 404;
        return next(err);
    }

    const currUserId = req.user.id;
    const spot = await Spot.findByPk(spotImage.spotId);

    if (spot.ownerId !== currUserId) {
        const err = new Error("Forbidden");
        err.status = 404;
        return next(err);
    }


    await spotImage.destroy();

    return res.status(200).json({
        "message": "Successfully deleted"
    });

})



module.exports = router;
