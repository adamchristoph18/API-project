const express = require('express');
const { requireAuth } = require('../../utils/auth');
const { Spot, SpotImage, Booking } = require('../../db/models');

const router = express.Router();


// Get all of the Current User's Bookings
router.get('/current', requireAuth, async(req, res) => {
    const bookings = await Booking.findAll({ where: { userId: req.user.id } }); // this findAll here with return an array

    const bookingsArray = []; // this is so we're able to add properties to each booking object if need be, and key into them
    bookings.forEach(booking => {
        booking = booking.toJSON(); // by looping over them by turning them into POJOs we can work with more easily
        bookingsArray.push(booking);
    });

    for (let booking of bookingsArray) {

        const spot = await Spot.findByPk(booking.spotId, {
            attributes: [ // attributes to include in this query
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
            raw: true // need this so we're able to add properties below
        });

        booking['Spot'] = spot;

        const spotImg = await SpotImage.findOne({
            where: {
                preview: true,
                spotId: spot.id
            }
        });

        if (!spotImg) { // check against the possibility that a spot doesn't have a spotImage to preview
            booking['Spot'].previewImage = null; // if not, set to null
        } else {
            booking['Spot'].previewImage = spotImg.url;
        }

    }

    return res.status(200).json({ Bookings: bookingsArray });
})



const validBooking = async(req, res, next) => { // middleware to validate that a new booking's startDate and endDate don't conflict
                                                        // with any existing bookings, and/or the endDate is on or before the startDate
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

    const bookingConflict = { // initialize error object for a booking conflict
        message: "Sorry, this spot is already booked for the specified dates",
        errors: {}
    };

    for (let booking of bookingsArray) { // check the new booking startDate/endDate against all current bookings

        const currBookingStart = new Date(booking.startDate).getTime(); // unix epoch time
        const currBookingEnd = new Date(booking.endDate).getTime();

        if ((newBookingStart >= currBookingStart && newBookingStart <= currBookingEnd) && (newBookingEnd >= currBookingStart && newBookingEnd <= currBookingEnd)) {
            bookingConflict.errors.startDate = "Start date conflicts with an existing booking"
            bookingConflict.errors.endDate = "End date conflicts with an existing booking"
            return res.status(403).json(bookingConflict);
        }

        if (newBookingStart >= currBookingStart && newBookingStart <= currBookingEnd) {
            bookingConflict.errors.startDate = "Start date conflicts with an existing booking"
            return res.status(403).json(bookingConflict);
        }

        if (newBookingEnd >= currBookingStart && newBookingEnd <= currBookingEnd) {
            bookingConflict.errors.endDate = "End date conflicts with an existing booking"
            return res.status(403).json(bookingConflict);
        }

    }


    next(); // since this is passed in middleware
};



// Edit a Booking
router.put('/:bookingId', requireAuth, validBooking, async(req, res, next) => {
    const { bookingId } = req.params;

    const booking = await Booking.findByPk(bookingId);

    const currEndDate = new Date(booking.endDate).getTime();
    const now = new Date().getTime();

    if (currEndDate < now) { // check to make sure user isn't trying to edit a user that has already came and gone
        const err = new Error("Past bookings can't be modified");
        err.status = 403;
        return next(err);
    }


    const { startDate, endDate } = req.body;

    const newStartDate = new Date(startDate).getTime();

    if (newStartDate < now) {
        const err = new Error("This date is in the past!");
        err.errors = {"BookingIssue": "This date is in the past!"}
        err.status = 403;
        return next(err);
    }


    if (startDate) booking.startDate = new Date(startDate);
    if (endDate) booking.endDate = new Date(endDate);

    await booking.save();

    return res.status(200).json(booking);
})


// Delete a Booking
router.delete('/:bookingId', requireAuth, async(req, res, next) => {
    const { bookingId } = req.params;

    const booking = await Booking.findByPk(bookingId);

    if (!booking) {
        const err = new Error("Booking couldn't be found");
        err.status = 404;
        return next(err);
    }

    const spot = await Spot.findByPk(booking.spotId);
    const currUserId = req.user.id;

    if (spot.ownerId === currUserId || booking.userId === currUserId) {

        const bookingStart = new Date(booking.startDate).getTime();
        const now = new Date().getTime();

        if (bookingStart < now) {

            const err = new Error("Bookings that have been started can't be deleted");
            err.status = 403;
            return next(err);

        }

        await booking.destroy();

        return res.status(200).json({
            "message": "Successfully deleted"
        });

    } else {

        const err = new Error("You can't delete a booking you're not associated with!");
        err.status = 403;
        return next(err);

    }

})





module.exports = router;
