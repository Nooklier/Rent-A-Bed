import { csrfFetch } from "../csrf"
import { getSpots, updateSpot, getSpot, deleteSpot, addImages, createSpot, addReview } from "./spotsActions"

export const fetchSpots = () => async (dispatch) => {
    try {
        const response = await csrfFetch ('api/spots')
        
        if(response.ok) {
            const spots = await response.json()
            dispatch(getSpots(spots))
            return spots
        } else {
            throw new Error('Failed to load spots')
        }
    }
    catch (error) {
        return error
    }
}

export const fetchSpot = (spotId) => async (dispatch) => {
    try {
        const response = await fetch (`/api/spots/${spotId}`)

        if (response.ok) {
            const spot = await response.json()
            dispatch(getSpot(spot))
            return spot
        } else {
            throw new Error(`Failed to load spot with id ${spotId}`)
        }
    }
    catch (error) {
        return error
    }
}

export const fetchUpdateSpot = (spotId, updatedSpotData) => async (dispatch) => {
    try {
      const response = await csrfFetch(`/api/spots/${spotId}`, {
        method: 'PUT', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedSpotData),
      });

      if (response.ok) {
        const updatedSpot = await response.json();
        dispatch(updateSpot(updatedSpot)); 
      } else {
        throw new Error(`Failed to update spot with id ${spotId}`);
      }
    } catch (error) {
      return error
    }
};

export const removeSpot = (spotId) => async (dispatch) => {
  try {
    const response = await csrfFetch(`/api/spots/${spotId}`, {
      method: 'DELETE'
    })

    if (response.ok) {
      const spot = await response.json()
      dispatch(deleteSpot(spot))
    } else {
      throw new Error (`Can not find spot with id ${spotId}`)
    }
  }
  catch (error) {
    return error
  }
}

export const addSpot = (data) => async (dispatch) => {
  try {
    const response = await csrfFetch('/api/spots', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    if(response.ok) {
      const newSpot = await response.json()
      dispatch(createSpot(newSpot))
      return newSpot;
    } else {
      throw new Error('Can not create spot')
    }
  } catch (error) {
    return error
  }
}

export const addSpotImage = (imageData) => async (dispatch) => {
    try {
      const response = await csrfFetch(`/api/spots/${imageData.imageableId}/images`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(imageData)
      });

      if (response.ok) {
        const image = await response.json();
        dispatch(addImages(image))
        return image
      }
    } catch (error) {
      return error
    }
}

export const addSpotReview = (spotId, reviewData) => async (dispatch) => {
  try {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(reviewData),
    });

    if (response.ok) {
      const review = await response.json();
      dispatch(addReview(review));
      return review
    } else {
      const review = await response.json()
      if (review.message) {
        return review.message
      } else {
        throw new Error ('Unexpected response format')
      }
    }
  } catch (error) {
    console.log(error)
    return ['An error occured. Please try again']
  }
};

