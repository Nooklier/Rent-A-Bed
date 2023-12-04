const express = require('express');
const router = express.Router();
const {User, Spot, Booking, Image, Review} = require('../../db/models');
const { setTokenCookie, requireAuth } = require('../../utils/auth');

/************************************************ GET ALL SPOTS *********************************************/

router.get('', async (req, res) => {
    const allSpots = await Spot.findAll({})

    return res.status(200).json(allSpots)
})

/************************************** GET ALL SPOTS BY CURRENT USER ***************************************/

router.get('/current', requireAuth, async (req, res) => {

    const currentUser = await User.findByPk(req.user.id)

    const currentUserSpot = await Spot.findAll({
        where: {
            ownerId : currentUser.id
        }
    })

    res.status(200).json({"Spots": currentUserSpot})
})


module.exports = router;