'use strict';
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  up: async (queryInterface, Sequelize) => {

    options.tableName = 'Users';
    return queryInterface.bulkInsert(options, [
      {
        email: 'john@user.io',
        firstName: 'John',
        lastName: 'Smithserson',
        username: 'Jsmithser',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'Carrie@user.io',
        firstName: 'Carrie',
        lastName: 'Robbins',
        username: 'Crobbins',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'Dirk@user.io',
        firstName: 'Dirk',
        lastName: 'Chester',
        username: 'Dchester',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'demo@user.io',
        firstName: 'Adam',
        lastName: 'Tull',
        username: 'demoUser',
        hashedPassword: bcrypt.hashSync('password')
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Users';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      username: { [Op.in]: ['Jsmithser', 'Crobbins', 'Dchester'] }
    }, {});
  }
};
