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
  
  if (!spot) {
    return 'loading'
  } 
  
  console.log('return only 1 spot', spot)
  console.log('session user', userId)
  console.log('all reviews', reviews)
  
  return (
   <div>
    <h1>{spot.name}</h1>
    <div>{spot.city}, {spot.state}, {spot.country}</div>

    <div className="grid-container">
      <div className='image-container'>
        {spot.SpotImages.map(image => (
          <img className='image-container img' src={image.url} key={image.id}/>
        ))}
      </div>
    </div>

{/********************************************* HOSTED BY, DETAILS, & RESERVE BUTTON ***********************************************/}

    <div className="below-image-container">

      {/*************************** HOSTED BY & DETAILS *******************************************/}
      <div>
        <h1 className="hosted-container">Hosted by {spot.Owner.firstName} {spot.Owner.lastName}</h1>
        <div>{spot.description}</div>
      </div>

      {/******************************* RESERVATION BOX ********************************************/}
      <span>

        {/*** RESERVATION PRICE, STARS, AVGRATING & REVIEWS ***/}
        <span className="reserve-button-container-price-star">
          ${spot.price} night
          <span>
            <img className='star-icon' src="https://res.cloudinary.com/dikyl7t9p/image/upload/v1706180574/images_pgo0nc.png"/>
            <span>{spot.avgStarRating} · {spot.numReviews} Reviews</span>
          </span>
        </span>

        {/******** RESERVATION BUTTON ********/}
        <div className="reserve-button">
          <button onClick={() => reserveAlert()}>Reserve</button>
        </div>

      </span>

    </div>

    <hr />

{/******************************************************* ALL REVIEWS ************************************************************/}

    {/******************************* REVIEW STAR, AVGRATING, & REVIEWS ********************************************/}
    <h1 className="review-first-name-container">
      <span>
        <img className='star-icon' src="https://res.cloudinary.com/dikyl7t9p/image/upload/v1706180574/images_pgo0nc.png" />
        <span> {spot.avgStarRating} · {spot.numReviews} Reviews</span>
      </span>
      <span>
        {spot.Owner.id !== userId ? <button className="post-review-button">Post Review</button> : <span/>}
      </span>
    </h1>
    
    {/***************************************** REVIEW DETAILS *****************************************************/}

    {reviews.map(review => (
      <div key={review.id}>
        <div>{review.User.firstName}</div>
        <div>{new Date(review.createdAt).toLocaleString('default', { month: 'long', year: 'numeric' })}</div>
        <div>{review.review}</div>
      </div>
    ))}


   </div>
  )
}

export default SpotDetails;