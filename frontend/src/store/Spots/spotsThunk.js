import { getSpots } from "./spotsActions"

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