import { GET_REVIEWS } from "./ReviewTypes"

const initialState = {}

const reviewsReducer = (state = initialState, action) => {
    let newState = {...state}

    switch (action.type) {

        case GET_REVIEWS:
            let arr = []
            action.payload.Reviews.map(review => {
                arr.push(review)
            })
            if (arr.length) {
                newState[arr[0].spotId] = arr              
            }
            return newState
        
        default:
            return state
    }
}

export default reviewsReducer;