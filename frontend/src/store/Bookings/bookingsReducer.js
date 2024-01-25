import { GET_BOOKINGS } from "./bookingTypes"

const initialState = {}

const bookingsReducer = (state = initialState, action) => {
    let newState = {...state}

    switch (action.type) {

        case GET_BOOKINGS:
            action.payload.Bookings.map(booking => {
                newState[booking.id] = booking
            })
            return newState

        default:
            return state
    }
}

export default bookingsReducer;

