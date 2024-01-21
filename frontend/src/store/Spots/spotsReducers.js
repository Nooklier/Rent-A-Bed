import { GET_SPOTS } from "./spotsTypes";

const initialState = {
    spots: []
}

const spotsReducer = (state = initialState, action) => {
    switch (action.type) {
        
        case GET_SPOTS: 
           return {
            ...state,
            spots:action.payload
           }
        
        default: 
            return state
    }
}

export default spotsReducer;