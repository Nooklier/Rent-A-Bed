import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { addSpotReview, fetchSpot, removeReview } from "../../store/Spots/spotsThunk";
import { fetchReviews } from "../../store/Reviews/ReviewThunks";
import CreateReviewModal from "../CreateReviewModal/CreateReviewModal";
import DeleteReviewModal from "../DeleteReviewModal/DeleteReviewModal";
import './SpotDetails.css'

function SpotDetails () {
  const dispatch = useDispatch()
  const {spotId} = useParams()
  const navigate = useNavigate()
  const spot = useSelector(state => state.spots[spotId])
  const userId = useSelector(state => state.session.user?.id)
  const reviews = useSelector(state => state.reviews[spotId])
  const [reviewModalOpen, setReviewModalOpen] = useState(false)
  const [reviewCount, setReviewCount] = useState(0);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentReviewId, setCurrentReviewId] = useState(null);

  

  useEffect(() => {
    if (spotId) {
      dispatch(fetchSpot(spotId))
      dispatch(fetchReviews(spotId))
    } 
  },[dispatch, spotId, reviewCount])

  
  const handleReviewModalOpen = () => setReviewModalOpen(true);
  const handleReviewModalClose = () => setReviewModalOpen(false);

  const handleDeleteReview = (reviewId) => {
    dispatch(removeReview(spotId, reviewId)); 
    setReviewCount(prevCount => prevCount - 1); 
  };

  const openDeleteModal = (reviewId) => {
    setIsDeleteModalOpen(true);
    setCurrentReviewId(reviewId);
  };
  
  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setCurrentReviewId(null);
  };
  
  const deleteReviewAndCloseModal = async (reviewId) => {
    await handleDeleteReview(reviewId);
    closeDeleteModal();
    navigate(`/spots/${spotId}`);
  };
  
  
  
  const reviewSubmission = async (reviewData) => {
    const response = await dispatch(addSpotReview(spotId, reviewData));
    
    if (response && !response.message) {
      setReviewCount(prevCount => prevCount + 1); 
      dispatch(fetchReviews(spotId));
    }
  };

  const reserveAlert = () => alert('Feature Coming Soon...');
  
  if (!spot || !spot.Owner || !spot.SpotImages) {
    return <div>...Loading</div>
  } 

  const userReviewed = reviews?.some(review => review.userId === userId);

  return (
    <div className="outside-container">
        {spot && (
            <div className="container">
            <h1 className="spot-name">{spot.name}</h1>           
            <div className="spot-location">{spot.city}, {spot.state}, {spot.country}</div>
            <div className="spot-image-container">
              <img className='image-panel-container-first' src={spot.SpotImages[0].url}></img>
              <div>
                <div className="images-grid-container">
                  {spot.SpotImages[1] ? <img className='image-panel-container-other' src={spot.SpotImages[1].url}/> : <div/>}
                  {spot.SpotImages[2] ? <img className="image-panel-container-other" src={spot.SpotImages[2].url}/> : <div/>}                  
                  {spot.SpotImages[3] ? <img className="image-panel-container-other" src={spot.SpotImages[3].url}/> : <div/>}                  
                  {spot.SpotImages[4] ? <img className="image-panel-container-other" src={spot.SpotImages[4].url}/> : <div/>}                            
                </div>
              </div>
            </div>
            <div className="bottom-container">
              <div>
                <div>
                  <h1 className="spot-name">Hosted by {spot.Owner.firstName} {spot.Owner.lastName}</h1>
                  <div className="spot-location">{spot.description}</div>
                </div>
              </div>
              <div>
                <div className="reserve-container">
                  <div className="price-star">
                    <div>${spot.price} night</div>
                    <span>
                      <img className='star-icon'src="https://res.cloudinary.com/dikyl7t9p/image/upload/v1706180574/images_pgo0nc.png"/>
                      <span> {spot.avgStarRating.toFixed(1)} {spot.numReviews === 1 ?  `· 1 Review` : spot.numReviews > 1 ?  `· ${spot.numReviews} Reviews` : 'New'}</span>
                    </span>
                  </div>
                  <div className="button-container">
                    <button className='button' onClick={() => reserveAlert()}>Reserve</button>
                  </div>
                </div>
              </div>   
            </div>

            <div className="reviews-container">
              <h1>
                <span>
                  <img className='star-icon-big' src="https://res.cloudinary.com/dikyl7t9p/image/upload/v1706180574/images_pgo0nc.png" />
                  <span> {spot.avgStarRating.toFixed(1)} {spot.numReviews === 1 ?  `· 1 Review` : spot.numReviews > 1 ?  `· ${spot.numReviews} Reviews` : 'New'}</span>
                </span>
                <div>
                  {spot.Owner.id !== userId && userId && !userReviewed? 
                    <button 
                      className="post-review-button" 
                      onClick={handleReviewModalOpen}
                    >Post Your Review</button> : <span/>}
                </div>
              </h1>

              {reviews && reviews.length > 0 && reviews.map(review => (
                <div className="review-container" key={review.id}>
                  <h4>{review.User.firstName}</h4>
                  <div className="month-year">{new Date(review.createdAt).toLocaleString('default', { month: 'long', year: 'numeric' })}</div>
                  <div className="review-review">{review.review}</div>
                  {userId === review.userId && (
                    <button onClick={() => openDeleteModal(review.id)} className="delete-review-button">Delete Review</button>
                  )}                
                </div>
              ))}
              {!reviews && <div>Be the first to post a review!</div>}
            </div>

            {reviewModalOpen && (
              <CreateReviewModal 
                onClose={handleReviewModalClose} 
                onSubmit={reviewSubmission}
              />
            )}

            <DeleteReviewModal
              isOpen={isDeleteModalOpen}
              onClose={closeDeleteModal}
              onDelete={deleteReviewAndCloseModal}
              reviewId={currentReviewId}
            />

            
        </div>
      )}
    </div>
  )
  
}


export default SpotDetails;
