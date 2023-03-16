const express = require('express');
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');

const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { User } = require('../../db/models');

const router = express.Router();
// Log in
router.post(
    '/',
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
        username: user.username,
      };

      await setTokenCookie(res, safeUser); // helper function to generate the token for our users

      return res.json({
        user: safeUser
      });
    }
  );

module.exports = router;
