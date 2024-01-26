import { csrfFetch } from "../csrf"
import { getReviews } from "./ReviewActions"

export const fetchReviews = (spotId) => async (dispatch) => {
    try {
        const response = await fetch (`/api/spots/${spotId}/reviews`)

        if(response.ok) {
            const reviews = await response.json()
            dispatch(getReviews(reviews))
            return reviews
        } else {
            throw new Error('Failed to load reviews')
        }
    } catch (error) {
        return error
    }
}