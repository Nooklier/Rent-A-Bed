import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {fetchCurrentUserSpots} from '../../store/Spots/spotsThunk'
import { NavLink, useNavigate } from 'react-router-dom';
import './ManageSpots.css'
import DeleteSpotModal from "../DeleteSpotModal/DeleteSpotModal";

function ManageSpots () {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const userId = useSelector(state => state.session.user?.id)
    const spots = Object.values(useSelector((state) => state.spots));
    const filterSpots = spots.filter(spot => spot.ownerId === userId)
    const [deleteModalOpen, setDeleteModalOpen] = useState(false)
    const [spotToDelete, setSpotToDelete] = useState(null);
    const [spotCount, setSpotCount] = useState(0)

    useEffect(() => {
        dispatch(fetchCurrentUserSpots());
      }, [dispatch, spotCount]);

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
            <div className="manage-spot-contents">
                <div className="manage-spot-header">
                    <h2>Manage Your Spots</h2>
                    <button onClick={handleCreateNewSpotClick}>Create a New Spot</button>          
                </div>
                <div className='manage-spot-image-container'>
                    {filterSpots.map(spot => (
                    <div className='manage-spot-image-contents' key={spot.id}>
                        <div className='manage-spot-image-panels'>
                            <nav>
                                <NavLink to={`/spots/${spot.id}`}>
                                    <img className='image' src={spot.previewImage} alt={spot.name} title={spot.name}/>
                                </NavLink>
                            </nav>
                            <h4>
                                {spot.city}, {spot.state}
                                <span>
                                 <span> ★{spot.avgStarRating} {spot.numReviews === 1 ?  `· 1 Review` : spot.numReviews > 1 ?  `· ${spot.numReviews} Reviews` : 'New'}</span>
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
                        spotCount={spotCount}
                        setSpotCount={setSpotCount}
                    />
                )}               
            </div>
        </div>
    )
}

export default ManageSpots;