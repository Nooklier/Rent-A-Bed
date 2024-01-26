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
  const reviews = Object.values(useSelector(state => state.reviews))

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
  
  console.log('return only 1 spot', spot)
  console.log('session user', userId)
  console.log('all reviews', reviews)
  
  return (
    <div className="container">
        {spot && (
          <>
            <h1 className="spot-name">{spot.name}</h1>
            <div className="spot-location">{spot.city}, {spot.state}, {spot.country}</div>
            
            <div className="image-container">
              <div>
                {spot.SpotImages.length > 0 && spot.SpotImages.map(image => (
                  <img className='spot-detail-image' src={image.url} key={image.id}/>
                ))}
              </div>
            </div>
                
            <div>

              <div>
                <h1>Hosted by {spot.Owner.firstName} {spot.Owner.lastName}</h1>
                <div>{spot.description}</div>
              </div>
                
              <span>

                <span>
                  ${spot.price} night
                  <span>
                    <img src="https://res.cloudinary.com/dikyl7t9p/image/upload/v1706180574/images_pgo0nc.png"/>
                    <span>{spot.avgStarRating} · {spot.numReviews} Reviews</span>
                  </span>
                </span>
                
                <div>
                  <button onClick={() => reserveAlert()}>Reserve</button>
                </div>
                
              </span>
                
            </div>
                
            <hr />    

            {/******************************************************* ALL REVIEWS ************************************************************/}

            <h1>
              <span>
                <img src="https://res.cloudinary.com/dikyl7t9p/image/upload/v1706180574/images_pgo0nc.png" />
                <span> {spot.avgStarRating} · {spot.numReviews} Reviews</span>
              </span>

              <span>
                {spot.Owner.id !== userId ? <button className="post-review-button">Post Review</button> : <span/>}
              </span>
            </h1>

            {/***************************************** REVIEW DETAILS *****************************************************/}

            {reviews.length > 0 ? reviews.map(review => (
              <div key={review.id}>
                <div>{review.User.firstName}</div>
                <div>{new Date(review.createdAt).toLocaleString('default', { month: 'long', year: 'numeric' })}</div>
                <div>{review.review}</div>
              </div>
            )) : <div>Be the first to post a review!</div>}


        </>
      )}
    </div>
  )

}


export default SpotDetails;
