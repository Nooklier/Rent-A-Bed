import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { fetchSpot } from "../../store/Spots/spotsThunk";
import './SpotDetails.css'
import { fetchReviews } from "../../store/Reviews/ReviewThunks";

function SpotDetails () {
  const dispatch = useDispatch()

  // FIND SPOTID
  const {spotId} = useParams()

  // FETCH SPOT DETAILS
  const spot = useSelector(state => state.spots[spotId])
  const userId = useSelector(state => state.session.user?.id)
  const reviews = useSelector(state => state.reviews[spotId])
  // const spotReviews = reviewsState[spotId]
  // const reviews = Object.values(spotReviews)

  const reserveAlert = () => {
    alert('Feature Coming Soon...')
  }
  
  useEffect(() => {
    dispatch(fetchSpot(spotId))
  },[dispatch, spotId])

  useEffect(() => {
    dispatch(fetchReviews(spotId))
  }, [dispatch, spotId])
  
  if (!spot || !spot.Owner || !spot.SpotImages) {
    return <div>...Loading</div>
  } 
  
  // console.log('return only 1 spot', spot)
  // console.log('session user', userId)
  // console.log('all reviews', reviews)
  
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
                  {spot.Owner.id !== userId && userId ? <button className="post-review-button">Post Your Review</button> : <span/>}
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


        </div>
      )}
    </div>
  )
  
}


export default SpotDetails;
