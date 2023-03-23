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

    for (let booking of bookingsArray) {

        const spot = await Spot.findByPk(booking.spotId, {
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

        booking['Spot'] = spot;

        const spotImg = await SpotImage.findOne({
            where: {
                preview: true,
                spotId: spot.id
            }
        });

        if (!spotImg) {
            booking['Spot'].previewImage = null;
        } else {
            booking['Spot'].previewImage = spotImg.url;
        }

    }

    return res.status(200).json({ Bookings: bookingsArray });
})



const validBooking = async(req, res, next) => {

    const { bookingId } = req.params;

    const booking = await Booking.findByPk(bookingId);

    if (!booking) {
        const err = new Error("Booking couldn't be found");
        err.status = 404;
        return next(err);
    }

    if (booking.userId !== req.user.id) {
        const err = new Error("Forbidden");
        err.status = 404;
        return next(err);
    }


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

    const bookings = await Booking.findAll();

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



// Edit a Booking
router.put('/:bookingId', requireAuth, validBooking, async(req, res, next) => {
    const { bookingId } = req.params;

    const booking = await Booking.findByPk(bookingId);

    const currEndDate = new Date(booking.endDate).getTime();
    const now = new Date().getTime();

    if (currEndDate < now) {
        const err = new Error("Past bookings can't be modified");
        err.status = 403;
        return next(err);
    }


    const { startDate, endDate } = req.body;

    const newStartDate = new Date(startDate).getTime();

    if (newStartDate < now) {
        const err = new Error("You can't modify a booking to be in the past!");
        err.status = 403;
        return next(err);
    }


    if (startDate) booking.startDate = new Date(startDate);
    if (endDate) booking.endDate = new Date(endDate);

    await booking.save();

    return res.status(200).json(booking);
})







module.exports = router;
