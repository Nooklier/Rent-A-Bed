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
      <div className='spot-panels-container'>
        {spots.map(spot => (
          <div className='spot-panels-contents' key={spot.id}>
            <div className='spot-image'>
              <nav>
                <NavLink to={`/spots/${spot.id}`}>
                  <img className='image' src={spot.previewImage} alt={spot.name} title={spot.name}/>
                </NavLink>
              </nav>
              <div className='spot-panels-below-img-first-line'>
                {spot.city}, {spot.state}
                { spot.avgRating === 0 ? (<span>New</span>) : ( <span className="star"> ★ {' ' + spot.avgRating + ' '}</span>)}
              </div>
              <div className='spot-panels-price'>
                ${spot.price} night
              </div>
            </div>
          </div>
        ))}
      </div>
    );
}

export default SpotPanels;



    
  