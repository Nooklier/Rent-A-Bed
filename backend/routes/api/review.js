const express = require('express');
const router = express.Router();
const {User, Spot, Booking, Image, Review} = require('../../db/models');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

/************************************************ VALIDATIONS ***********************************************/

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

/****************************************** ADD AN IMAGE TO A REVIEW BASE ON REVIEW'S ID ********************************************/

router.post('/:reviewId/images', requireAuth, async (req, res) => {

    const { reviewId } = req.params;
    const { url } = req.body;

    const review = await Review.findOne({where: {id: reviewId}, include: {model : Image}})

    // REVIEW MUST BELONG TO CURRENT LOG IN USER 
    if (review.userId !== req.user.id) {
        return res.status(403).json({
            "message" : "Authentication is required"
        })
    }

    // IF REVIEW ID DOES NOT EXIST
    if (!review) {
        return res.status(404).json({
            "message": "Review couldn't be found"
        })
    }
    
    // REVIEW CAN NOT HAVE MORE THAN 10 IMAGES
    if (review.Images.length >= 10) {
        return res.status(403).json({
            "message": "Maximum number of images for this resource was reached"
        })
    }
    
    const newImage = await Image.create({
        url: url,
        imageableId: reviewId,
        imageableType: 'Review'
    })

    res.status(200).json({
        id: newImage.id,
        url: newImage.url
    })
})

/**************************************************** EDIT A REVIEW ************************************************************/

router.put('/:reviewId', requireAuth, validateReview, async (req, res) => {

    const { reviewId } = req.params;
    const { review, stars} = req.body;

    let currentReview = await Review.findByPk(reviewId);

    if (!currentReview) {
        return res.status(404).json({
            "message": "Review couldn't be found"
        })
    }
    
    await currentReview.update({
        review: review,
        stars: stars
    })

    let updatedReview = {
        id: reviewId,
        userId: req.user.id,
        spotId: currentReview.spotId,
        review: currentReview.review,
        stars: currentReview.stars,
        createdAt: currentReview.createdAt,
        updatedat: currentReview.updatedAt
    }

    res.status(200).json(updatedReview)
})

/**************************************************** DELETE A REVIEW ************************************************************/

router.delete('/:reviewId', requireAuth, async (req, res) => {

    const { reviewId } = req.params;

    const review = await Review.findByPk(reviewId)

    console.log(review)

    if (!review) {
        return res.status(404).json({
            "message": "Review couldn't be found"
        })
    }

    if (review.userId !== req.user.id) {
        return res.status(403).json({
            "message" : "Authentication is required"
        })
    }

    await review.destroy({where: { id : reviewId}})

    res.status(200).json({
        "message": "Successfully deleted"
    })
})



module.exports = router;