const express = require('express');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { requireAuth } = require('../../utils/auth');
const { Spot, Review, SpotImage, ReviewImage, sequelize, User, Booking } = require('../../db/models');

const router = express.Router();


// Get all of the Current User's Bookings
router.get('/current', requireAuth, async(req, res) => {
    const bookings = await Booking.findAll({ where: { userId: req.user.id } });

    const bookingsArray = [];
    bookings.forEach(booking => {
        booking = booking.toJSON();
        bookingsArray.push(booking);
    });

    console.log('---------------');
    console.log(bookingsArray)
    console.log('---------------');

    return res.status(200).json({ Bookings: bookingsArray });
})






module.exports = router;
