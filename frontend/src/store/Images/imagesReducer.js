import { SET_IMAGE } from "./imagesTypes"

const initialState = {
    images: []
}

const imagesReducer = ( state = initialState, action) => {
    switch (action.type) {
        case SET_IMAGE: 
            return {
                ...state,
                images: action.payload
            }
        default: 
            return state
    }
}

export default imagesReducer;