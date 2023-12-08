const express = require('express');
const router = express.Router();
const {User, Spot, Booking, Image, Review} = require('../../db/models');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

/***************************************************** GET ALL OF THE CURRENT USER'S BOOKINGS ***************************************************************/

router.get('/current', requireAuth, async (req, res) => {

    const currentUser = req.user.id;
    const bookings = await Booking.findAll({ where: {userId : currentUser}, include: {model : Spot}})

    const resObj = []

    for (const booking of bookings) {

        const image = await Image.findOne({
            where: {
                preview: true,
                imageableId: booking.Spot.id,
                imageableType: 'Spot'
            }
        })
        
        const spotObj = [];

        spotObj.push({
            id: booking.Spot.id,
            ownerId: booking.Spot.ownerId,
            address: booking.Spot.address,
            city: booking.Spot.city,
            state: booking.Spot.state,
            country: booking.Spot.country,
            lat: booking.Spot.lat,
            lng: booking.Spot.lng,
            name: booking.Spot.name,
            price: booking.Spot.price,
            previewImage: image.url
        },)

        resObj.push({
            id: booking.id,
            spotId: booking.spotId,
            Spot: spotObj,
            userId: booking.userId,
            startDate: booking.startDate,
            endDate: booking.endDate,
            createdAt: booking.createdAt,
            updatedAt: booking.updatedAt
        })
    }

    res.status(200).json({"Bookings": resObj})
    
})

















module.exports = router;