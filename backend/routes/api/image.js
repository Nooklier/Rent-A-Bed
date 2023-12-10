const express = require('express');
const router = express.Router();
const {User, Spot, Booking, Image, Review} = require('../../db/models');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

/********************************************************** DELETE SPOT-IMAGE ***************************************************************/

router.delete('/spot-images/:imageId', requireAuth, async (req, res) => {
    const {imageId} = req.params;
    const user = req.user.id;

    const image = await Image.findOne({
        where: {
            id: imageId,
            imageableType: "Spot"
        }, include: {
            model: Spot
        }
    })

    // SPOT-IMAGE DOES NOT EXIST
    if (!image) {
        return res.status(404).json({
            "message": "Spot Image couldn't be found"
        })
    }

    // UNAUTHORIZED USER
    if (image.Spot.ownerId !== user) {
        return res.status(403).json({"message" : "Spot must belong to the current user"})
    }

    await Image.destroy({
        where: {
            id : imageId
        }
    })

    res.status(200).json({
        "message": "Successfully deleted"
    })
})

/********************************************************** DELETE REVIEW-IMAGE ***************************************************************/

router.delete('/review-images/:imageId', requireAuth, async (req, res) => {
    const {imageId} = req.params;
    const user = req.user.id;
    const image = await Image.findOne({where: {id: imageId, imageableType: 'Review'}, include: {model: Review}})

    console.log(image)

    // IF REVIEW IMAGE WITH ID DOES NOT EXIST
    if (!image) {
        return res.status(404).json({
            "message": "Review Image couldn't be found"
        })
    }

    // UNAUTHORIZED USER
    if (image.Review.userId !== user) {
        return res.status(403).json({"message" : "Review must belong to the current user"})
    }


    await Image.destroy({
        where: {
            id: imageId
        }
    })

    res.status(200).json({
        "message": "Successfully deleted"
    })

})

module.exports = router;