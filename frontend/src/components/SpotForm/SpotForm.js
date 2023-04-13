import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { editSpotThunk } from "../../store/spots";
import { useDispatch, useSelector } from "react-redux";
import { createNewSpotThunk } from "../../store/spots";
import "./SpotForm.css";

function SpotForm({ spot, formType }) {
    const spotId = spot?.id;

    const [country, setCountry] = useState(spot?.country || "");
    const [address, setAddress] = useState(spot?.address || "");
    const [city, setCity] = useState(spot?.city || "");
    const [state, setState] = useState(spot?.state || "");
    const [description, setDescription] = useState(spot?.description || "");
    const [latitude, setLatitude] = useState(spot?.lat || 0);
    const [longitude, setLongitude] = useState(spot?.lng || 0);
    const [title, setTitle] = useState(spot?.name || "");
    const [price, setPrice] = useState(spot?.price || 0);
    const [previewImage, setPreviewImage] = useState(spot?.SpotImages?.[0]?.url || "");
    const [urlTwo, setUrlTwo] = useState(spot?.SpotImages?.[1]?.url || "");
    const [urlThree, setUrlThree] = useState(spot?.SpotImages?.[2]?.url || "");
    const [urlFour, setUrlFour] = useState(spot?.SpotImages?.[3]?.url || "");
    const [urlFive, setUrlFive] = useState(spot?.SpotImages?.[4]?.url || "");
    const [errors, setErrors] = useState({});

    const history = useHistory();
    const dispatch = useDispatch();

    const sessionUser = useSelector(state => state.session.user);

    const handleSubmit = async event => {
        event.preventDefault();

        const imageUrls = [ {url: previewImage, preview: true } ];

        if (urlTwo.length > 0) imageUrls.push({url: urlTwo, preview: false});
        if (urlThree.length > 0) imageUrls.push({url: urlThree, preview: false});
        if (urlFour.length > 0) imageUrls.push({url: urlFour, preview: false});
        if (urlFive.length > 0) imageUrls.push({url: urlFive, preview: false});


        const newSpot = {
            ownerId: sessionUser.id,
            address,
            city,
            state,
            country,
            lat: latitude,
            lng: longitude,
            name: title,
            description,
            price,
            spotImages: imageUrls
        };

        const err = {};

        if (latitude > 90 || latitude < -90) {
            err.latitude = "Latitude values are between -90 and 90"
        }
        if (longitude > 180 || longitude < -180) {
            err.longitude = "Longitude values are between -180 and 180"
        }
        if (description.length < 30) {
            err.description = "Description needs a minimum of 30 characters"
        }
        if (previewImage === "") {
            err.previewImage = "A preview image is required!"
        }

        setErrors(err); // this is asynchronous
        if (Object.keys(err).length) return; // prevents from bad request


        if (formType === "update") {
            newSpot.id = spotId;
        }

        const spot = await dispatch(formType === "update" ? editSpotThunk(newSpot) : createNewSpotThunk(newSpot));

        if (spot.errors) {
            setErrors(spot.errors);
            return; // just so it doesn't hit the redirect
        }

        history.push(`/spots/${spot.id}`);
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="new-spot-form"
        >
            <div>
                <h2
                    className="form-title">
                        {formType === "update" ? "Update Your Spot" : "Create a new Spot"}
                </h2>
                <p><span className="subtitle">Where's your place located?</span>
                    <br/>
                    <span className="disclaim">*Guests will only get your exact address once they have booked a reservation.</span></p>
            </div>
            <div className="form-info">
                <label>
                    Country
                    <br/>
                    <input
                        className="form-input"
                        type="text"
                        name="country"
                        placeholder="Country"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Street Address
                    <br/>
                    <input
                        className="form-input"
                        type="text"
                        name="address"
                        placeholder="Street Address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        required
                    />
                </label>
                <div className="city-state-pair">
                    <label>
                        City
                        <br/>
                        <input
                            className="city-input"
                            type="text"
                            name="city"
                            placeholder="City"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            required
                        />
                    </label>
                    <p className="separating-comma">,</p>
                    <label>
                        State
                        <br/>
                        <input
                            className="state-input"
                            type="text"
                            name="state"
                            placeholder="STATE"
                            value={state}
                            onChange={(e) => setState(e.target.value)}
                            required
                        />
                    </label>
                </div>
                <div className="lat-lng-pair">
                    <label>
                        Latitude
                        <br/>
                        <input
                            className="lat-input"
                            type="number"
                            name="latitude"
                            value={latitude}
                            onChange={(e) => setLatitude(e.target.value)}
                            required
                        />
                            <p className="errors">{errors.latitude}</p>
                    </label>
                    <p className="separating-comma">,</p>
                    <label>
                        Longitude
                        <br/>
                        <input
                            className="lng-input"
                            type="number"
                            name="longitude"
                            value={longitude}
                            onChange={(e) => setLongitude(e.target.value)}
                            required
                        />
                            <p className="errors">{errors.longitude}</p>
                    </label>
                </div>
                <div>
                    <p><span className="describe-title">Describe your place to guests!</span>
                        <br/>
                        <span className="describe-tips">Mention the best features of your space, any special amenities
                            like fast wifi or<br/> parking, and what you love about the neighborhood.</span></p>
                </div>
                <div className="description-div">
                    <textarea
                        className="description-text-area"
                        placeholder="Please write at least 30 characters"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                        <p className="errors">{errors.description}</p>
                </div>
                <div className="title-div">
                    <p><span className="spot-title-title">Create a title for your spot</span>
                        <br/>
                        <span className="title-tips">Catch guests' attention with a spot title that highlights
                            what makes your place special.</span></p>
                    <input
                        className="title-input"
                        type="text"
                        name="title"
                        placeholder="Name of your spot"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        />
                </div>
                <div className="title-div">
                    <p><span className="price-title">Set a base price for your spot</span>
                        <br/>
                        <span className="price-tips">Competitive pricing can help your listing stand out and rank
                            higher in search results.</span></p>
                    <div className="price-line">
                        <i className="fa-solid fa-dollar-sign icon dolla" />
                            <input
                                className="price-input"
                                type="number"
                                name="price"
                                placeholder="Price per night (USD)"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                required
                                />
                        <p className="per-night">/ per night (USD)</p>
                    </div>
                </div>
                <div className="photos-div">
                    <p><span className="photo-title">Liven up your spot with photos!</span>
                        <br/>
                        <span className="photo-tips">Submit a link to at least one photo to publish your spot.</span></p>
                        <input
                            className="image-input"
                            type="text"
                            name="image-url-one"
                            placeholder="Preview Image URL"
                            value={previewImage}
                            onChange={(e) => setPreviewImage(e.target.value)}
                        />
                        <p className="errors">{errors.previewImage}</p>
                        <input
                            className="image-input"
                            type="text"
                            name="image-url-two"
                            placeholder="Image URL"
                            value={urlTwo}
                            onChange={(e) => setUrlTwo(e.target.value)}
                        />
                        <input
                            className="image-input"
                            type="text"
                            name="image-url-three"
                            placeholder="Image URL"
                            value={urlThree}
                            onChange={(e) => setUrlThree(e.target.value)}
                        />
                        <input
                            className="image-input"
                            type="text"
                            name="image-url-four"
                            placeholder="Image URL"
                            value={urlFour}
                            onChange={(e) => setUrlFour(e.target.value)}
                        />
                        <input
                            className="last-image-input"
                            type="text"
                            name="image-url-five"
                            placeholder="Image URL"
                            value={urlFive}
                            onChange={(e) => setUrlFive(e.target.value)}
                        />
                </div>
            </div>
            <button
                className="create-spot-button clickable"
                disabled={Object.keys(errors).length > 0}
                type="submit"
            >
                {formType === "update" ? "Update Spot" : "Create Spot"}
            </button>
        </form>
    )
}

export default SpotForm;
