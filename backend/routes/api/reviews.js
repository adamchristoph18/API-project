const express = require('express');
const { check } = require('express-validator');
const { handleValidationErrorsSpots } = require('../../utils/validation');
const { requireAuth } = require('../../utils/auth');
const { Spot, Review, SpotImage, sequelize, User, Booking } = require('../../db/models');

const router = express.Router();


// Get all Reviews of the Current User
router.get('/current', requireAuth, async (req, res) => {

})







module.exports = router;
