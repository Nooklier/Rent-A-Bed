const express = require('express');
const router = express.Router();
const {User, Spot, Booking, Image, Review} = require('../../db/models');
const { setTokenCookie, requireAuth } = require('../../utils/auth');

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

/************************************ GET DETAILS OF A SPOT FROM AN ID ***************************************/


module.exports = router;