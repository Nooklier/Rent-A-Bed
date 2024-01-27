const express = require('express')
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');
const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { handleValidationErrors } = require('../../utils/validation');
const { check } = require('express-validator');
const { User } = require('../../db/models');
const router = express.Router();

const validateLogin = [
  check('credential')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage('Email or username is required'),
  check('password')
    .exists({ checkFalsy: true })
    .withMessage('Password is required'),
  handleValidationErrors
];

/***************************************************************** LOG IN USER ***************************************************************/

router.post('/', validateLogin, async (req, res, next) => {
  const { credential, password } = req.body;
      
  // FIND THE USER TO BE LOGIN
  const user = await User.login({credential, password})

  // IF USER DOES NOT EXIST OR PASSWORD DOES NOT MATCH
  if (!user) {
    const err = new Error('The provided credentials were invalid.')
    err.title = 'Invalid credentials'
    err.status = 401;
    return next(err)
  }

  const safeUser = {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    username: user.username
  }
  
  await setTokenCookie(res, user);
  
  // SUCESSFUL RESPONSE FORMAT
  return res.json({
    user: safeUser
  });
});

/***************************************************************** LOG OUT USER ***************************************************************/
  
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
          email: user.email,
          username: user.username,
          firstName: user.firstName,
          lastName: user.lastName
        };
        return res.json({
          user: safeUser
        });
      } else return res.json({ user: null });
    }
  );

module.exports = router;