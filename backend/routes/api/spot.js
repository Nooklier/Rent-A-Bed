const express = require('express');
const router = express.Router();
const {User, Spot, Booking, Image, Review} = require('../../db/models');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

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

    return res.status(200).json(spotDetails)
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





module.exports = router;