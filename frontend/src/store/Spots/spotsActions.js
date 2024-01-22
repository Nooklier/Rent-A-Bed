import { GET_SPOTS, GET_SPOT, UPDATE_SPOT } from "./spotsTypes"

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