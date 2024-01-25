import { GET_REVIEWS } from "./ReviewTypes"

const initialState = {}

const reviewsReducer = (state = initialState, action) => {
    let newState = {...state}

    switch (action.type) {

        case GET_REVIEWS:
            action.payload.Reviews.map(review => {
                newState[review.id] = review
            })
            return newState
        
        default:
            return state
    }
}

export default reviewsReducer;