const express = require('express');
const router = express.Router();
const {User, Spot, Booking, Image, Review} = require('../../db/models');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

/************************************************ GET ALL REVIEWS OF CURRENT USER *********************************************/

router.get('/current', requireAuth, async (req, res) => {

    const currentUser = await User.findByPk(req.user.id)
    const reviews = await Review.findAll({where: {userId : currentUser.id}, include: [{model : User}, {model : Image}, {model: Spot}]})

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
            Spot: {
                id: review.Spot.id,
                ownerId: review.Spot.ownerId,
                address: review.Spot.address,
                city: review.Spot.city,
                country: review.Spot.country,
                lat: review.Spot.lat,
                lng: review.Spot.lng,
                name: review.Spot.name,
                price: review.Spot.price,
                previewImage: review.Images[0].url
            },
            ReviewImages: reviewImg
        })

    }

    res.status(200).json({"Reviews": resObj})
    
})













module.exports = router;