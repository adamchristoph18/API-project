const express = require('express');
const { Spot } = require('../../db/models');

const router = express.Router();


router.get('/', async (req, res) => {
    const spotsObj = {}; // initialize a new object
    const spotsArray = await Spot.findAll(); // to get an array of spot objects

    spotsObj['Spots'] = spotsArray; // set a key of 'Spots' to the array of spots

    return res.status(200).json(spotsObj);
});


module.exports = router;
