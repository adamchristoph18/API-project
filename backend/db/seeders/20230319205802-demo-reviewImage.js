'use strict';

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

    options.tableName = 'ReviewImages';
    return queryInterface.bulkInsert(options, [
      {
        reviewId: reviewIdMap['Great place! Had a lot of fun. Wonderful memories. I stayed here with my extended family, and we had a blast!'],
        url: 'pearl.url'
      },
      {
        reviewId: reviewIdMap['Too many bugs! Hated the decor. Do not recommend.'],
        url: 'bear.url'
      },
      {
        reviewId: reviewIdMap['So much fun. Brought my wife and kids. We all had fun. Would recommend this place to anyone who likes the outdoors!'],
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
