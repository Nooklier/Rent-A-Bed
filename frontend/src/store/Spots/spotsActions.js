import { GET_SPOTS, GET_SPOT, UPDATE_SPOT, DELETE_SPOT, CREATE_SPOT, ADD_IMAGE, ADD_REVIEW, GET_USER_SPOTS, DELETE_REVIEW } from "./spotsTypes"

export const getSpots = (spots) => ({
    type: GET_SPOTS,
    payload: spots
})

export const getSpot = (spot) => ({
    type: GET_SPOT,
    payload: spot
})

export const updateSpot = (spot) => ({
    type: UPDATE_SPOT,
    payload: spot
})

export const deleteSpot = (spotId, spot) => ({
    type: DELETE_SPOT,
    payload: spotId, spot
})

export const createSpot = (spot) => ({
    type: CREATE_SPOT,
    payload: spot
})

export const addImages = (imageData) => ({
    type: ADD_IMAGE,
    payload: imageData
})

export const addReview = (review) => ({
    type: ADD_REVIEW,
    payload: review
})

export const getUserSpots = (spots) => ({
    type: GET_USER_SPOTS,
    payload: spots
})

export const deleteReview = (spotId, reviewId) => ({
    type: DELETE_REVIEW,
    payload: spotId, reviewId
})

