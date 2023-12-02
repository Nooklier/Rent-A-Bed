const express = require('express')
const router = express.Router();
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const bcrypt = require('bcryptjs');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');



const validateSignup = [
    check('email')
      .exists({ checkFalsy: true })
      .isEmail()
      .withMessage('Please provide a valid email.'),
    check('username')
      .exists({ checkFalsy: true })
      .isLength({ min: 4 })
      .withMessage('Please provide a username with at least 4 characters.'),
    check('username')
      .not()
      .isEmail()
      .withMessage('Username cannot be an email.'),
    check('password')
      .exists({ checkFalsy: true })
      .isLength({ min: 6 })
      .withMessage('Password must be 6 characters or more.'),
    handleValidationErrors
  ];

/***************************************************************** Sign up ***************************************************************/

router.post('', validateSignup, async (req, res) => {

      const { email, password, username } = req.body;
      const hashedPassword = bcrypt.hashSync(password);
      const user = await User.create({ email, username, hashedPassword });
  
      const safeUser = {
        id: user.id,
        email: user.email,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName
      };
  
      await setTokenCookie(res, safeUser);
  
      return res.json({
        user: safeUser
      });
    }
  );
  
/***************************************************************** Get Current User ***************************************************************/

router.get('/session', requireAuth, async (req, res) => {

  if (!res.User) (res.status(200).json({"user": null}))

  const currentUser = {
    "user": {
      "id": req.user.id,
      "firstName": req.user.firstName,
      "lastName": req.user.lastName,
      "username": req.user.username
    }
  }

  res.json(currentUser)
  
})

module.exports = router;