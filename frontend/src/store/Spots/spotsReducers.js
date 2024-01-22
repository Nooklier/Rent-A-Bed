import { GET_SPOT, GET_SPOTS, UPDATE_SPOT } from "./spotsTypes";

const initialState = {
    spots: [],
    currentSpot: {}
}

const spotsReducer = (state = initialState, action) => {
    switch (action.type) {
        
        case GET_SPOTS: 
           return {
            ...state,
            spots:action.payload
           }
        
        case GET_SPOT:
            return {
                ...state,
                currentSpot: action.payload
            }

        case UPDATE_SPOT:
            return {
                ...state,
                currentSpot: action.payload,
                spots: state.spots.map(spot => spot.id === action.payload.id)
            }

        default: 
            return state
    }
}

export default spotsReducer;