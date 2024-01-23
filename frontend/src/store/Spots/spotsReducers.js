import { CREATE_SPOT, DELETE_SPOT, GET_SPOT, GET_SPOTS, UPDATE_SPOT } from "./spotsTypes";

const initialState = {}

const spotsReducer = (state = initialState, action) => {
    let newState = {...state}
    
    switch (action.type) {
        
        case GET_SPOTS: 
            action.payload.Spots.map(spot => {
                newState[spot.id] = spot
            })
           return newState
        
        case GET_SPOT:
            newState[action.payload.id] = action.payload
            return newState
        
        case UPDATE_SPOT:
            newState[action.payload.id] = action.payload
            return newState

        case DELETE_SPOT: 
            delete newState.spots[action.payload]
            return newState
    
        case CREATE_SPOT:
            newState.action.payload
            return newState

        default: 
            return state
    }
}

export default spotsReducer;