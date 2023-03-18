const express = require('express');
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { User } = require('../../db/models');
const router = express.Router();

const validateLogin = [
  check('credential')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage('Please provide a valid email or username.'),
  check('password')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a password.'),
  handleValidationErrors
];

// Log in
router.post(
    '/',
    validateLogin,
    async (req, res, next) => {
      const { credential, password } = req.body; // credential can be either username or email

      const user = await User.unscoped().findOne({ // unscoped because we do need the hashed password here, excluding
        where: {                                                    // it is a default scope
          [Op.or]: {
            username: credential,
            email: credential
          }
        }
      });

      if (!user || !bcrypt.compareSync(password, user.hashedPassword.toString())) {
        const err = new Error('Login failed');
        err.status = 401;
        err.title = 'Login failed';
        err.errors = { credential: 'The provided credentials were invalid.' }; // vague error message here is on purpose!
        return next(err);                                           // you don't want to volunteer any kind of information
      }

      const safeUser = {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
      };

      await setTokenCookie(res, safeUser); // helper function to generate the token for our users

      return res.json({
        user: safeUser
      });
    }
  );

  router.delete(
    '/',
    (_req, res) => {
      res.clearCookie('token');
      return res.json({ message: 'success' });
    }
  );

// Restore session user
router.get(
  '/',
  (req, res) => {
    const { user } = req;
    if (user) {
      const safeUser = {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        username: user.username,
      };
      return res.json({
        user: safeUser
      });
    } else return res.json({ user: null });
  }
);

module.exports = router;
