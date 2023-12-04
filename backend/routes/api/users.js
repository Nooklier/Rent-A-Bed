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
      .withMessage('Invalid email'),
    check('username')
      .exists({ checkFalsy: true })
      .isLength({ min: 4 })
      .withMessage('Username is required'),
    check('username')
      .not()
      .isEmail()
      .withMessage('Username is required'),
    check('firstName')
      .exists({ checkFalsy: true })
      .withMessage('First Name is required'),
    check('lastName')
      .exists({ checkFalsy: true})
      .withMessage('Last Name is required'),
    handleValidationErrors
  ];

/***************************************************************** Sign up ***************************************************************/

router.post('', validateSignup, async (req, res) => {

      const { firstName, lastName, email, password, username } = req.body;
      const hashedPassword = bcrypt.hashSync(password);
      
      
      // FINE EXISTING USER WITH THE FOLLOWING EMAIL
      const existingUserWithEmail = await User.findOne({
        where: { email }
      })
      
      // FIND EXISTING USER WITH THE FOLLOWING USERNAME
      const existingUserWithUsername = await User.findOne({
        where: {username}
      })
      
      // IF USERNAME ALREADY EXIST
      if (existingUserWithUsername) {
        return res.status(500).json({
          "message" : 'User already exists',
          "errors" : {
            "username" : "User with that username already exists"
          }
        })
      }
      
      
      // IF EMAIL ALREADY EXIST
      if (existingUserWithEmail) {
        return res.status(500).json({
          "message" : 'User already exists',
          "errors" : {
            "email" : "User with that email already exists"
          }
        })
      }
      
      const user = await User.create({ firstName, lastName, email, username, hashedPassword });
      
      const safeUser = {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        username: user.username
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