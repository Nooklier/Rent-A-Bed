import { csrfFetch } from "../csrf"

export const fetchBookings = (spotId) => async (dispatch) => {
    // console.log(spotId)
    try {
        const response = await csrfFetch(`/api/spots/${spotId}/bookings`)
        
        if (response.ok) {
            const bookings = await response.json()
            dispatch(fetchBookings(bookings))
            return bookings
        } else {
            throw new Error('Failed to load bookings')
        }
        
    } catch (error) {
        return error
    }
}