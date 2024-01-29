import { GET_SPOTS, GET_SPOT, UPDATE_SPOT, DELETE_SPOT, CREATE_SPOT, ADD_IMAGE, ADD_REVIEW } from "./spotsTypes"

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

export const deleteSpot = (spotId) => ({
    type: DELETE_SPOT,
    payload: {spotId}
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