const express = require('express');
const router = express.Router();
const {User, Spot, Booking, Image, Review} = require('../../db/models');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { DATEONLY } = require('sequelize');
const booking = require('../../db/models/booking');

/************************************************ VALIDATIONS ***********************************************/

const validateSpot = [
    check('address')
        .exists({checkFalsy: true})
        .withMessage("Street address is required"),
    check("city")
        .exists({checkFalsy: true})
        .withMessage("City is required"),
    check("state")
        .exists({checkFalsy: true})
        .withMessage("State is required"),
    check("country")
        .exists({checkFalsy: true})
        .withMessage("Country is required"),
    check("lat")
        .exists({checkFalsy: true})
        .isFloat({min: -90, max: 90})
        .withMessage("Latitude must be within -90 and 90"),
    check("lng")
        .exists({checkFalsy: true})
        .isFloat({min: -180, max: 180})
        .withMessage("Longitude must be within -180 and 180"),
    check("name")
        .exists({checkFalsy: true})
        .withMessage("Name is required"),
    check("name")
        .isLength({max: 50})
        .withMessage("Name must be less than 50 characters"),
    check("description")
        .exists({checkFalsy: true})
        .withMessage("Description is required"),
    check("price")
        .exists({checkFalsy: true})
        .withMessage("Price per day must be a positive number"),
    check("price")
        .isFloat({min: 0})
        .withMessage("Price per day must be a positive number"),
        handleValidationErrors
]        

const validateReview = [
    check('review')
        .exists({checkFalsy: true})
        .withMessage("Review text is required"),
    check('stars')
        .exists({checkFalsy: true})
        .withMessage("Stars must be an integer from 1 to 5"),
    check('stars')
        .isFloat({min: 1 , max: 5})
        .withMessage("Stars must be an integer from 1 to 5"),
    handleValidationErrors
]

// const validateBooking = [
//     check('startDate')
//         .exists({checkFalsy: true})
//         .withMessage("startDate is required"),
//     check('endDate')
//         .exists({checkFalsy: true})
//         .withMessage("endDate is required"),
//     handleValidationErrors    
// ]

/************************************************ GET ALL SPOTS *********************************************/

router.get('', async (req, res) => {

    // FIND ALL SPOTS & INCLUDE REVIEW MODEL FOR AVGRATING & IMAGE MODEL FOR PREVIEWIMAGE
    const spots = await Spot.findAll({include: [{model: Review}, {model: Image}]}) 

    // ADD AVGRATING & PREVIEWIMAGE
    const spotDetails = []
    spots.forEach((spot) => {

        let count = 0;
        spot.Reviews.forEach((review) => {count += review.stars})
        let avgReviews = count / spot.Reviews.length;
        
            spotDetails.push({
                id: spot.id,
                ownerId: spot.ownerId,
                address: spot.address,
                city: spot.city,
                state: spot.state,
                country: spot.country,
                lat: spot.lat,
                lng: spot.lng,
                name: spot.name,
                description: spot.description,
                price: spot.price,
                createdAt: spot.createdAt,
                updatedAt: spot.updatedAt,
                avgRating: avgReviews || 0,
                previewImage: spot.Images[0].url
        })
    })

    return res.status(200).json({"Spots":spotDetails})
})

/************************************** GET ALL SPOTS BY CURRENT USER ***************************************/

router.get('/current', requireAuth, async (req, res) => {

    // FIND THE CURRENT USER BY PK
    const currentUser = await User.findByPk(req.user.id)

    // FIND ALL SPOTS BELONGING TO THE CURRENT USER & INCLUDE MODELS FOR AVGRATING & PREVIEWIMAGE
    const spots = await Spot.findAll({where: {ownerId : currentUser.id}, include: [{model : Review}, {model : Image}]})

    // FIND AVGRATING & PREVIEWIMAGE
    const spotDetails = [];
    
    for (const spot of spots) {
        
        // FINE TOTAL NUMBER OF REVIEWS
        const reviewCount = await Review.count({
            where: {
                spotId: spot.id
            }
        })
       
        // FIND SUM OF STARS
        const starsTotal = await Review.sum('stars')

        // FIND AVGRATING
        const avgReviews = starsTotal/reviewCount

        spotDetails.push({
            id: spot.id,
            ownerId: spot.ownerId,
            address: spot.address,
            city: spot.city,
            state: spot.state,
            country: spot.country,
            lat: spot.lat,
            lng: spot.lng,
            name: spot.name,
            description: spot.description,
            price: spot.price,
            createdAt: spot.createdAt,
            updatedAt: spot.updatedAt,
            avgRating: avgReviews || 0,
            previewImage: spot.Images[0].url
        })

    }
    
    res.status(200).json({"Spots": spotDetails})
})

/************************************ GET DETAILS OF A SPOT FROM AN ID ***************************************/

router.get('/:spotId', async (req, res) => {
    const { spotId } = req.params;
    const spot = await Spot.findOne({where: {id : spotId}, include: [{model: Image}, {model: User}, {model: Review}]})

    // IF SPOT DOES NOT EXIST
    if (!spot) {
        return res.status(404).json({"message": "Spot couldn't be found"})
    }

     // FIND AVGRATING & PREVIEWIMAGE
    let count = 0;
    spot.Reviews.forEach((review) => {count += review.stars})
    let avgReviews = count / spot.Reviews.length;

    const spotImages = []

    spot.Images.forEach((image) => {
        spotImages.push({
            id: image.id,
            url: image.url,
            preview: image.preview
        })
    })
    
    const spotDetails = {
        id: spot.id,
        ownerId: spot.ownerId,
        address: spot.address,
        city: spot.city,
        state: spot.state,
        country: spot.country,
        lat: spot.lat,
        lng: spot.lng,
        name: spot.name,
        description: spot.description,
        price: spot.price,
        createdAt: spot.createdAt,
        updatedAt: spot.updatedAt,
        numReviews: spot.Reviews.length,
        avgStarRating: avgReviews || 0,
        SpotImages: spotImages,
        Owner: {
            id: spot.User.id,
            firstName: spot.User.firstName,
            lastName: spot.User.lastName
        }
    }

    res.json(spotDetails)
})

/************************************************ CREATE SPOT  **********************************************/

router.post('/', requireAuth, validateSpot, async (req, res, next) => {

    const {ownerId, address, city, state, country, lat, lng, name, description, price} = req.body;
    const newSpot = await Spot.create(req.body)

    res.status(201).json(newSpot)

})


/********************************************** EDIT SPOT *****************************************************/

router.put('/:spotId', requireAuth, validateSpot, async (req, res) => {
    
    const { spotId } = req.params;
    const { address, city, state, country, lat, lng, name, description, price, createdAt, updatedAt} = req.body;
    
    let spot = await Spot.findByPk(spotId)
    
    // IF SPOT DOES NOT EXIST ERROR
    if (!spot)  {
        return res.status(404).json({
            "message": "Spot couldn't be found"
        })
    }
    
    // IF SPOT BEING EDIT DOES NOT BELONG TO THE CURRENT LOG IN USER
    if (spot.ownerId !== req.user.id) {
        return res.status(403).json({
            "message" : "Authentication is required"
        })
    }
    
    await spot.update({
        address: address,
        city: city,
        state: state,
        country: country,
        lat: lat,
        lng: lng,
        name: name,
        description: description,
        price: price,
        createdAt: createdAt,
        updatedAt: updatedAt
    })
    
    let updatedSpot = {
        id: spot.id,
        ownerId: spot.ownerId,
        address: spot.address,
        city: spot.city,
        lat: spot.lat,
        lng: spot.lng,
        name: spot.name,
        description: spot.description,
        price: spot.price,
        createdAt: spot.createdAt,
        updatedAt: spot.updatedAt
    }
    
    res.status(200).json(updatedSpot)
})

/******************************** ADD AN IMAGE TO A SPOT BASE ON SPOT'S ID  *********************************/

router.post('/:spotId/images', requireAuth, async (req, res) => {

    const { spotId } = req.params;
    const { url, preview} = req.body;

    const spot = await Spot.findOne({ where: { id : spotId }})

    if (!spot) {
        res.status(404).json({
            "message": "Spot couldn't be found"
        })
    }

    const newImage = await Image.create({
        url : url,
        preview: preview,
        imageableId: spotId,
        imageableType: "Spot"
    })

    res.status(200).json({
        id: newImage.id,
        url: newImage.url,
        preview: newImage.preview
    })

})

/******************************************** DELETE A SPOT **************************************************/

router.delete('/:spotId', requireAuth, async (req, res) => {

    const {spotId} = req.params;

    const spot = await Spot.findOne(spotId)

    // IF SPOT DOES NOT EXIST
    if (!spot) {
        return res.status(404).json({
            "message": "Spot couldn't be found"
        })
    }

    // IF SPOT DOES NOT BELONG TO CURRENT USER
    if (spot.ownerId !== req.user.id) {
        return res.status(403).json({
            "message" : "Authentication is required"
        })
    }

    await Spot.destroy({where: {id : spotId}})

    res.status(200).json({
        "message": "Successfully deleted"
      })
    
})


/************************************* GET ALL REVIEWS BY SPOT'S ID ******************************************/

router.get('/:spotId/reviews', async (req, res) => {

    const { spotId } = req.params;
    const currentUser = await User.findByPk(req.user.id)
    const reviews = await Review.findAll({where: { id: spotId}, include:[{model: User}, {model: Image}]})
    const spot = await Spot.findByPk(spotId);
    
    // IF SPOT DOES NOT EXIST
    if (!spot) {
        return res.status(404).json({
            "message": "Spot couldn't be found"
        })
    }
    
    const resObj = [];

    for (const review of reviews) {
        
            const reviewImg = [];
        
            review.Images.forEach((image) => {
                reviewImg.push({
                    id: image.id,
                    url: image.url
                })
            })

        resObj.push({
            id: review.id,
            userId: review.userId,
            review: review.review,
            stars: review.stars,
            createdAt: review.createdAt,
            updatedAt: review.updatedAt,
            User: {
            id: currentUser.id,
            firstName: currentUser.firstName,
                lastName: currentUser.lastName
            },
            ReviewImages: reviewImg
        })
    }
    
    res.status(200).json({"Reviews": resObj})
})

/***************************** CREATE A REVIEW FOR A SPOT BASE ON SPOT ID ***************************************/

router.post('/:spotId/reviews', requireAuth, validateReview, async (req, res) => {

    const { spotId } = req.params;
    const { review, stars } = req.body;
    const currentUser = req.user.id;

    const spot = await Spot.findOne({where: { id: spotId}, include: {model: User}});
    
    if (!spot) {
        return res.status(404).json({
            "message": "Spot couldn't be found"
        })
    }

    const userReview = await Review.findOne({
        where: {
            userId : currentUser,
            spotId: spotId
        }
    })

    if (userReview) {
        return res.status(500).json({
            "message": "User already has a review for this spot"
          })
    }

    const newReview = await Review.create({
        userId: currentUser,
        spotId: spotId,
        review: review,
        stars: stars
    })

    res.status(201).json(newReview)

})

/***************************** GET ALL BOOKINGS FOR SPOT BASE ON SPOT ID ***************************************/

router.get('/:spotId/bookings', requireAuth, async (req, res) => {

    const {spotId} = req.params;
    const currentUser = req.user.id;
    const bookings = await Booking.findAll({where: {spotId: spotId}, include: {model: User}})
    const spot = await Spot.findByPk(spotId)

    // IF SPOT DOES NOT EXIST
    if (!spot) {
        return res.status(404).json({
            "message": "Spot couldn't be found"
        })
    }

    const resObj = []
    
    for (const booking of bookings) {

        // IF YOU ARE NOT THE OWNER OF THE SPOT
        if (spot.ownerId !== currentUser) {
            return res.status(200).json({"Bookings": [{
                spotId: booking.spotId,
                startDate: booking.startDate,
                endDate: booking.endDate
            }]})    
        }

        
        // IF YOU ARE THE OWNER OF THE SPOT
        resObj.push({
            User: {
                id: booking.User.id,
                firstName: booking.User.firstName,
                lastName: booking.User.lastName
            },
            id: booking.id,
            spotId: booking.spotId,
            userId: booking.userId,
            startDate: booking.startDate,
            endDate: booking.endDate,
            createdAt: booking.createdAt,
            updatedAt:booking.updatedAt
        })

    }

    res.status(200).json({"Bookings": resObj})

})


/***************************** CREATE A BOOKING FROM A SPOT BASE ON SPOT ID ******************************************/

router.post('/:spotId/bookings', requireAuth, async (req, res) => {

    const {spotId} = req.params;
    const {startDate, endDate} = req.body;

    const spot = await Spot.findOne({where: {id : spotId}})
    const allBookings = await Booking.findAll({where: {spotId: spotId}})

    // IF SPOT DOES NOT EXIST
    if (!spot) {
        return res.status(404).json({ "message": "Spot couldn't be found"})
    }

    // IF SPOT BELONGS TO CURRENT USER
    if (spot.ownerId === req.user.id) {
        return res.status(403).json({"message" : "Can not book your own spot"})
    }

    let currentDate = new Date()
    let bookingStartDate = new Date(startDate)
    let bookingEndDate = new Date(endDate)
    
    // IF BOOKING STARTDATE IS BEFORE CURRENT DATE
    if (bookingStartDate < currentDate) {
        return res.status(400).json({"message": "startDate cannot be in the past"})
    }

    // IF ENDDATE COMES ON OR BEFORE STARTDATE
    if (bookingStartDate >= bookingEndDate) {
        return res.status(400).json({"message": "endDate cannot be on or before startDate"})
    }
    
    allBookings.forEach((booking) => {
        if (startDate >= booking.startDate && startDate <= booking.endDate) {
            return res.status(403).json({
                "message": "Sorry, this spot is already booked for the specified dates",
                "errors": {
                  "startDate": "Start date conflicts with an existing booking"
                }
              })
        } else if (endDate >= booking.startDate && endDate <= booking.endDate) {
            return res.status(403).json({
                "message": "Sorry, this spot is already booked for the specified dates",
                "errors": {
                  "endDate": "End date conflicts with an existing booking"
                }
              })
        }
    })

    let newBooking = await Booking.create({
        spotId: spotId,
        userId: req.user.id,
        startDate: bookingStartDate,
        endDate: bookingEndDate
    })

    res.status(200).json(newBooking)
    
})







module.exports = router;



