// ACTION TYPES
const SET_IMAGE = 'SET_IMAGES';

// ACTION CREATORS
export const setImage = (images) => ({
    type: SET_IMAGE,
    payload: images
})

// INITIAL STATE
const initialState = {
    images: []
}

// REDUCER
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