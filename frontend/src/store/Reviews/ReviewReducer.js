import { GET_REVIEWS } from "./ReviewTypes"

const initialState = {}

const reviewsReducer = (state = initialState, action) => {
    let newState = {...state}

    switch (action.type) {

        case GET_REVIEWS: {
            // Copy the reviews from the payload
            let reviews = [...action.payload.Reviews];

            // Sort the reviews array by createdAt in descending order
            reviews.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

            // Check if there are any reviews and update the state
            if (reviews.length) {
                newState[reviews[0].spotId] = reviews;              
            }
            return newState;
        }

        // case GET_REVIEWS: {
        //     let arr = []
        //     action.payload.Reviews.map(review => {
        //         arr.push(review)
        //     })
        //     if (arr.length) {
        //         newState[arr[0].spotId] = arr              
        //     }
        //     return newState
        // }
        
        default:
            return state
    }
}

export default reviewsReducer;