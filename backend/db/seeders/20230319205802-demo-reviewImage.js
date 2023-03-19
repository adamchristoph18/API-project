'use strict';
const bcrypt = require("bcryptjs");

const { Review, ReviewImage } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  up: async (queryInterface, Sequelize) => {

    const reviews = await Review.findAll();

    const reviewIdMap = {};
    for (let review of reviews) {
      reviewIdMap[review.review] = review.id;
    }

    // console.log(reviewIdMap);

    options.tableName = 'ReviewImages';
    return queryInterface.bulkInsert(options, [
      {
        reviewId: reviewIdMap['Great place! Had a lot of fun. Wonderful memories.'],
        url: 'pearl.url'
      },
      {
        reviewId: reviewIdMap['Too many Bears! Hated the decor. Do not recommend.'],
        url: 'bear.url'
      },
      {
        reviewId: reviewIdMap['So much fun. Brought my wife and kids. We all had fun.'],
        url: 'rock.url'
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'ReviewImages';
    const Op = Sequelize.Op;

    const reviewImages = await ReviewImage.findAll();
    const reviewImagesIds = reviewImages.map(reviewImage => reviewImage.id); // array of ids

    return queryInterface.bulkDelete(options, {
      id: { [Op.in]: reviewImagesIds }
    }, {});
  }
};
