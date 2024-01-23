
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchSpot } from '../../store/Spots/spotsThunk'; 

const SpotDetails = () => {
  const { spotId } = useParams();
  const dispatch = useDispatch();
  const currentSpot = useSelector(state => state.spot.currentSpot);

  useEffect(() => {
    if (spotId) {
      dispatch(fetchSpot(spotId));
    }
  }, [dispatch, spotId]);

  if (!currentSpot) {
    return <div>Loading...</div>;
  }

  return (
    <div className="spot-details">
      <h2>{currentSpot.name}</h2>
      <img src={currentSpot.previewImage} alt={currentSpot.name} />
      <p>{currentSpot.description}</p>
      <p>Price per night: ${currentSpot.price}</p>
      <p>Rating: {currentSpot.avgRating}</p>
    </div>
  );
};

export default SpotDetails;
