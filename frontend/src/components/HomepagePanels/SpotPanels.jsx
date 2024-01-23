import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {addSpot, fetchSpot, fetchSpots, fetchUpdateSpot} from '../../store/Spots/spotsThunk'
import './SpotPanels.css'

// import { removeSpot } from '../../store/Spots/spotsThunk';


function SpotPanels () {

    const dispatch = useDispatch()
    const [isLoading, setLoading] = useState(true)
    const spots = Object.values(useSelector(state => state.spots))

    useEffect(() => {
        dispatch(fetchSpots()).then(() => setLoading(false)); 
      }, [dispatch]);

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

    /**************************************************************************************************************/
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
          {/* <button onClick={() => handleCreateSpot()}>
           Create Spot
          </button> */}
        </div>
        ))}
      </div>
  
    );

}

export default SpotPanels