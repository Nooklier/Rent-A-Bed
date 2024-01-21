import { GET_SPOTS } from "./spotsTypes"
import { GET_SPOT } from "./spotsTypes"

export const getSpots = (spots) => ({
    type: GET_SPOTS,
    payload: spots
})

export const getSpot = (spot) => ({
    type: GET_SPOT,
    payload: spot
})