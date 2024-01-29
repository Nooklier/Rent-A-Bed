import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {fetchCurrentUserSpots} from '../../store/Spots/spotsThunk'
import { NavLink, useNavigate } from 'react-router-dom';
import './ManageSpots.css'
import DeleteSpotModal from "../DeleteSpotModal/DeleteSpotModal";

function ManageSpots () {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const spots = Object.values(useSelector((state) => state.spots));
    const [deleteModalOpen, setDeleteModalOpen] = useState(false)
    const [spotToDelete, setSpotToDelete] = useState(null);

    useEffect(() => {
        dispatch(fetchCurrentUserSpots());
      }, [dispatch]);

    const handleCreateNewSpotClick = () => {
        navigate('/spots/new')
    }

    const handleUpdateSpotClick = (spotId) => {
        navigate(`/spots/${spotId}/edit`)
    }

    const handleDeleteClick = (spotId) => {
        setSpotToDelete(spotId); 
        setDeleteModalOpen(true); 
    };

    const handleDeleteModalClose = () => {
        setDeleteModalOpen(false);
        setSpotToDelete(null); 
    };

    return (
        <div className="manage-spot-container">
            <div className="manage-spot-header">
                <h2>Manage Your Spots</h2>
                <button onClick={handleCreateNewSpotClick}>Create a New Spot</button>          
            </div>
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
                                  {' '}{spot.avgRating}
                              </span>
                          </h4>
                          <h5>${spot.price} night</h5>
                          <div className="manage-spot-buttons">
                            <button onClick={() => handleUpdateSpotClick(spot?.id)}>Update</button>
                            <button onClick={() => handleDeleteClick(spot?.id)}>Delete</button>
                          </div>
                      </div>
                  </div>
                ))}
            </div>
            {deleteModalOpen && (
                <DeleteSpotModal 
                    spotId={spotToDelete} 
                    onClose={handleDeleteModalClose}
                />
            )}               
        </div>
    )
}

export default ManageSpots;