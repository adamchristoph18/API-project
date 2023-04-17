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
    const [latitude, setLatitude] = useState(spot?.lat || "");
    const [longitude, setLongitude] = useState(spot?.lng || "");
    const [title, setTitle] = useState(spot?.name || "");
    const [price, setPrice] = useState(spot?.price || 0);
    const [previewImage, setPreviewImage] = useState("");
    const [urlTwo, setUrlTwo] = useState("");
    const [urlThree, setUrlThree] = useState("");
    const [urlFour, setUrlFour] = useState("");
    const [urlFive, setUrlFive] = useState("");
    const [submit, setSubmit] = useState(false);
    const [errors, setErrors] = useState({});

    const history = useHistory();
    const dispatch = useDispatch();

    const sessionUser = useSelector(state => state.session.user);

    const err = {};

    useEffect(() => {


        if (country === "") err.country = "Country is required";
        if (address === "") err.address = "Address is required";
        if (city === "") err.city = "City is required";
        if (state === "") err.state = "State is required";
        if (address === "") err.address = "Address is required";
        if (latitude === "") err.latitude = "Latitude is required";
        if (longitude === "") err.longitude = "Longitude is required";
        if (title === "") err.title = "Name is required";
        if (description.length < 30) {
            err.description = "Description needs a minimum of 30 characters";
        }
        if (price === 0) err.price = "Price is required";

        if (formType === "create") {
            if (previewImage === "") {
                err.previewImage = "A preview image is required!";
            }
            if (previewImage && (!(previewImage.endsWith(".png")) && !(previewImage.endsWith(".jpg")) && !(previewImage.endsWith(".jpeg")))) {
                err.previewImageEnding = "Please make sure your images end with either .png, .jpg, or .jpeg";
            }
            if (urlTwo && (!(urlTwo.endsWith(".png")) && !(urlTwo.endsWith(".jpg")) && !(urlTwo.endsWith(".jpeg")))) {
                err.urlTwoEnding = "Please make sure your images end with either .png, .jpg, or .jpeg";
            }
            if (urlThree && (!(urlThree.endsWith(".png")) && !(urlThree.endsWith(".jpg")) && !(urlThree.endsWith(".jpeg")))) {
                err.urlThreeEnding = "Please make sure your images end with either .png, .jpg, or .jpeg";
            }
            if (urlFour && (!(urlFour.endsWith(".png")) && !(urlFour.endsWith(".jpg")) && !(urlFour.endsWith(".jpeg")))) {
                err.urlFourEnding = "Please make sure your images end with either .png, .jpg, or .jpeg";
            }
            if (urlFive && (!(urlFive.endsWith(".png")) && !(urlFive.endsWith(".jpg")) && !(urlFive.endsWith(".jpeg")))) {
                err.urlFiveEnding = "Please make sure your images end with either .png, .jpg, or .jpeg";
            }
        }


    }, [country, address, city, state, description, latitude, longitude, title, price, previewImage, urlTwo, urlThree, urlFour, urlFive, err]);

        const handleSubmit = async event => {
            event.preventDefault();
            setSubmit(true);
            setErrors(err);
            if (Object.keys(errors).length) setSubmit(false);

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
            spotImages: formType === "create" ? imageUrls : spot.spotImages
        };

        // if (Object.keys(errors).length) return;
        // setSubmit(false);

        if (formType === "update") {
            newSpot.id = spotId;
        }

        const retSpot = await dispatch(formType === "update" ? editSpotThunk(newSpot) : createNewSpotThunk(newSpot));

        if (retSpot.errors) {
            setErrors(retSpot.errors);
        }
        setSubmit(false);

        history.push(`/spots/${retSpot.id}`);
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
                    <span className="title-error">
                        Country
                        {submit && <p className="errors error-right">{errors.country}</p>}
                    </span>
                    <br/>
                    <input
                        className="form-input"
                        type="text"
                        name="country"
                        placeholder="Country"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                    />
                </label>
                <label>
                <span className="title-error">
                        Street Address
                        {submit && <p className="errors error-right">{errors.address}</p>}
                    </span>
                    <br/>
                    <input
                        className="form-input"
                        type="text"
                        name="address"
                        placeholder="Street Address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                </label>
                <div className="city-state-pair">
                    <label>
                    <span className="title-error">
                        City
                        {submit && <p className="errors error-right">{errors.city}</p>}
                    </span>
                        <br/>
                        <input
                            className="city-input"
                            type="text"
                            name="city"
                            placeholder="City"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                        />
                    </label>
                    <p className="separating-comma">,</p>
                    <label>
                    <span className="title-error">
                        State
                        {submit && <p className="errors error-right">{errors.state}</p>}
                    </span>
                        <br/>
                        <input
                            className="state-input"
                            type="text"
                            name="state"
                            placeholder="STATE"
                            value={state}
                            onChange={(e) => setState(e.target.value)}
                        />
                    </label>
                </div>
                <div className="lat-lng-pair">
                    <label>
                    <span className="title-error">
                        Latitude
                        {submit && <p className="errors error-right">{errors.latitude}</p>}
                    </span>
                        <br/>
                        <input
                            className="lat-input"
                            type="number"
                            name="latitude"
                            placeholder="Latitude"
                            value={latitude}
                            onChange={(e) => setLatitude(e.target.value)}
                        />
                    </label>
                    <p className="separating-comma">,</p>
                    <label>
                    <span className="title-error">
                        Longitude
                        {submit && <p className="errors error-right">{errors.longitude}</p>}
                    </span>
                        <br/>
                        <input
                            className="lng-input"
                            type="number"
                            name="longitude"
                            placeholder="Longitude"
                            value={longitude}
                            onChange={(e) => setLongitude(e.target.value)}
                        />
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
                        {submit && <p className="errors">{errors.description}</p>}
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
                        />
                        {submit && <p className="errors">{errors.title}</p>}
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
                    {submit && <p className="errors">{errors.price}</p>}
                </div>
                {formType === "update" ? null :
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
                        {submit && <p className="errors">{errors.previewImage}</p>}
                        {submit && <p className="errors">{previewImage && errors.previewImageEnding}</p>}
                        <input
                            className="image-input"
                            type="text"
                            name="image-url-two"
                            placeholder="Image URL"
                            value={urlTwo}
                            onChange={(e) => setUrlTwo(e.target.value)}
                        />
                        {submit && <p className="errors">{urlTwo && errors.urlTwoEnding}</p>}
                        <input
                            className="image-input"
                            type="text"
                            name="image-url-three"
                            placeholder="Image URL"
                            value={urlThree}
                            onChange={(e) => setUrlThree(e.target.value)}
                        />
                        {submit && <p className="errors">{urlThree && errors.urlThreeEnding}</p>}
                        <input
                            className="image-input"
                            type="text"
                            name="image-url-four"
                            placeholder="Image URL"
                            value={urlFour}
                            onChange={(e) => setUrlFour(e.target.value)}
                        />
                        {submit && <p className="errors">{urlFour && errors.urlFourEnding}</p>}
                        <input
                            className="last-image-input"
                            type="text"
                            name="image-url-five"
                            placeholder="Image URL"
                            value={urlFive}
                            onChange={(e) => setUrlFive(e.target.value)}
                        />
                        {submit && <p className="errors">{urlFive && errors.urlFiveEnding}</p>}
                </div>
                }
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
