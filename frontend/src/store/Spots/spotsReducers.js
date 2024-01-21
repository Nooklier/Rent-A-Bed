import { GET_SPOT, GET_SPOTS } from "./spotsTypes";

const initialState = {
    spots: [],
    currentSpot: []
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

        default: 
            return state
    }
}

export default spotsReducer;