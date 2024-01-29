import { useState, useEffect} from "react"
import { useDispatch, useSelector } from "react-redux";
import { addSpotImage, fetchUpdateSpot } from "../../store/Spots/spotsThunk";
import { useNavigate, useParams } from "react-router-dom";

function UpdateSpot () {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const {spotId} = useParams()
    const spot = useSelector(state => state.spots[spotId])


    const [country, setCountry] = useState(spot?.country || '');
    const [address, setAddress] = useState(spot?.address || '')
    const [city, setCity] = useState(spot?.city || '')
    const [state, setState] = useState(spot?.state || '')
    const [longitude, setLongitude] = useState(spot?.longitude || 0)
    const [latitude, setLatitude] = useState(spot?.latitude || 0)
    const [description, setDescription] = useState(spot?.description || '')
    const [name, setName] = useState(spot?.name || '')
    const [price, setPrice] = useState(spot?.price || '')
    const [previewImage, setPreviewImage] = useState(spot?.previewImage || '')
    const [image2, setImage2] = useState(spot?.image2 || '')
    const [image3, setImage3] = useState(spot?.image3 || '')
    const [image4, setImage4] = useState(spot?.image4 || '')
    const [image5, setImage5] = useState(spot?.image5 || '')
    const [formSubmitted, setFormSubmitted] = useState(false)

    useEffect(() => {
        if (!spot) {
            dispatch(fetchUpdateSpot(spotId));
        }
    }, [dispatch, spotId, spot]);
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormSubmitted(true)

        if(!country) return;
        if(!address) return;
        if(!city) return;
        if(!state) return;
        if(!latitude) return;
        if(!longitude) return;
        if(!name) return;
        if(!price) return;
        if (!description || description.length < 30) return;
        if (!previewImage || !/\.(png|jpg|jpeg)$/i.test(previewImage)) return;
        if (image2 && !/\.(png|jpg|jpeg)$/i.test(image2)) return;
        if (image3 && !/\.(png|jpg|jpeg)$/i.test(image3)) return;
        if (image4 && !/\.(png|jpg|jpeg)$/i.test(image4)) return;
        if (image5 && !/\.(png|jpg|jpeg)$/i.test(image5)) return;

        const data = {
            address,
            city,
            state,
            country,
            lat: latitude,
            lng: longitude,
            name,
            description,
            price
        }

        const newSpot = await dispatch(fetchUpdateSpot(spotId, data))
        let imageArray = [previewImage, image2, image3, image4, image5]

        if (newSpot) {
            imageArray.forEach(url => {
                const imageData = {
                    url,
                    preview: true,
                    imageableId: newSpot.id
                }
                
                if (url !== '') {
                    dispatch(addSpotImage(imageData))
                } 
            })
        }
        navigate(`/spots/${spotId}`)
    }

    return (
        <div className="create-spot-container">
            <form onSubmit={handleSubmit} className="create-spot-form-container">
                <h2>Update Your Spot</h2>
                <h3>Where&apos;s your place located?</h3>
                <div>Guests will only get your exact address once they booked a reservation.</div>
                <label className="create-spot-country">
                    <div className="country-container">
                    <span>Country</span>
                    {formSubmitted && country.length === 0 && <span className="error-message">Country is required</span>}
                    </div>
                    <input 
                        type="text"
                        placeholder="Country"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                    />
                </label>
                <label className="create-spot-country">
                    <div className="country-container">
                        <span>Street Address</span>
                        {formSubmitted && address.length === 0 && <span className="error-message">Address is required</span>}
                    </div>
                    <input 
                        type="text"
                        placeholder="Street Address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        />
                </label>
                <label className="city-state">
                    <div>
                    <div className="country-container">
                        <span>City</span>
                        {formSubmitted && city.length === 0 && <span className="error-message">City is required</span>}
                    </div>
                    <input 
                        type="text"
                        placeholder="City"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}                       
                        />                  
                    </div>
                    <div>
                    <div className="country-container">
                        <span>State</span>
                        {formSubmitted && state.length === 0 && <span className="error-message">State is required</span>}
                    </div>
                    <input 
                        type="text"
                        placeholder="State"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                       
                        />
                    </div>
                </label>
                <label className="lng-lat">
                    <div>
                    <div className="country-container">
                        <span>Latitude</span>
                        {formSubmitted && !latitude && <span className="error-message">Latitude is required</span>}
                    </div>
                        <input 
                         type="number"
                         placeholder="Latitude"
                         value={latitude}
                         onChange={(e) => setLatitude(e.target.value)}
                         />
                    </div>                  
                    <div>
                    <div className="country-container">
                        <span>Longitude</span>
                        {formSubmitted && !longitude && <span className="error-message">Longitude is required</span>}
                    </div>
                        <input 
                         type="number"
                         placeholder="Longitude"
                         value={longitude}
                         onChange={(e) => setLongitude(e.target.value)}
                         />
                    </div>
                </label>
                <h3>Describe your place to guests</h3>
                <div>Mention the best features of your space, any special amentities like fast wifi or parking, and what you love about the neighborhood.</div>
                <textarea className="textarea"
                    type="textarea"
                    placeholder="Please write at least 30 characters"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}                   
                />
                {formSubmitted && description.length < 30 && <span className="error-message"> Description needs a minimum of 30 characters</span>}
                <h3>Create a title for your spot</h3>
                <div>Catch guests&apos; attention with a spot title that highlights what makes your place special.</div>
                {formSubmitted && name.length === 0 && <span className="error-message">Name is required</span>}
                <input className="name-your-spot-input"
                    type="text"
                    placeholder="Name of your spot"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    
                />
                <hr />
                <h3>Set a base price for your spot</h3>
                <div>Competitive pricing can help your listing stand out and rank higher in search results.</div>
                <label>
                    <span>$ </span> 
                    <input className="details-input"
                        type="number"
                        placeholder="Price per night (USD)"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}                    
                        />
                        {formSubmitted && !price && <span className="error-message">Price is required</span>}
                </label>
                <h3>Liven up your spot with photos</h3>
                <div>Submit a link to at least one photo to publish your spot.</div>
                <div className="images-url">
                    <input 
                        type="text"
                        placeholder="Preview Image URL"
                        value={previewImage}
                        onChange={(e) => setPreviewImage(e.target.value)}                      
                    />
                    {formSubmitted && (!previewImage || !/\.(png|jpg|jpeg)$/i.test(previewImage)) && <span className="error-message">Preview image is require and must end in .png, .jpg, or .jpeg.</span>}
                       <input 
                        type="text"
                        placeholder="Image URL"
                        value={image2}
                        onChange={(e) => setImage2(e.target.value)}
                    />
                    {formSubmitted && (image2 && !/\.(png|jpg|jpeg)$/i.test(image2)) && <span className="error-message">Image URL must end in .png, .jpg, or .jpeg.</span>}
                       <input 
                        type="text"
                        placeholder="Image URL"
                        value={image3}
                        onChange={(e) => setImage3(e.target.value)}               
                    />
                    {formSubmitted && (image3 && !/\.(png|jpg|jpeg)$/i.test(image3)) && <span className="error-message">Image URL must end in .png, .jpg, or .jpeg.</span>}
                       <input 
                        type="text"
                        placeholder="Image URL"
                        value={image4}
                        onChange={(e) => setImage4(e.target.value)}               
                    />
                    {formSubmitted && (image4 && !/\.(png|jpg|jpeg)$/i.test(image4)) && <span className="error-message">Image URL must end in .png, .jpg, or .jpeg.</span>}
                       <input 
                        type="text"
                        placeholder="Image URL"
                        value={image5}
                        onChange={(e) => setImage5(e.target.value)}
                    />
                    {formSubmitted && (image5 && !/\.(png|jpg|jpeg)$/i.test(image5)) && <span className="error-message">Image URL must end in .png, .jpg, or .jpeg.</span>}
                </div>
                <button type="submit">Create Spot</button>
            </form>
        </div>
    )
}

export default UpdateSpot;
