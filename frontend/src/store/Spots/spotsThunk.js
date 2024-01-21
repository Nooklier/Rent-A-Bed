import { getSpots } from "./spotsActions"
import { getSpot } from "./spotsActions"

export const fetchSpots = () => async (dispatch) => {
    try {
        const response = await fetch ('api/spots')
        
        if(response.ok) {
            const spots = await response.json()
            dispatch(getSpots(spots))
            return spots
        } else {
            throw new Error('Failed to load spots')
        }
    }
    catch (error) {
        return error
    }
}

export const fetchSpot = (spotId) => async (dispatch) => {
    try {
        const response = await fetch (`api/spots/${spotId}`)

        if (response.ok) {
            const spot = await response.json()
            dispatch(getSpot(spot))
            return spot
        } else {
            throw new Error(`Failed to load spot with id ${spotId}`)
        }
    }
    catch (error) {
        return error
    }
}