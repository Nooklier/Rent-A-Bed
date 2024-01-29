import { useDispatch } from "react-redux";
import './DeleteSpotModal.css'
import { removeSpot } from "../../store/Spots/spotsThunk";


function DeleteSpotModal ({spotId, onClose, setSpotCount}) {
    const dispatch = useDispatch();
    
    const handleDelete = async () => {
        await dispatch(removeSpot(spotId));
        setSpotCount((prevCount => prevCount - 1))
        onClose();
    };

    return (
        <div className="create-review-modal-container">
            <div className="create-review-content-container">
                <div className="delete-spot-content-container">
                    <h2>Confirm Delete</h2>
                    <div>Are you sure you want to remove this spot from the listings?</div>
                    <button onClick={handleDelete}>Yes (Delete Spot)</button>
                    <button onClick={onClose}>No (Keep Spot)</button>
                </div>
            </div>
        </div>
    )
}

export default DeleteSpotModal;