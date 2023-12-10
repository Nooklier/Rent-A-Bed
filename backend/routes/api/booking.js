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
            startDate: booking.startDate.slice(0,10),
            endDate: booking.endDate.slice(0,10),
            createdAt: booking.createdAt,
            updatedAt: booking.updatedAt
        })
    }

    res.status(200).json({"Bookings": resObj})
    
})

/***************************************************** EDIT A BOOKING ***************************************************************/

router.put('/:bookingId', requireAuth, async (req, res) => {
    const {bookingId} = req.params;
    const {startDate, endDate} = req.body;
    const booking = await Booking.findOne({where: {id: bookingId}})
    
    // IF BOOKING DOES NOT EXIST
    if (!booking) {
        return res.status(404).json({
            "message": "Booking couldn't be found"
          })
    }

    let currentDate = new Date()
    let newStartDate = new Date(startDate)
    let newEndDate = new Date(endDate)

    // IF USER DOES NOT LOG IN
    if (booking.userId !== req.user.id) {
        return res.status(403).json({"message" : "Unauthorized user"})
    }
    

    // IF START DATE IS IN THE PAST
    if (newStartDate < currentDate) {
        return res.status(400).json({
            "message": "Bad Request", 
            "errors": {
              "startDate": "startDate cannot be in the past",
            }
          })
    }

    // IF END DATE IS ON OR BEFORE STARTDATE
    if(startDate >= endDate) {
        return res.status(400).json({
            "message": "Bad Request",
            "errors": {
              "endDate": "endDate cannot be on or before startDate"
            }
          })
    }
    
    // CAN'T EDIT A BOOKING THAT HAS ALREADY PAST THE CURRENT DATE
    if (currentDate >= newEndDate) {
        return res.status(403).json({
            "message": "Past bookings can't be modified"
          })
    }

        const bookingStartDate = new Date(booking.startDate);
        const bookingEndDate = new Date(booking.endDate)

        if (newStartDate >= bookingStartDate && newStartDate <= bookingEndDate) {
            return res.status(403).json({
                "message": "Sorry, this spot is already booked for the specified dates",
                "errors": {
                  "startDate": "Start date conflicts with an existing booking"
                }
              })
        }

        if (newEndDate >= bookingStartDate && newEndDate <= bookingEndDate) {
            return res.status(403).json({
                "message": "Sorry, this spot is already booked for the specified dates",
                "errors": {
                    "endDate": "End date conflicts with an existing booking"
                }
              })
        }

        if (newStartDate <= bookingStartDate && newEndDate >= bookingEndDate) {
            return res.status(403).json({
                "message": "Sorry, this spot is already booked for the specified dates",
                "errors": {
                    "endDate": "End date conflicts with an existing booking"
                }
              })
        }

    await booking.update({
        startDate: startDate,
        endDate: endDate,
    })

    let updateBooking = {
        id: booking.id,
        spotId: booking.spotId,
        userId: booking.userId,
        startDate: booking.startDate.slice(0,10),
        endDate: booking.endDate.slice(0,10),
        createdAt: booking.createdAt,
        updatedAt: booking.updatedAt
    }

    res.status(200).json(updateBooking)
})

/***************************************************** DELETE A BOOKING ***************************************************************/

router.delete('/:bookingId', requireAuth, async (req, res) => {
    const user = req.user.id;
    const {bookingId} = req.params;
    const booking = await Booking.findOne({where: {id: bookingId}})

    // IF UNAUTHORIZED BOOKING
    if (booking.userId !== user) {
        res.status(403).json({"message": "Log in required"})
    }

    // IF BOOKING FOR USER DOES NOT EXIST
    if (!booking) {
        return res.status(404).json({
            "message": "Booking couldn't be found"
          })
    }

    // IF USER TRIED TO DELETE BOOKING FOR PAST DATES
    const currentDate = new Date()

    if (booking.startDate <= currentDate) {
        return res.status(403).json({
            "message": "Bookings that have been started can't be deleted"
          })
    }

    await Booking.destroy({where: {id: bookingId}})

    res.status(200).json({
        "message": "Successfully deleted"
      })
})














module.exports = router;