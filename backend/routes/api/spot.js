const express = require('express');
const router = express.Router();
const {User, Spot, Booking, Image, Review} = require('../../db/models');

/************************************************ GET ALL SPOTS *********************************************/

router.get('', async (req, res) => {
    const allSpots = await Spot.findAll({})

    return res.status(200).json(allSpots)
})

module.exports = router;