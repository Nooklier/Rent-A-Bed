import { useState } from "react";
import { useParams } from "react-router-dom";
import './CreateReviewModal.css'
import { addSpotReview } from "../../store/Spots/spotsThunk";
import { useDispatch } from "react-redux";

function CreateReviewModal({ onClose, onSubmit }) {

    const {spotId} = useParams()
    const [review, setReview] = useState('');
    const [stars, setStars] = useState(0);
    const [error, setError] = useState('')
    const dispatch = useDispatch()

    const handleSubmit = (e) => {
        e.preventDefault();
        let validationErrors = [];
        
        if (review.length < 10) {
            validationErrors.push('Review must be at least 10 characters long.');
        }
        
        if (stars < 1 || stars > 5) {
            validationErrors.push('Rating must be between 1 and 5.');
        }
        
        if (validationErrors.length > 0) {
            setError(validationErrors.join(' '));
            return; 
        }
    
        onSubmit({ review, stars })
          .then(() => {
            onClose();
          })
          .catch(async (res) => {
            const data = await res.json();
            if (data && data.errors) {
              setError(data.errors.join(' '));
            }
          });
    };
    
    const handleStarSelection = (rating) => {
        setStars(rating);
        setError('')
    }
    const handleOverlayClick = () => {
        onClose();
    };

    const handleModalContentClick = (e) => {
        e.stopPropagation();
    };

  return (
    <div className="create-review-modal-container" onClick={handleOverlayClick}>
        <div className="create-review-content-container" onClick={handleModalContentClick}>
            <h2 className='first-line-title'>How was your stay?</h2>
            {error && <div className="create-review-error">{error}</div>}
            <textarea 
                className="create-review-textarea"
                placeholder="Leave your review here" 
                value={review} 
                onChange={(e) => setReview(e.target.value)}
                minLength={10}
            />
            <div className="create-review-stars-container">
                {Array.from({ length: 5 }, (_, index) => (
                    <span 
                        key={index} 
                        className={`star-icon-big ${index < stars ? 'filled' : ''}`}
                        onClick={() => handleStarSelection(index + 1)}
                    >
                        ★
                    </span>
                ))}
            </div>
            <button className='create-review-button' onClick={handleSubmit}>Submit Your Review</button>                           
        </div>
    </div>
  );
}

export default CreateReviewModal;
