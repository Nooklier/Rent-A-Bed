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
      <div>

        {/********************** IMAGES PANELS AREA ************************/}
        <div>
          {/*************** IMAGES PANELS *******************/}
           {spots.map(spot => (
            <div key={spot.id}>

            <nav>
              <NavLink to={`/spots/${spot.id}`}>
                <img className='image' src={spot.previewImage} alt={spot.name}/>
              </NavLink>
            </nav>

            <div>
              {spot.city}, {spot.state}
              <span>{spot.avgRating}</span>
            </div>
            <div>${spot.price} night</div>
          </div>
          ))}

        </div>
      </div>
    );
    
  }
  
  export default SpotPanels
  /********************************************** TESTING SPOTS BUTTON ******************************************/
  
    // const handleDelete = (spotId) => {
    //   dispatch(removeSpot(spotId));
    // };

    // const handleUpdate = (spot) => {
    //   const data = {...spot, price : 200}
    //   console.log(data)
    //   dispatch(fetchUpdateSpot(spot.id, data))
    // }

    // const handleGetSpot = (spotId) => {
    //   dispatch(fetchSpot(spotId))
    // }

    // const handleCreateSpot = () => {
    //   const data = {
    //     address: "123 Main Street",
    //     city: "Exampleville",
    //     state: "CA",
    //     country: "United States",
    //     lat: 37.7749,
    //     lng: -122.4194,
    //     name: "Example Place",
    //     description: "A wonderful place to visit",
    //     price: 50.00
    //   }
    //   dispatch(addSpot(data))
    // }

    // const handleBookings = (spotId) => {
    //   dispatch(fetchBookings(spotId))
    // }

  /**************************************************************************************************************/