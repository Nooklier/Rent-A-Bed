import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSpots } from '../../store/Spots/spotsThunk'
import { NavLink } from 'react-router-dom';
import './SpotPanels.css'

function SpotPanels () {

    const dispatch = useDispatch()
    const [isLoading, setLoading] = useState(true)
    const spots = Object.values(useSelector(state => state.spots))

    useEffect(() => {
        dispatch(fetchSpots()).then(() => setLoading(false)); 
    }, [dispatch]);

    if (isLoading) {
      return <div>Loading...</div>
    }
    
    return (
      <div className='image-panels-container'>

          {spots.map(spot => (
            <div className='image-container' key={spot.id}>
            <div className='image-panels'>

            <nav>
              <NavLink to={`/spots/${spot.id}`}>
                <img className='image' src={spot.previewImage} alt={spot.name} title={spot.name}/>
              </NavLink>
            </nav>

            <h4>
              {spot.city}, {spot.state}
              <span>
                <img className='star' src='https://res.cloudinary.com/dikyl7t9p/image/upload/v1706180574/images_pgo0nc.png'/>
                {' '}{spot.avgRating.toFixed(1)}
              </span>
            </h4>
            <h5>
            ${spot.price} night
            </h5>
          </div>
          </div>
          ))}

      </div>
    );
    
  }
  
  export default SpotPanels;