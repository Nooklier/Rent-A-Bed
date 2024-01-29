import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { addSpotReview, fetchSpot } from "../../store/Spots/spotsThunk";
import { fetchReviews } from "../../store/Reviews/ReviewThunks";
import CreateReviewModal from "../CreateReviewModal/CreateReviewModal";
import './SpotDetails.css'

function SpotDetails () {
  const dispatch = useDispatch()
  const {spotId} = useParams()
  const spot = useSelector(state => state.spots[spotId])
  const userId = useSelector(state => state.session.user?.id)
  const reviews = useSelector(state => state.reviews[spotId])
  const [reviewModalOpen, setReviewModalOpen] = useState(false)
  const [reviewCount, setReviewCount] = useState(0);

  useEffect(() => {
    if (spotId) {
      dispatch(fetchSpot(spotId))
      dispatch(fetchReviews(spotId))
    } 
  },[dispatch, spotId, reviewCount])

  
  const handleReviewModalOpen = () => setReviewModalOpen(true);
  const handleReviewModalClose = () => setReviewModalOpen(false);
  
  const reviewSubmission = async (reviewData) => {
    const response = await dispatch(addSpotReview(spotId, reviewData));
    
    if (response && !response.message) {
      setReviewCount(prevCount => prevCount + 1); 
      dispatch(fetchReviews(spotId));
      // handleReviewModalClose();
    }

    console.log('response is', response)
  };

  const reserveAlert = () => alert('Feature Coming Soon...');
  
  if (!spot || !spot.Owner || !spot.SpotImages) {
    return <div>...Loading</div>
  } 

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
                      <span> {spot.avgStarRating} {spot.numReviews === 1 ?  `· 1 Review` : spot.numReviews > 1 ?  `· ${spot.numReviews} Reviews` : 'New'}</span>
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
                  <span> {spot.avgStarRating} {spot.numReviews === 1 ?  `· 1 Review` : spot.numReviews > 1 ?  `· ${spot.numReviews} Reviews` : 'New'}</span>
                </span>
                <div>
                  {spot.Owner.id !== userId && userId ? <button className="post-review-button" onClick={handleReviewModalOpen}>Post Your Review</button> : <span/>}
                </div>
              </h1>

              {reviews && reviews.length > 0 && reviews.map(review => (
                <div className="review-container" key={review.id}>
                  <h4>{review.User.firstName}</h4>
                  <div className="month-year">{new Date(review.createdAt).toLocaleString('default', { month: 'long', year: 'numeric' })}</div>
                  <div className="review-review">{review.review}</div>
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
            
        </div>
      )}
    </div>
  )
  
}


export default SpotDetails;
