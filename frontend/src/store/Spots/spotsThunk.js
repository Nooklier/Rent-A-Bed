import { csrfFetch } from "../csrf"
import { getSpots, updateSpot, getSpot } from "./spotsActions"

export const fetchSpots = () => async (dispatch) => {
    try {
        const response = await fetch ('api/spots')
        
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
        const response = await fetch (`api/spots/${spotId}`)

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
  