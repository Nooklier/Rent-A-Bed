import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {fetchSpots} from '../../store/Spots/spotsThunk'
import './SpotPanels.css'


function SpotPanels () {

    const dispatch = useDispatch()
    const [isLoading, setLoading] = useState(true)
    const spots = useSelector(state => state.spot.spots.Spots)
    console.log(spots)

    useEffect(() => {
        dispatch(fetchSpots()).then(() => setLoading(false)); 
      }, [dispatch]);

    if (isLoading) {
        return <div>Loading...</div>
    }
   
    return (
      <div className='container'>
        {spots.map(spot => (
        <div key={spot.id}>
          <img className='full-width-image' src={spot.previewImage} alt={spot.name}/>
          <h4>{spot.city}, {spot.state}</h4>
          <p>${spot.price} night</p>
          <p>{spot.avgRating}</p>
        </div>
      ))}
      </div>
  
    );

}

export default SpotPanels