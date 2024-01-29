import { ADD_IMAGE, ADD_REVIEW, CREATE_SPOT, DELETE_REVIEW, DELETE_SPOT, GET_SPOT, GET_SPOTS, GET_USER_SPOTS, UPDATE_SPOT } from "./spotsTypes";

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

        case DELETE_SPOT: {
            const spotId = action.payload; 
              delete newState[spotId];
            return newState;
        }
    
        case CREATE_SPOT:
            newState[action.payload.id] = action.payload
            return newState

        case ADD_IMAGE:
            newState[action.payload] = action.payload
            return newState

        case ADD_REVIEW: {
            const spot = newState[action.payload.spotId]
            if (spot) {
                spot.reviews = Array.isArray(spot.reviews) ? [...spot.reviews, action.payload.Reviews] : [action.payload.Reviews];
            }
            return newState;
        }

        // case GET_USER_SPOTS:
        //     // Log the state before update
        //     console.log('State before update:', state);
        //     // Log the action payload
        //     console.log('Action payload:', action.payload);
          
        //     // Update the state by creating a new object
        //     // Ensure that the spots array is replaced entirely by the payload
        //     const updatedState = {
        //       ...state,
        //       spots: action.payload // Payload should be an array of spots
        //     };
          
        //     // Log the state after update
        //     console.log('State after update:', updatedState);
          
        //     return updatedState;
          


        case GET_USER_SPOTS: {
            const spotsArray = action.payload.Spots;
            const newSpots = {};
            if (Array.isArray(spotsArray)) {
              spotsArray.forEach((spot) => {
                newSpots[spot.id] = spot;
              });
            } else {
              console.error('Spots is not an array:', spotsArray);
            }
            newState = { ...newState, ...newSpots };
            return newState;
        }

        case DELETE_REVIEW: {
            const { spotId, reviewId } = action.payload;
            if (newState[spotId]) {
                newState[spotId].reviews = newState[spotId].reviews.filter(review => review.id !== reviewId);
            }
            return newState;
        }
        

        default: 
            return state
    }
}

export default spotsReducer;