const express = require('express');
const router = express.Router();
const {User, Spot, Booking, Image, Review} = require('../../db/models');


router.get('spots', async (req, res) => {
    const allSpots = Spot.findAll({
        attributes: {
            exclude : [ 'updatedAt', 'createdAt']
        }
    })
})